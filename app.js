require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");  // Use mysql2/promise
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

// Database connection setup (without specifying the database)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    rejectUnauthorized: false
  }
});



// After ensuring the database exists, now connect with the database

const app = express();
const initDB = async () => {
  let connected = false;

  while (!connected) {
    try {
      await db.query("SELECT 1");
      connected = true;
      console.log("✅ Database connected");

      await db.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          height FLOAT NOT NULL,
          weight FLOAT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log("✅ Users table is ready!");
    } catch (err) {
      console.log("⏳ Waiting for database...");
      await new Promise(res => setTimeout(res, 3000));
    }
  }
};

initDB();


// Use CORS middleware

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://YOUR_FRONTEND_NAME.vercel.app"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post("/get-diet", async (req, res) => {
  const { allergy, age, goal } = req.body;

  let conditions = [];
  let values = [];

  // Build the query based on the provided filters
  let query = "SELECT condition_value, plan FROM diet_plans WHERE";

  if (allergy) {
    conditions.push(`(category = 'allergy' AND condition_value = ?)`);
    values.push(allergy);
  }
  if (age) {
    conditions.push(`(category = 'age' AND condition_value = ?)`);
    values.push(age);
  }
  if (goal) {
    conditions.push(`(category = 'goal' AND condition_value = ?)`);
    values.push(goal);
  }

  if (conditions.length === 0) {
    return res.status(400).json({ error: "Provide at least one filter (allergy, age, or goal)." });
  }

  query += ` ${conditions.join(" OR ")}`; // Use OR if matching multiple categories

  try {
    // Execute the query
    const [results] = await db.query(query, values);

    if (results.length === 0) {
     return res.status(200).json([]);
}


    // Check if the 'plan' is already a parsed object (JSON)
    const formattedResults = results.map((result) => {
      let plan = result.plan;
      
      // Only parse the plan if it's a string
      if (typeof plan === "string") {
        plan = JSON.parse(plan); // Parse the JSON string if it's not already an object
      }

      return {
        condition_value: result.condition_value,
        meal_1: plan["Meal 1"],
        meal_3: plan["Meal 3"],
        post_workout: plan["Post-Workout"]
      };
    });

    res.json(formattedResults); // Return the formatted response
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});


app.post("/signup", async (req, res) => {
  const { email, name, password, phone, height, weight } = req.body;

  if (!email || !name || !password || !phone || !height || !weight) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if the user already exists
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email already registered." });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await db.query(
      "INSERT INTO users (email, name, password, phone, height, weight) VALUES (?, ?, ?, ?, ?, ?)",
      [email, name, hashedPassword, phone, height, weight]
    );

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Fetch user from database
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = users[0];

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate JWT token (optional for future authentication)
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

