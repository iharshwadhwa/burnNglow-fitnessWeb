import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Dashboard() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentDietIndex, setCurrentDietIndex] = useState(0);
  const navigate = useNavigate();
  // Sample diet plans data
  const dietPlans = [
    { id: 1, name: "Flexible Dieting", image: "src/assets/images/home/flexible.png" },
    { id: 2, name: "5:2 Diet", image: "src/assets/images/home/rectangle.png" },
    { id: 3, name: "Classic Bodybuilding Diet", image: "src/assets/images/home/bodybuilding.png" },
    { id: 4, name: "Keto Diet", image: "src/assets/images/home/diets/keto.jpg" },
    { id: 5, name: "Paleo Diet", image: "src/assets/images/home/diets/paleo.jpg" },
    { id: 6, name: "Vegan Diet", image: "src/assets/images/home/diets/vegan.jpg" }
  ];

  // Display only 3 diet plans at a time
  const visibleDiets = () => {
    const endIndex = currentDietIndex + 3 > dietPlans.length ? dietPlans.length : currentDietIndex + 3;
    return dietPlans.slice(currentDietIndex, endIndex);
  };
  const handleLogout = () => {
    // Clear the user token from localStorage
    localStorage.removeItem('userToken');
    
    // Redirect to login page
    navigate('/login');
  };

  // Handle next/prev buttons for diet plans carousel
  const handleNext = () => {
    if (currentDietIndex + 3 < dietPlans.length) {
      setCurrentDietIndex(currentDietIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentDietIndex > 0) {
      setCurrentDietIndex(currentDietIndex - 1);
    }
  };

  // Handle FAQ toggles
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Sample FAQ data
  const faqs = [
    {
      question: "How does the meal planner work?",
      answer: "Each diet plan selected can be customised according to things such as your personal statistics, current physical condition, activity levels and whether you want to lose fat, stay in shape, or gain muscle. It can be personalised to whether you are a vegan or not, if you have any allergies such as gluten, also including the option for halal and kosher recipes only. You can even tell the planner that you prefer to only drink smoothies in the morning. Once your diet plan is set up, the meal planner automatically finds recipes to match the diet plan criteria. Have a look at the suggested recipes that are produced for you automatically and adjust until you get what is right for you."
    },
    {
      question: "Will I need to update BurnNGlow often?",
      answer: "This depends mainly on how fast your weight loss is. If you notice that your weight loss has started to stall you made need to set up a new plan with a lower calorie requirement (or increase your daily activity instead and stick with the same plan)."
    },
    {
      question: "How many meals a day should I eat?",
      answer: "We suggest that you eat the number of meals that you are comfortable eating and that fits into your daily schedule. Normally, we recommended 3 meals a day and a healthy snack or two. If you are an athlete it may be worth paying a bit more attention to the timing of your nutrition before and after training sessions."
    },
    {
      question: "How much exercise should I do?",
      answer: "To lose weight you don't necessarily have to go to the gym but we would recommend at least trying to be more active during the day and increasing the amount of walking you do. Best results tend to come from people who also undertake a basic weight training and cardiovascular exercise programme. The main point to take away here though is that you don't need to exercise excessively to get results!"
    },
    {
      question: "Do you offer training plans and 1 on 1 support?",
      answer: "Not currently, but we do work closely with a service called Hit My Macros. They offer an automatic macro meal planner, workout plans, as well as a personal coach to help guide you."
    }
  ];

  return (
    

    <div
    className="min-vh-100"
    style={{
      backgroundColor: "#FEFAE0",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  >
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your personalized experience...</p>
          </div>
        </div>
      ) : (

        <>
   
        <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-heart-pulse me-2"></i>BurnNGlow
        </Link>
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active fw-medium px-3" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
  <Link
    className="nav-link dropdown-toggle px-3"
    to="#"
    id="shopDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Shop
  </Link>
  <ul className="dropdown-menu" aria-labelledby="shopDropdown">
    <li>
      <Link className="dropdown-item" to="/shop/protein">Protein</Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/shop/creatine">Creatine</Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/shop/vitamin">Vitamins</Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/shop/fatburner">Fat Burners</Link>
    </li>
  </ul>
</li>

 

            <li className="nav-item">
              <Link className="nav-link px-3" to="/bmi-calculator">Calculator</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/exercise">Excercise</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="#">About</Link>
            </li>
            
          </ul>
          <div className="d-flex ms-lg-3">
            <button 
              onClick={handleLogout} 
              className="btn btn-light me-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

     
      </div>
        <div className="container py-5">
  
          {/* Hero Section */}
          <div className="row mb-5 align-items-center">
            <div className="col-xl-5 col-12 mb-4 mb-xl-0">
              <h1 className="display-4 fw-bold text-success mb-3">Your Personal Diet Planner</h1>
              <p className="lead text-secondary mb-4">
                Calorie and Macro Meal Planner. Serve up recipes for your
                personalized meal plan automatically. Calculate your nutritional
                needs and generate custom diet plans for weight loss, bodybuilding
                and much more!
              </p>
              <button type="button" className="btn btn-success btn-lg shadow-sm rounded-pill px-4 py-2">
              <a href="/calculate"className="text-white" style={{ textDecoration: 'none' }}>Get Started For Free</a>

                <i className="bi bi-chevron-right ms-2"></i>
              </button>
            </div>
            <div className="col-xl-7 col-12">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                    <img
                      src="src/assets/images/home/today-plan.png"
                      className="img-fluid"
                      alt="The meal planner page shows your current meal plan"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm rounded-3 overflow-hidden mb-4">
                    <img
                      src="src/assets/images/home/calories.png"
                      className="img-fluid"
                      alt="Enter your custom calorie target"
                    />
                  </div>
                  <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                    <img
                      src="src/assets/images/home/macro.png"
                      className="img-fluid"
                      alt="The macro meal planner"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          {/* FAQ Section */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
              <h2 className="text-center mb-4 fw-bold">Frequently Asked Questions</h2>
              <div className="accordion shadow-sm rounded-3 overflow-hidden" id="accordionFaq">
                {faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="accordion-item border-0"
                  >
                    <h3 className="accordion-header" id={`heading${index}`}>
                      <button 
                        className={`accordion-button ${activeFaq === index ? '' : 'collapsed'} fw-medium`}
                        type="button" 
                        onClick={() => toggleFaq(index)}
                        aria-expanded={activeFaq === index}
                        aria-controls={`collapse${index}`}
                      >
                        {faq.question}
                      </button>
                    </h3>
                    <div 
                      id={`collapse${index}`}
                      className={`accordion-collapse collapse ${activeFaq === index ? 'show' : ''}`}
                      aria-labelledby={`heading${index}`}
                    >
                      <div className="accordion-body text-secondary">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
              
          {/* Features Section */}
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2">Custom Diet Plans For Your Needs</h2>
            <p className="text-secondary mb-5">
              Personalize the meal plan to meet your needs
            </p>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <div className="col">
                <div className="card h-100 border-0 shadow-sm rounded-3 text-center p-3">
                  <div className="p-3">
                    <img
                      src="src/assets/images/home/custom-nutritional-targets.svg"
                      className="img-fluid mb-3"
                      style={{ height: "80px" }}
                      alt="You can set custom nutritional targets"
                    />
                    <h3 className="h4 mb-3">Custom Nutritional Targets</h3>
                    <p className="text-secondary">
                      We take the hard work out of setting up your nutritional
                      targets but in some cases you may want to make some
                      adjustments.
                      <br /><br />
                      Once your diet is set up you may edit the nutritional
                      targets for each individual day.
                      <br /><br />
                      Adjust a huge amount of criteria from calories,
                      protein, fats, carbohydrates, sugar, fibre and much more.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm rounded-3 text-center p-3">
                  <div className="p-3">
                    <img
                      src="src/assets/images/home/dietary-needs.svg"
                      className="img-fluid mb-3"
                      style={{ height: "80px" }}
                      alt="Our meal planner supports various dietary needs"
                    />
                    <h3 className="h4 mb-3">Dietary Needs</h3>
                    <p className="text-secondary">
                      Does your meal plan need to be Vegan, Gluten-free, Halal or is
                      subject to any other form of dietary restriction?
                      <br /><br />
                      When setting up your meal plan you can program the meal
                      planner to only find foods suitable for your personal needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm rounded-3 text-center p-3">
                  <div className="p-3">
                    <img
                      src="src/assets/images/home/adjust-meal-preferences.svg"
                      className="img-fluid mb-3"
                      style={{ height: "80px" }}
                      alt="In the meal plan wizard you can make many choices"
                    />
                    <h3 className="h4 mb-3">Adjust Meal Preferences</h3>
                    <p className="text-secondary">
                      Would you rather have your breakfast to be a meal replacement
                      drink because you don't have much time in the morning?
                      <br /><br />
                      You can adapt our recipe finder settings to ensure that
                      we find the most appropriate recipes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
              
          {/* Benefits Section */}
          <div className="text-center mb-5 pb-2">
            <h2 className="fw-bold mb-2">Save Time &amp; Eat Better</h2>
            <p className="text-secondary mb-5">
              Take the stress out of meal planning and stick to your plan.
            </p>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              <div className="col">
                <div className="card h-100 border-0 shadow-sm rounded-3 text-center p-3">
                  <div className="p-3">
                    <img
                      src="src/assets/images/home/meal-plan-generator.svg"
                      className="img-fluid mb-3"
                      style={{ height: "70px" }}
                      alt="The meal plan generator finds recipes automatically"
                    />
                    <h3 className="h5 mb-3">Meal Plan Generator</h3>
                    <p className="text-secondary small">
                      This is where we make things much easier for you...
                      <br /><br />
                      Calorie counting or setting yourself any other
                      nutritional targets is no use if you don't know what to eat.
                      <br /><br />
                      Our meal planner takes this issue away by doing all the
                      calculations for you and provides you with a full week's worth
                      of recipes tailored to both your nutritional and personal
                      needs!
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm rounded-3 text-center p-3">
                  <div className="p-3">
                    <img
                      src="src/assets/images/home/powerful-secipe-search.svg"
                      className="img-fluid mb-3"
                      style={{ height: "70px" }}
                      alt="Search for recipes manually"
                    />
                    <h3 className="h5 mb-3">Powerful Recipe Search</h3>
                    <p className="text-secondary small">
                      Instead of using our automatic recipe finder you may wish to
                      enter recipes manually.
                      <br /><br />
                      We allow you to do this with the help of our powerful
                      recipe search tool.
                      <br /><br />
                      You can set the criteria to return any type of recipe
                      you wish, including only returning recipes that do or don't
                      contain a particular ingredient.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm rounded-3 text-center p-3">
                  <div className="p-3">
                    <img
                      src="src/assets/images/home/grocery-list.svg"
                      className="img-fluid mb-3"
                      style={{ height: "70px" }}
                      alt="The meal planner comes with a grocery list"
                    />
                    <h3 className="h5 mb-3">Grocery List</h3>
                    <p className="text-secondary small">
                      After your meal plan has been created you can check out the
                      grocery list function, which lets you know all the ingredients
                      you need to make the recipes.
                      <br /><br />
                      Make use of the pantry function if you would like the
                      grocery list to recognise when you already have certain
                      ingredients.
                      <br /><br />
                      Export the shopping list to a PDF for you to either print off or 
                      have on your phone when you go shopping.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm rounded-3 text-center p-3">
                  <div className="p-3">
                    <img
                      src="src/assets/images/home/download-your-plan-to-pdf.png"
                      className="img-fluid rounded-3 mb-3"
                      style={{ height: "70px" }}
                      alt="Download your diet plan to PDF"
                    />
                    <h3 className="h5 mb-3">Download Plan to PDF</h3>
                    <p className="text-secondary small">
                      With BurnNGlow Premier you can view your plans offline
                      by downloading them to PDF. Try sticking the meal plan summary
                      to your fridge to keep you organized and motivated. If you are
                      a nutritionist, sending the meal plan and grocery list to your
                      clients in PDF format is nice and easy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
              
          {/* Success Stories */}
          <div className="bg-white rounded-3 shadow-sm p-5 mb-5">
            <h2 className="text-center fw-bold mb-2">Success Stories</h2>
            <p className="text-center text-secondary mb-5">
              Experience dramatic progress within 12 weeks
            </p>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              <div className="col">
                <div className="card border-0 shadow-sm rounded-3 overflow-hidden h-100">
                  <div style={{height: "300px", backgroundImage: 'url(src/assets/images/home/magaliprogress.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div className="card-body bg-light">
                    <h5 className="card-title">Magali's Journey</h5>
                    <p className="card-text small text-secondary">Transformed her lifestyle with our customized meal plan</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card border-0 shadow-sm rounded-3 overflow-hidden h-100">
                  <div style={{height: "300px", backgroundImage: 'url(src/assets/images/home/staceyprogress.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div className="card-body bg-light">
                    <h5 className="card-title">Stacey's Success</h5>
                    <p className="card-text small text-secondary">Achieved her fitness goals with dedicated planning</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card border-0 shadow-sm rounded-3 overflow-hidden h-100">
                <div 
    style={{
      height: "300px", 
      backgroundImage: 'url(src/assets/images/home/jacobprogress.png)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center'
    }}
  ></div>                  <div className="card-body bg-light">
                    <h5 className="card-title">Jacob's Transformation</h5>
                    <p className="card-text small text-secondary">Built lean muscle with our bodybuilding diet plan</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card border-0 shadow-sm rounded-3 overflow-hidden h-100">
                  <div style={{height: "300px", backgroundImage: 'url(src/assets/images/home/adamprogress.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div className="card-body bg-light">
                    <h5 className="card-title">Adam's Achievement</h5>
                    <p className="card-text small text-secondary">Lost weight sustainably with our flexible approach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
              
          {/* Diet Plans */}
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2">Choose A Diet Plan Right For You</h2>
            <p className="text-secondary mb-4">
              We build custom diet plans but we also offer popular diets
            </p>
            <div className="position-relative">
            
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {visibleDiets().map((diet) => (
                  <div key={diet.id} className="col">
                    <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                      <div 
                        style={{
                          height: "250px", 
                          backgroundImage: `url(${diet.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative'
                        }}
                      >
                        <div className="position-absolute bottom-0 start-0 end-0 p-3 text-white bg-dark bg-opacity-75">
                          <h4 className="mb-2">{diet.name}</h4>
                          <button className="btn btn-success btn-sm">Choose</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
            
          {/* Footer */}
          <footer className="bg-white text-dark rounded-3 shadow-sm p-5 mt-5">
  <div className="row gy-4">
    <div className="col-12 d-flex justify-content-between align-items-center">
      <img 
        src="src/assets/images/01-logo-dark.svg" 
        alt="logo" 
        className="mb-3" 
        style={{ height: "40px" }} 
      />
      <div className="text-secondary">©2025 BurnNGlow Ltd</div>
    </div>
  </div>
</footer>

          
        </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;