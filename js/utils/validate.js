function validateExpression(expr) {
  // check balanced parenthesis
  let openParenCount = 0;
  for (let char of expr) {
    if (char === "(") openParenCount++;
    if (char === ")") openParenCount--;
    if (openParenCount < 0) return "Parenthesis Error";
  }
  if (openParenCount !== 0) return "Parenthesis Error";

  // Allow negative numbers at the start but prevent starting with other operators
  if (/^[+\/*^]/.test(expr)) {
    // Allow "-" at the start
    return "Expression Error";
  }

  // Prevent expressions ending with an operator
  if (/[+\-*/^]$/.test(expr)) {
    return "Expression Error";
  }

  // Prevent consecutive operators (except allowing "-" after an operator for negative numbers)
  if (
    /[*\/^]{2,}/.test(expr) ||
    /[+\-*/^]{2,}/.test(expr.replace(/(?<!\d)-/g, ""))
  ) {
    return "Expression Error";
  }

  // if the expression contains empty parentheses
  if (/\(\s*\)/.test(expr)) {
    return "Empty Parenthesis Error";
  }

  return null;
}

export default validateExpression;
