function validateExpression(expr) {
    // check balanced parenthesis
    let openParenCount = 0;
    for (let char of expr) {
        if (char === "(")
            openParenCount++;
        if (char === ")")
            openParenCount--;
        if (openParenCount < 0)
            return "Parenthesis Error";
    }
    if (openParenCount !== 0)
        return "Parenthesis Error";
    if (/^[+\-*/^]/.test(expr) || // checks if the expr starts with operator
        /[+\-*/^]$/.test(expr) || // checks if expr ends with operator
        /[+\-*/^]{2,}/.test(expr) // checks continuous operators
    ) {
        return "Expression Error";
    }
    // if the expression contains empty parentheses
    if (/\(\s*\)/.test(expr)) {
        return "Empty Parenthesis Error";
    }
    // Check if a decimal point is used without a number before it
    if (/\.\d/.test(expr) && !/\d\./.test(expr)) {
        return "Expression Error";
    }
    return null;
}
export default validateExpression;
