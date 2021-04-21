/**
 * Class represents a food object
 */
class Foods {
  constructor(name, calories, protein, carbs, veggie, mealType) {
    this.name = name;
    this.calories = calories;
    this.protein = protein;
    this.carbs = carbs;
    this.mealType = mealType;
  }
}

//Initializing Appetizers
var breadSticks = new Foods("Bread Sticks", 140, 5, 26)
var fries = new Foods("Fries", 110, 2, 20)
var appleSlices = new Foods("Apple Slices", 95, 0.5, 25)
var garlicBread = new Foods("Garlic Bread", 140, 5, 29)
var ceaserSalad = new Foods("Ceaser Salad", 130, 4.5, 19)
var onionRings = new Foods("Onion Rings", 170, 3, 16)
var friedPickles = new Foods("Fried Pickles", 150, 0, 15)

//Initializing Main Courses
var lasagna = new Foods("Lasagna", 275, 15, 42)
var pizza = new Foods("Pizza", 320, 16, 31)
var steak = new Foods("Steak", 340, 67.6, 0)
var butterChicken = new Foods("Butter Chicken", 336, 14, 19)
var daal = new Foods("Daal", 280, 9.6, 15.2)
var salmon = new Foods("Salmon", 340, 37, 0)
var sushi = new Foods("Sushi", 247, 10.4, 38.4)
var kabab = new Foods("Kabab", 300, 20, 3.8, )
var fruitSalad = new Foods("Fruit Salad", 204, 3, 52)
var cheeseBurger = new Foods("Cheese Burger", 300, 15, 33, true)

//Intializing Desserts
var applePie = new Foods("Apple Pie", 270, 3, 34);
var iceCream = new Foods("Ice Cream", 250, 4, 25);
var cake = new Foods("Cake", 209, 2, 30);
var chocolate = new Foods("Chocolate", 160, 17, 17);
var cremeBrulee = new Foods("Creme Brulee", 210, 13, 18);
var macaroons = new Foods("Macaroons", 140, 1, 17);

//Stores foods in arrays
var appetizers = [breadSticks, fries, appleSlices, garlicBread, ceaserSalad, onionRings, friedPickles]
var mainCourses = [lasagna, pizza, steak, butterChicken, daal, salmon, sushi, kabab, fruitSalad, cheeseBurger]
var desserts = [applePie, iceCream, cake, chocolate, cremeBrulee, macaroons]

/**
 * Collects the selected food value and name
 */
function RecommendationSetter() {
  var foodSelected = document.getElementById('dropdown');
  var foodSelectedValue = foodSelected.options[foodSelected.selectedIndex].value;
  var foodSelectedName = foodSelected.options[foodSelected.selectedIndex].text;
  $('#myModal').modal('toggle')
  MealType(foodSelectedValue, foodSelectedName);
}

/**
 * Displays the food type on the Modal as ether an appetizer, main course or dessert
 *
 * @param {string} foodSelectedValue the value representation of the food
 * @param {string} foodSelectedName the name of the food
 */
function MealType(foodSelectedValue, foodSelectedName) {
  document.getElementById("ModalLabel").innerHTML = "Food Recommendation";
  for (i = 0; i < appetizers.length; i++) {
    if (appetizers[i].name == foodSelectedValue) {
      document.getElementById("modal-inner-text").innerHTML = foodSelectedName + " is best served as an appetizer!";
      break;
    } else if (mainCourses[i].name == foodSelectedValue) {
      document.getElementById("modal-inner-text").innerHTML = foodSelectedName + " is best served as a main course!";
      break;
    } else if (desserts[i].name == foodSelectedValue) {
      document.getElementById("modal-inner-text").innerHTML = foodSelectedName + " is best served as a dessert!";
      break;
    }
  }
}

/**
 * Displays the meal and total nutrients on the Modal
 *
 * @param {Foods}  appetizer the appetizer of the meal
 * @param {Foods} mainCourse the main course of the meal
 * @param {Foods} dessert the dessrt of the meal
 * @param {string} mealName the name of the meal
 */
function MealCreator(appetizer, mainCourse, dessert, mealName) {
  var totalCalories = appetizer.calories + mainCourse.calories + dessert.calories;
  var totalProtein = appetizer.protein + mainCourse.protein + dessert.protein;
  var totalCarbs = appetizer.carbs + mainCourse.carbs + dessert.carbs;

  //Displays information on Modal
  document.getElementById("ModalLabel").innerHTML = mealName;
  document.getElementById("modal-inner-text").innerHTML = "Appetizer: " + appetizer.name + "<br/>" + "Main Course: " + mainCourse.name + "<br/>" + "Dessert: " + dessert.name + "<br/>" + "<br/>" + "Total Calories: " + totalCalories + " kcal" + "<br/>" + "Total Protein " + totalProtein + " grams" + "<br/>" + "Total Carbs: " + totalCarbs + " grams";
  $('#myModal').modal('toggle')
}

/**
 * Takes nutrient requirements to create optimal meal
 */
function MealPlanner() {
  var calorieSelected = document.getElementById('calories');
  var proteinSelected = document.getElementById('protein');
  var carbsSelected = document.getElementById('carbs');

  var calorieAmount = calorieSelected.options[calorieSelected.selectedIndex].value;
  var proteinAmount = proteinSelected.options[proteinSelected.selectedIndex].value;
  var carbAmount = carbsSelected.options[carbsSelected.selectedIndex].value;

  //Errors checks to determine all values are valid
  if (calorieAmount == "undefined" || proteinAmount == "undefined" || carbAmount == "undefined") {
    alert("Please enter a valid Number!")
    return;
  }

  var calorieDiff, proteinDiff, carbDiff, score = 0;
  var lowestScore = 10000;
  var currentFoods = [1, 2, 3];

  //Sorts through all combinations and determines meal that is closest to required nutrients
  for (i = 0; i < appetizers.length; i++) {
    for (j = 0; j < mainCourses.length; j++) {
      for (k = 0; k < desserts.length; k++) {
        calorieDiff = Math.abs((calorieAmount - (appetizers[i].calories + mainCourses[j].calories + desserts[k].calories)) * 0.25);
        proteinDiff = Math.abs(proteinAmount - (appetizers[i].protein + mainCourses[j].protein + desserts[k].protein));
        carbDiff = Math.abs(carbAmount - (appetizers[i].carbs + mainCourses[j].carbs + desserts[k].carbs));
        score = calorieDiff + proteinDiff + carbDiff;

        //Checks if current score is lowest and stores meal if so
        if (lowestScore > score) {
          lowestScore = score;
          currentFoods[0] = appetizers[i]
          currentFoods[1] = mainCourses[j];
          currentFoods[2] = desserts[k];
        }
      }
    }
  }
  MealCreator(currentFoods[0], currentFoods[1], currentFoods[2], 'Custom Meal Plan');
}
