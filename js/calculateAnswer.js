import stack from "./stack.js";

const precedence = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "(": 3,
  ")": 3,
  "^": 4,
};

function isOperand(val) {
  return !isNaN(val);
}

function infixToPostfix(tokens) {
  const myStack = new stack();
  const expression = [];

  tokens.forEach((token) => {
    if (isOperand(token)) {
      expression.push(token);
    } else {
      if (token === "(") {
        myStack.push(token);
      } else if (token === ")") {
        // Pop until '(' is encountered
        while (!myStack.isEmpty() && myStack.peek() !== "(") {
          expression.push(myStack.pop());
        }
        myStack.pop(); // pop the '('
      } else {
        // Operator handling
        while (
          !myStack.isEmpty() &&
          precedence[myStack.peek()] >= precedence[token]
        ) {
          expression.push(myStack.pop());
        }
        myStack.push(token);
      }
    }
  });

  // Pop remaining operators in the stack
  while (!myStack.isEmpty()) {
    expression.push(myStack.pop());
  }

  return expression;
}

function evaluatePostfix(tokens) {
  const myStack = new stack();

  tokens.forEach((token) => {
    if (isOperand(token)) {
      myStack.push(parseFloat(token)); // push operand
    } else {
      const b = myStack.pop();
      const a = myStack.pop();

      // Perform operation based on the token
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
          break;
      }

      myStack.push(result);
    }
  });

  return myStack.pop(); // Final result after processing all tokens
}

function calculateAns(tokens) {
  const postfix = infixToPostfix(tokens);
  const ans = evaluatePostfix(postfix);
  return ans;
}

export default calculateAns;
