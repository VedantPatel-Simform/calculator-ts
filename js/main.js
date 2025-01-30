import { evaluateExpression } from "./calculator/calculator.js";
import stack from "./utils/stack.js";
import validateExpression from "./utils/validate.js";
import calculateAns from "./calculator/calculateAnswer.js";
import history from "./calculator/history.js";
import openModal from "./utils/openModal.js";
import setMode from "./utils/darkMode.js";
import inputHandler from "./utils/inputHandler.js";

const myHistory = history();
myHistory.init();

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let currentExpression = "0";

function updateDisplay(expression) {
  display.textContent = expression;
}

function replaceMinus(expr) {
  let temp = expr.replaceAll("\\\\", " "); // Single backslash in the regex
  return temp;
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const action = button.dataset.action;
    let value = button.dataset.value;
    let answer = inputHandler(action, value, currentExpression, myHistory);
    currentExpression = answer.currentExpression;
    const modified = replaceMinus(currentExpression);
    updateDisplay(modified);
  });
});

setMode(document);

openModal(document);

document.getElementById("clear-history").addEventListener("click", () => {
  myHistory.clearHistory();
});
