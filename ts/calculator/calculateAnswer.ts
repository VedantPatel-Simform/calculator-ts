import stack from "../utils/stack.js";

// Define operator precedence
const precedence: Record<string, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "^": 4,
};

// Function to check if a value is an operand (number)
function isOperand(val: number): boolean {
  return !isNaN(val);
}

function infixToPostfix(tokens: string[]): string[] {
  const myStack = stack();
  const expression: string[] = [];

  tokens.forEach((token) => {
    if (isOperand(parseFloat(token))) {
      expression.push(token);
    } else if (token === "(") {
      myStack.push(token);
    } else {
      if (token === ")") {
        while (!myStack.isEmpty() && myStack.peek() !== "(") {
          expression.push(myStack.pop() as string);
        }
        myStack.pop(); // Remove "("
      } else {
        while (
          !myStack.isEmpty() &&
          precedence[myStack.peek() as string] >= precedence[token]
        ) {
          expression.push(myStack.pop() as string);
        }
        myStack.push(token);
      }
    }
  });

  while (!myStack.isEmpty()) {
    expression.push(myStack.pop() as string);
  }

  return expression;
}

function evaluatePostfix(postfix: string[]): number {
  const myStack = stack();

  postfix.forEach((token) => {
    if (isOperand(parseFloat(token))) {
      myStack.push(token);
    } else {
      const b = parseFloat(myStack.pop() as string);
      const a = parseFloat(myStack.pop() as string);

      let result: number;
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

  return parseFloat(myStack.pop() as string);
}

function calculateAns(tokens: string[]): string {
  const postfix = infixToPostfix(tokens);
  const ans: number = evaluatePostfix(postfix);
  return ans >= 0 ? String(ans) : `\\\\${ans}`;
}

export default calculateAns;
