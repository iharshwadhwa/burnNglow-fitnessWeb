require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const SECRET_KEY = process.env.JWT_SECRET || "fallback_secret_key"; 

// =============================================================
// 1. CORS CONFIGURATION (FIXED FOR VERCEL)
// =============================================================
// Inside app.js

app.use(cors({
  origin: [
    "http://localhost:5173",                     // Standard Vite Port
    "http://localhost:5174",                     // 👈 ADD THIS (Your current port)
    "http://localhost:3000",                     // Local Backend
    "https://burn-nglow-fitness-web.vercel.app"  // Live Vercel Website
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(bodyParser.json());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

// =============================================================
// 2. DATABASE CONNECTION
// =============================================================
const dbConfig = process.env.DB_URL 
  ? {
      uri: process.env.DB_URL,
      ssl: {
        rejectUnauthorized: false // Required for Aiven Cloud
      },
      waitForConnections: true,
      connectionLimit: 5
    }
  : {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10
    };

const db = mysql.createPool(dbConfig);

// 3. INITIALIZE DB
const initDB = async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ Database connected successfully to Cloud!");
    conn.release();

    // USERS TABLE
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

    // DIET PLANS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS diet_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        condition_value VARCHAR(50) NOT NULL,
        plan JSON NOT NULL
      )
    `);

    console.log("✅ Tables checked/created successfully.");

  } catch (err) {
    console.error("❌ DATABASE INIT FAILED");
    console.error(err);
  }
};

initDB();

// =============================================================
// 4. ROUTES
// =============================================================

// Get Diet Plan
app.post("/get-diet", async (req, res) => {
  const { allergy, age, goal } = req.body;
  let conditions = [];
  let values = [];
  let query = "SELECT condition_value, plan FROM diet_plans WHERE";

  if (allergy) { conditions.push(`(category = 'allergy' AND condition_value = ?)`); values.push(allergy); }
  if (age) { conditions.push(`(category = 'age' AND condition_value = ?)`); values.push(age); }
  if (goal) { conditions.push(`(category = 'goal' AND condition_value = ?)`); values.push(goal); }

  if (conditions.length === 0) {
    return res.status(400).json({ error: "Provide at least one filter (allergy, age, or goal)." });
  }

  query += ` ${conditions.join(" OR ")}`;

  try {
    const [results] = await db.query(query, values);
    if (results.length === 0) return res.status(200).json([]);

    const formattedResults = results.map((result) => {
      let plan = result.plan;
      if (typeof plan === "string") {
        try {
            plan = JSON.parse(plan);
        } catch (e) {
            console.error("Error parsing JSON plan", e);
        }
      }
      return {
        condition_value: result.condition_value,
        meal_1: plan?.["Meal 1"] || "N/A",
        meal_3: plan?.["Meal 3"] || "N/A",
        post_workout: plan?.["Post-Workout"] || "N/A"
      };
    });
    res.json(formattedResults);
  } catch (err) {
    console.error("Error fetching diet:", err);
    res.status(500).json({ error: err.message });
  }
});

// Signup
// FIND THIS SECTION IN YOUR APP.JS AND REPLACE IT
// Inside app.js - REPLACE THE EXISTING /signup ROUTE WITH THIS:

app.post("/signup", async (req, res) => {
  console.log("📝 Signup Attempt:", req.body); // Log what we receive

  // 1. Extract raw data (Frontend sends 'fullName', so we grab that)
  const rawEmail = req.body.email;
  const rawPassword = req.body.password;
  const rawName = req.body.fullName; // <--- FIX: Read 'fullName' from frontend

  // 2. Validate existence
  if (!rawEmail || !rawPassword || !rawName) {
    console.log("❌ Missing fields:", { rawEmail, rawPassword, rawName });
    return res.status(400).json({ error: "All fields are required (Name, Email, Password)." });
  }

  // 3. CLEAN THE DATA
  const email = rawEmail.trim().toLowerCase();
  const password = rawPassword.trim();
  const name = rawName.trim(); // Clean the name

  // Extract the rest
  const { phone, height, weight } = req.body;

  try {
    // Check if user exists
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) return res.status(400).json({ error: "Email already registered." });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save to DB (Map 'name' variable to the 'name' column)
    await db.query(
      "INSERT INTO users (email, name, password, phone, height, weight) VALUES (?, ?, ?, ?, ?, ?)",
      [email, name, hashedPassword, phone, height, weight]
    );
    
    console.log("✅ User created successfully!");
    res.status(201).json({ message: "User registered successfully!" });

  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
// DEBUG LOGIN ROUTE - Replace your existing login with this
// FIND THIS SECTION IN YOUR APP.JS AND REPLACE IT
app.post("/login", async (req, res) => {
  console.log("🕵️ LOGIN ATTEMPT");

  // 1. Validate existence
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // 2. CLEAN THE DATA (The Fix!)
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();

  try {
    // 1. Check if user exists
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    
    if (users.length === 0) {
      console.log("❌ User NOT found in database.");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];

    // 2. Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Password mismatch.");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3. Success
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Login successful!", token });

  } catch (err) {
    console.error("❌ SERVER ERROR in Login:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;

// --- SPY ROUTE (Delete this after fixing) ---
// Usage: https://your-backend.onrender.com/debug-user?email=your@email.com
app.get("/debug-user", async (req, res) => {
  const email = req.query.email;
  
  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    
    if (users.length === 0) {
      return res.json({ status: "User Not Found", email: email });
    }

    const user = users[0];
    
    res.json({
      status: "User Found",
      email: user.email,
      stored_password_hash: user.password, // This is what we need to see!
      hash_length: user.password.length,   // This number is the key clue
      phone: user.phone
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🚀 VERSION 2.0 (The Fix is Live)`); // <--- Add this!
});

module.exports = app;