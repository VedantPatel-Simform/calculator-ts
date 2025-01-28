import stack from "./stack.js";
import validateExpression from "./validate.js";
import evaluateScientific from "./evaluateScientific.js";
import calculateAns from "./calculateAnswer.js";

export const evaluateExpression = (expr) => {
  const validationError = validateExpression(expr);
  if (validationError) {
    return validationError;
  }
  expr = evaluateScientific(expr);
  const tokens = tokenize(expr);

  return calculateAns(tokens);
};

function tokenize(expr) {
  const regex = /\s*(\d+\.\d+|\d+|[-+*/^()|,]|sin|cos|log|tan|Pi|e)/g;
  return expr.match(regex);
}
