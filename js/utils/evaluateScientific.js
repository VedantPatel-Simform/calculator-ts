function evaluateScientific(expression) {
  const regexPatterns = [
    {
      func: "sin",
      regex: /sin\(([^)]+)\)/,
      evaluator: (val) => Math.sin(degreesToRadians(val)),
    },
    {
      func: "cos",
      regex: /cos\(([^)]+)\)/,
      evaluator: (val) => Math.cos(degreesToRadians(val)),
    },
    {
      func: "tan",
      regex: /tan\(([^)]+)\)/,
      evaluator: (val) => Math.tan(degreesToRadians(val)),
    },
    {
      func: "log",
      regex: /log\(([^)]+)\)/,
      evaluator: (val) => Math.log10(parseFloat(val)),
    },
    {
      func: "sqrt",
      regex: /sqrt\(([^)]+)\)/,
      evaluator: (val) => Math.sqrt(parseFloat(val)),
    },
  ];

  expression = expression.replace(/π/g, Math.PI).replace(/e/g, Math.E);

  regexPatterns.forEach((pattern) => {
    expression = expression.replace(pattern.regex, (match, p1) => {
      let value = p1.trim();
      return pattern.evaluator(value);
    });
  });

  function degreesToRadians(degrees) {
    return (parseFloat(degrees) * Math.PI) / 180;
  }

  return expression;
}

export default evaluateScientific;
