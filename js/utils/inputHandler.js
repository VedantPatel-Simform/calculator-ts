import { evaluateExpression } from "../calculator/calculator.js";

function inputHandler(action, value, currentExpression, myHistory) {
  let temp;
  function displayIsEmpty() {
    return currentExpression == "0";
  }

  // using set to reduce time complexity to O(1)
  const scientificOperations = new Set(["sin", "cos", "tan", "log"]);

  function isScientificOperation(value) {
    return scientificOperations.has(value) ? value + "(" : value;
  }

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
      const ans = evaluateExpression(currentExpression);
      temp = {
        expression: currentExpression,
        ans,
      };
      currentExpression = `${parseFloat(ans.toFixed(14))}`;
      myHistory.add(temp);
    } catch (error) {
      currentExpression = "Error";
    }
  } else if (value) {
    // if scientific expression , then add extra ( after the expression, like sin( , cos( ......
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

  return { history: temp, currentExpression };
}

export default inputHandler;
