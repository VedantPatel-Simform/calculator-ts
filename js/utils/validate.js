function validateExpression(expr) {
  // Allow the leading negative sign for numbers (e.g., -20)
  const validExpr = expr.trim();
  console.log("in validation............");
  // Check balanced parentheses
  let openParenCount = 0;
  for (let i = 0; i < validExpr.length; i++) {
    let char = validExpr[i];
    if (char === "(") openParenCount++;
    if (char === ")") openParenCount--;
    if (openParenCount < 0) return "Parenthesis Error";
  }
  if (openParenCount !== 0) return "Parenthesis Error";

  // Tokenize the expression to handle unary minus correctly
  const tokens = [];
  let numberBuffer = "";
  for (let i = 0; i < validExpr.length; i++) {
    const char = validExpr[i];

    if (/[0-9.]/.test(char)) {
      // Collect digits and decimal points
      numberBuffer += char;
    } else {
      if (numberBuffer) {
        tokens.push(numberBuffer);
        numberBuffer = "";
      }

      if (
        char === "-" &&
        (tokens.length === 0 || /[+(*/^-]/.test(tokens[tokens.length - 1]))
      ) {
        // Treat '-' as a unary operator if it's at the start or follows an operator/parenthesis
        numberBuffer += char;
      } else if (/[-+*/^()]/.test(char)) {
        // Push operators and parentheses directly
        tokens.push(char);
      } else if (!/\s/.test(char)) {
        // Invalid character detected
        return "Invalid Character Error";
      }
    }
  }

  if (numberBuffer) tokens.push(numberBuffer);

  // Rejoin tokens to verify the final expression for errors
  const rejoinedExpr = tokens.join("");

  // Checks if expression starts or ends with an operator, or contains consecutive operators
  if (
    /^[+*/^]/.test(rejoinedExpr) || // checks if the expr starts with an invalid operator
    /[+*/^]$/.test(rejoinedExpr) || // checks if expr ends with operator
    /[+*/^]{2,}/.test(rejoinedExpr) // checks for consecutive operators (excluding unary minus)
  ) {
    return "Expression Error";
  }

  // If the expression contains empty parentheses
  if (/\(\s*\)/.test(rejoinedExpr)) {
    return "Empty Parenthesis Error";
  }

  return null; // Expression is valid
}

export default validateExpression;
