import {useState} from "react";

export default function App() {
const [ingredients,setIngredients]=useState([]);
const[selectedTime, setSelectedTime]=useState("");
const [selectedMeal, setSelectedMeal]=useState("");
const [finalRecipe,setFinalRecipe]=useState("");
return (
<div>
  <div className="flex flex-col">
    <div className="flex flex-row justify-around items-center content-center mt-11 ">
      <div>
        <div className="flex flex-col ">
          <div><ItemList ingredients={ingredients} setIngredients={setIngredients}/></div>
          <div><CookingTimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime}/></div>
          <div><MealTypeDropdown selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal}/></div>
        </div>
      </div>
      <div><GetRecipe ingredients={ingredients} setIngredients={setIngredients} selectedTime={selectedTime} setSelectedTime={setSelectedTime} selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal} finalRecipe={finalRecipe} setFinalRecipe={setFinalRecipe}/></div>
      <div><DisplayRecipe finalRecipe={finalRecipe} setFinalRecipe={setFinalRecipe}/></div>
    </div>
    <div className="flex flex-row flex-wrap">
      <Chips ingredients={ingredients} setIngredients={setIngredients} />
    </div>
  </div>
</div>

);
    
}


// component - textbox and a ok button for writng the ingrdeitn name and selecting it 

function ItemList({ingredients,setIngredients}) {
  // State variable for storing items
  const [inputValue, setInputValue] = useState(''); // Ye textbox ke value ke liye

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update inputValue state with textbox value
  };

  // Function to handle adding item to the list
  const handleAddItem = () => {
    if (inputValue.trim() !== '') { // Check if input is not empty
      setIngredients([...ingredients, inputValue]); // Append new item to the list
      setInputValue(''); // Reset input field after adding
    }
  };

  return (
    <div>
      <div className="max-w-xs mx-auto m-4">
      <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Available Ingredient</h3>
      <input 
        type="text" 
        value={inputValue} // Bind the input value to state
        onChange={handleInputChange} // Call this function on input change
        placeholder="Enter item" 
        id="ingredient" className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
      />

      <button onClick={handleAddItem} className= "text-white mt-1 bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Add Item</button> {/* Button to add item */}
      
      </div>
    </div>
    
    
  );
}

//a dro down menu for 

function CookingTimeSelector({selectedTime, setSelectedTime}) {
  // State variable for storing selected time

  // Function to handle when a user selects a time from the dropdown
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value); // Update selectedTime with the selected option's value
  };

  return (
    <div className="max-w-xs mx-auto m-4">
      <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Cooking Time</h3>

       {/* Dropdown menu */}
      <select value={selectedTime} onChange={handleTimeChange} className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option value="" disabled>--Select Cooking Time--</option> {/* Placeholder option */}
        <option value="<30 min">Less than 30 min</option>
        <option value="30-60 min">30-60 min</option>
        <option value=">60 min">More than 60 min</option>
      </select>
    </div>
  );
}

function MealTypeDropdown({selectedMeal, setSelectedMeal}) {
  
  // Function to handle change in dropdown selection
  const handleMealChange = (e) => {
    setSelectedMeal(e.target.value); // Update selected meal type
  };

  return (
    <div className="max-w-xs mx-auto m-4">
      <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Meal Type</h3>
      <select 
        value={selectedMeal} // Bind the select value to state
        onChange={handleMealChange} // Call this function on change
        className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
      >
        <option value="" disabled>--Select a meal type--</option> {/* Placeholder option */}
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="snacks">Snacks</option>
        <option value="dinner">Dinner</option>
      </select>
    </div>
  );
}




function Chips({ ingredients, setIngredients }) {
  // Function to handle the removal of a chip
  const handleRemove = (ingredientToRemove) => {
    // Update the ingredients list by filtering out the removed ingredient
    const currIngredients=[...ingredients]
    setIngredients(currIngredients.filter((el) => el !== ingredientToRemove));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {
      ingredients.map((ingredient, index) => (
        <span key={index} className="bg-red-200 flex items-center text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">{ingredient}
          <button onClick={() => handleRemove(ingredient)} className="ml-2 text-red-600 hover:text-red-800">
            &times; {/* Cross icon */}
          </button>
        </span>
                                              )
                      )
      }
    </div>
  );
}

function GetRecipe({ingredients,setIngredients,selectedTime, setSelectedTime,selectedMeal, setSelectedMeal,finalRecipe,setFinalRecipe}){


  
// Prepare the data to send to the API
const recipeData = {
  "ingredients": ingredients,
  "cookingTime": selectedTime,
  "mealType": selectedMeal,
};

 
const handleOnclick=()=>{
  // Check if any field is empty
let message = '';
if (ingredients.length === 0) {
  message += 'Ingredients list is empty. ';
}
if (!selectedTime) {
  message += 'Cooking time is empty. ';
}
if (!selectedMeal) {
  message += 'Meal type is empty.';
}

// If any field is empty, alert the message and return
if (message) {
  alert(message+" Please fill them.");
  return;
}


  fetch('http://127.0.0.1:5000/submit-ingredients', {
    method: 'POST',
    headers: {
              'Content-Type': 'application/json',
            }  ,
    body: JSON.stringify(recipeData), // Convert object to JSON format
  })
  .then((response) => {
    // Check if response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Convert response to JSON
    return response.json();
  })
  .then((result) => {
    // Handle the result (JSON response)
    const finalRecipeText=result.serverfinalrecipe;
    setFinalRecipe(finalRecipeText)
  })
  .catch((error) => {
    // Handle errors in the request
    console.log(error);
    alert('Failed to submit recipe. Please try again.');
  });
}
//button return hoga - and server ko request jayega vo button dabane se - and fir server se recieve karega recipe 
  return (
    <div>
      <button onClick={handleOnclick} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Get Recipe
        </span>
      </button>
    </div>
  );
}

function DisplayRecipe({finalRecipe , setFinalRecipe})
{
  const handleClearRecipe=()=>{
    setFinalRecipe('');
  }
  const formattedRecipe = finalRecipe ? finalRecipe.split("\n") : [];
  return (
    <div>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Your Final Recipe :</h5>
        <div>
        {formattedRecipe.map((line, index) => (
        <p className="font-normal text-gray-700 dark:text-gray-400" key={index}>{line}</p>)
          )
        }
        </div>
      </div>
     
      <div>
      <button onClick={handleClearRecipe} className=" mt-4 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Clear Recipe</button>
      </div>
    </div>
  );
}

