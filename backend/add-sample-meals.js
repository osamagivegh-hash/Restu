const mongoose = require('mongoose');
const Meal = require('./models/Meal');
const fs = require('fs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oriental-restaurant')
  .then(() => {
    console.log('Connected to MongoDB');
    addSampleMeals();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

async function addSampleMeals() {
  try {
    // Read sample meals from JSON file
    const sampleMeals = JSON.parse(fs.readFileSync('./sample-meals.json', 'utf8'));
    
    // Clear existing meals
    await Meal.deleteMany({});
    console.log('Cleared existing meals');
    
    // Add sample meals
    for (const mealData of sampleMeals) {
      const meal = new Meal(mealData);
      await meal.save();
      console.log(`Added meal: ${mealData.name}`);
    }
    
    console.log(`Successfully added ${sampleMeals.length} sample meals`);
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample meals:', error);
    process.exit(1);
  }
}
