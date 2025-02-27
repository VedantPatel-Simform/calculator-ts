import { evaluateExpression } from "../calculator/calculator.js";
function inputHandler(action, value, currentExpression, myHistory, document) {
    let temp;
    function displayIsEmpty() {
        return currentExpression === "0";
    }
    // Using a Set for O(1) lookup time complexity
    const scientificOperations = new Set(["sin", "cos", "tan", "log", "sqrt"]);
    function isScientificOperation(value) {
        return scientificOperations.has(value) ? value + "(" : value;
    }
    function deleteFeature() {
        // Delete 4 spaces backwards in case of sin( cos( tan( log(
        const condition = currentExpression[currentExpression.length - 1] === "(" &&
            isNaN(Number(currentExpression[currentExpression.length - 2]));
        if (condition) {
            currentExpression = currentExpression.slice(0, -4);
            if (currentExpression.length === 0) {
                currentExpression = "0";
            }
        }
        else if (currentExpression.length > 1) {
            currentExpression = currentExpression.slice(0, -1);
        }
        else {
            currentExpression = "0";
        }
    }
    function formatAnswer(ans) {
        let finalAnswer;
        let temp = ans.replaceAll("\\\\", "");
        finalAnswer = isNaN(Number(temp)) ? ans : temp;
        return Number(finalAnswer);
    }
    if (action === "clear") {
        currentExpression = "0";
    }
    else if (action === "delete") {
        deleteFeature();
    }
    else if (action === "equals") {
        try {
            const ans = evaluateExpression(currentExpression);
            const removedMinusExpression = currentExpression.replaceAll("\\\\", " ");
            let finalAnswer = formatAnswer(ans);
            temp = {
                expression: removedMinusExpression,
                ans: finalAnswer,
            };
            if (isNaN(Number(finalAnswer))) {
                currentExpression = String(ans);
            }
            else {
                currentExpression = `${parseFloat(Number(finalAnswer).toFixed(14))}`;
                myHistory.add(temp);
            }
        }
        catch (error) {
            currentExpression = error.message;
        }
    }
    else if (value) {
        // If scientific expression, add extra "(" after the expression (e.g., sin(, cos( ...)
        value = isScientificOperation(String(value));
        if (value === "(") {
            value = "(";
        }
        currentExpression = displayIsEmpty() ? value : currentExpression + value;
    }
    return { history: temp, currentExpression };
}
export default inputHandler;
