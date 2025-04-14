const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
let isError = false;

function cleanInputString(str) {
  const regex = /[^0-9]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `<label for="${entryDropdown.value}-${entryNumber}-name"> Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" name="${entryDropdown.value}-${entryNumber}-name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories" />
  `;
}

targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
addEntryButton.addEventListener("click", addEntry);

function getCaloriesFromInput(list) {
  let calories = 0;
  const invalidInputMatch = isInvalidInput(currVal);
  for (const item of list) {
    const currVal = cleanInputString(item.value);
    if (invalidInputMatch) {
      alert(`Invalid input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;
  const breakfastInputs = document.querySelectorAll(
    `#breakfast input[type='number']`
  );
  const lunchInputs = document.querySelectorAll(`#lunch input[type='number']`);
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type='number']"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type='number']"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type='number']"
  );
  const breakfastCalories = getCaloriesFromInput(breakfastInputs);
  const lunchCalories = getCaloriesFromInput(lunchInputs);
  const dinnerCalories = getCaloriesFromInput(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInput(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInput(exerciseNumberInputs);

  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
}
