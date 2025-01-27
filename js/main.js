import { evaluateExpression } from "./calculator.js";
import stack from "./stack.js";
import validateExpression from "./validate.js";
import calculateAns from "./calculateAnswer.js";
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const body = document.getElementById("body");
let currentExpression = "0";

function updateDisplay() {
  display.textContent = currentExpression;
}

function displayIsEmpty() {
  return currentExpression == "0";
}

// using set to reduce time complexity to O(1)
const scientificOperations = new Set(["sin", "cos", "tan", "log"]);

function isScientificOperation(value) {
  return scientificOperations.has(value) ? value + "(" : value;
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const action = button.dataset.action;
    let value = button.dataset.value;

    if (action === "clear") {
      currentExpression = "0";
    } else if (action === "delete") {
      // to delete 4 spaces backwards in case of sin( cos( tan( log(
      const condition =
        currentExpression[currentExpression.length - 1] == "(" &&
        isNaN(currentExpression[currentExpression.length - 2]);

      if (condition) {
        currentExpression = currentExpression.slice(0, -4);
        if (currentExpression.length == 0) {
          currentExpression = "0";
        }
      } else if (currentExpression.length > 1) {
        currentExpression = currentExpression.slice(0, -1);
      } else {
        currentExpression = "0";
      }
    } else if (action === "equals") {
      try {
        console.log(currentExpression);
        const ans = evaluateExpression(currentExpression);
        currentExpression = `= ${parseFloat(ans.toFixed(14))} `;
      } catch (error) {
        currentExpression = "Error";
      }
    } else if (value) {
      // if scientific expression , then add extra ( after the expression
      value = isScientificOperation(value);
      if (value == "(") {
        value = "*(";
      }
      if (displayIsEmpty()) {
        currentExpression = value;
      } else {
        currentExpression += value;
      }
    }
    updateDisplay();
  });
});

function setMode() {
  const dark = document.getElementById("dark");
  const light = document.getElementById("light");
  const body = document.body;

  light.style.display = "none";
  dark.style.display = "block";
  body.style.backgroundColor = "#ffffff";

  dark.addEventListener("click", () => {
    dark.style.display = "none";
    light.style.display = "block";
    body.style.backgroundColor = "#373737";
  });

  light.addEventListener("click", () => {
    light.style.display = "none";
    dark.style.display = "block";
    body.style.backgroundColor = "#ffffff";
  });
}

setMode();
