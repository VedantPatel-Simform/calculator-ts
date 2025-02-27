import stack from "../utils/stack.js";
// Define operator precedence
const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 4,
};
// Function to check if a value is an operand (number)
function isOperand(val) {
    return !isNaN(val);
}
function infixToPostfix(tokens) {
    const myStack = stack();
    const expression = [];
    tokens.forEach((token) => {
        if (isOperand(parseFloat(token))) {
            expression.push(token);
        }
        else if (token === "(") {
            myStack.push(token);
        }
        else {
            if (token === ")") {
                while (!myStack.isEmpty() && myStack.peek() !== "(") {
                    expression.push(myStack.pop());
                }
                myStack.pop(); // Remove "("
            }
            else {
                while (!myStack.isEmpty() &&
                    precedence[myStack.peek()] >= precedence[token]) {
                    expression.push(myStack.pop());
                }
                myStack.push(token);
            }
        }
    });
    while (!myStack.isEmpty()) {
        expression.push(myStack.pop());
    }
    return expression;
}
function evaluatePostfix(postfix) {
    const myStack = stack();
    postfix.forEach((token) => {
        if (isOperand(parseFloat(token))) {
            myStack.push(token);
        }
        else {
            const b = parseFloat(myStack.pop());
            const a = parseFloat(myStack.pop());
            let result;
            switch (token) {
                case "+":
                    result = a + b;
                    break;
                case "-":
                    result = a - b;
                    break;
                case "*":
                    result = a * b;
                    break;
                case "/":
                    result = a / b;
                    break;
                case "^":
                    result = Math.pow(a, b);
                    break;
                default:
                    throw new Error(`Invalid operator: ${token}`);
            }
            myStack.push(String(result));
        }
    });
    return parseFloat(myStack.pop());
}
function calculateAns(tokens) {
    const postfix = infixToPostfix(tokens);
    const ans = evaluatePostfix(postfix);
    return ans >= 0 ? ans : `\\\\${ans}`;
}
export default calculateAns;
