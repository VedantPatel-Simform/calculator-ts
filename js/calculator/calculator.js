import validateExpression from "../utils/validate.js";
import evaluateScientific from "../utils/evaluateScientific.js";
import calculateAns from "./calculateAnswer.js";

export const evaluateExpression = (expr) => {
  const validationError = validateExpression(expr);
  if (validationError !== null) {
    return validationError;
  }

  expr = evaluateScientific(expr);
  console.log(expr);
  const tokens = tokenize(expr);
  console.log(tokens);
  return calculateAns(tokens);
};

function tokenize(expr) {
  const regex =
    /\\-\d+\.\d+|\\-\d+|\d+\.\d+|\d+|[-+*/^()|,]|sin|cos|log|tan|Pi|e/g;
  return expr
    .match(regex)
    .map((token) =>
      token.startsWith("\\-") ? token.replace("\\", "") : token
    );
}
