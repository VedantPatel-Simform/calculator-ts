import validateExpression from "../utils/validate.js";
import evaluateScientific from "../utils/evaluateScientific.js";
import calculateAns from "./calculateAnswer.js";

export const evaluateExpression = (expr: string) => {
  const validationError = validateExpression(expr);
  if (validationError !== null) {
    return validationError;
  }

  expr = evaluateScientific(expr);
  const tokens = tokenize(expr);
  return calculateAns(tokens);
};

function tokenize(expr: string): string[] {
  const regex =
    /\\-\d+\.\d+|\\-\d+|\d+\.\d+|\d+|[-+*/^()|,]|sin|cos|log|tan|Pi|e/g;
  const arr = expr.match(regex);
  let res: string[] = [];
  if (arr) {
    res = arr.map((token) =>
      token.startsWith("\\-") ? token.replace("\\", "") : token
    );
  }
  return res;
}
