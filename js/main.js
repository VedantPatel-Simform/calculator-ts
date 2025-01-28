import { evaluateExpression } from "./calculator.js";
import stack from "./stack.js";
import validateExpression from "./validate.js";
import calculateAns from "./calculateAnswer.js";
import history from "./history.js";
import openModal from "./openModal.js";
import setMode from "./darkMode.js";
import inputHandler from "./inputHandler.js";

const myHistory = history();
myHistory.init();

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const body = document.getElementById("body");
let currentExpression = "0";

function updateDisplay(expression) {
  display.textContent = currentExpression;
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const action = button.dataset.action;
    let value = button.dataset.value;
    let answer = inputHandler(action, value, currentExpression, myHistory);
    currentExpression = answer.currentExpression;
    updateDisplay(currentExpression);
  });
});

setMode(document);

openModal(document);

document.getElementById("clear-history").addEventListener("click", () => {
  myHistory.clearHistory();
});
