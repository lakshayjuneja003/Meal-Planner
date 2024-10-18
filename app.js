const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Function to generate a sample meal plan based on calorie goal and diet preference
function generateMealPlan(dietPreference) {
    const mealPlans = {
        'Standard': {
            breakfast: '2 eggs, Toast, Fresh fruit',
            lunch: 'Grilled chicken salad, Whole grain bread',
            dinner: 'Salmon with vegetables, Quinoa'
        },
        'Vegetarian': {
            breakfast: 'Oatmeal with fruits, Almonds',
            lunch: 'Quinoa salad with chickpeas, Avocado',
            dinner: 'Vegetable stir-fry with tofu, Brown rice'
        },
        'Keto': {
            breakfast: 'Avocado and bacon, Scrambled eggs',
            lunch: 'Chicken salad with olive oil, Cheese',
            dinner: 'Steak with broccoli, Cauliflower mash'
        }
    };
    return mealPlans[dietPreference] || {
        breakfast: "No breakfast option available.",
        lunch: "No lunch option available.",
        dinner: "No dinner option available."
    };
}

// Route to render the index.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route to handle meal plan generation
app.post('/generate_meal', (req, res) => {
    const { name, calorie_goal, diet_preference } = req.body;

    // Generate meal plan
    const mealPlan = generateMealPlan(diet_preference);

    // Return response as JSON without saving user data
    res.json({
        name,
        calorie_goal,
        diet_preference,
        meal_plan: mealPlan
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
