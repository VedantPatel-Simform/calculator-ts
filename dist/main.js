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
        let answer = inputHandler(action, value, currentExpression, myHistory, document);
        currentExpression = answer.currentExpression;
        const modified = replaceMinus(currentExpression);
        updateDisplay(modified);
        button.blur();
    });
});
setMode(document);
openModal(document);
document.getElementById("clear-history").addEventListener("click", () => {
    myHistory.clearHistory();
});
function setAction(event) {
    if (event.code == "Backspace") {
        return "delete";
    }
    else if (event.code == "Enter") {
        return "equals";
    }
}
function setValue(event) {
    const digit = parseInt(event.code.slice(-1));
    if (!isNaN(digit)) {
        return digit;
    }
    else if (["+", "-", "/", "*", "^"].includes(event.key)) {
        return event.key;
    }
}
document.onkeydown = (event) => {
    const action = setAction(event);
    const value = action === "equals" ? undefined : setValue(event);
    let answer = inputHandler(action, value, currentExpression, myHistory, document);
    currentExpression = answer.currentExpression;
    const modified = replaceMinus(currentExpression);
    updateDisplay(modified);
};
