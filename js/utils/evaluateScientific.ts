function evaluateScientific(expression: string): string {
  const regexPatterns = [
    {
      func: "sin",
      regex: /sin\(([^)]+)\)/g,
      evaluator: (val: string) => Math.sin(degreesToRadians(val)),
    },
    {
      func: "cos",
      regex: /cos\(([^)]+)\)/g,
      evaluator: (val: string) => Math.cos(degreesToRadians(val)),
    },
    {
      func: "tan",
      regex: /tan\(([^)]+)\)/g,
      evaluator: (val: string) => Math.tan(degreesToRadians(val)),
    },
    {
      func: "log",
      regex: /log\(([^)]+)\)/g,
      evaluator: (val: string) => Math.log10(parseFloat(val)),
    },
    {
      func: "sqrt",
      regex: /sqrt\(([^)]+)\)/g,
      evaluator: (val: string) => Math.sqrt(parseFloat(val)),
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

  function degreesToRadians(degrees: string): number {
    return (parseFloat(degrees) * Math.PI) / 180;
  }

  return expression;
}

export default evaluateScientific;
