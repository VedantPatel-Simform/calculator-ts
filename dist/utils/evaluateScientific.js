function evaluateScientific(expression) {
    const regexPatterns = [
        {
            func: "sin",
            regex: /sin\(([^)]+)\)/g,
            evaluator: (val) => Math.sin(degreesToRadians(val)),
        },
        {
            func: "cos",
            regex: /cos\(([^)]+)\)/g,
            evaluator: (val) => Math.cos(degreesToRadians(val)),
        },
        {
            func: "tan",
            regex: /tan\(([^)]+)\)/g,
            evaluator: (val) => Math.tan(degreesToRadians(val)),
        },
        {
            func: "log",
            regex: /log\(([^)]+)\)/g,
            evaluator: (val) => Math.log10(parseFloat(val)),
        },
        {
            func: "sqrt",
            regex: /sqrt\(([^)]+)\)/g,
            evaluator: (val) => Math.sqrt(parseFloat(val)),
        },
    ];
    expression = expression
        .replace(/π/g, String(Math.PI))
        .replace(/e/g, String(Math.E));
    regexPatterns.forEach((pattern) => {
        expression = expression.replace(pattern.regex, (_, p1) => {
            let value = p1.trim();
            return String(pattern.evaluator(value));
        });
    });
    function degreesToRadians(degrees) {
        return (parseFloat(degrees) * Math.PI) / 180;
    }
    return expression;
}
export default evaluateScientific;
