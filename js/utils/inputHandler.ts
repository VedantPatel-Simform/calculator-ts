import { evaluateExpression } from "../calculator/calculator.js";
import history from "../calculator/history.js";

interface HistoryEntry {
  expression: string;
  ans: number;
}

interface InputHandlerResponse {
  history: HistoryEntry | undefined;
  currentExpression: string;
}

function inputHandler(
  action: string | undefined,
  value: string | undefined | number,
  currentExpression: string,
  myHistory: ReturnType<typeof history>,
  document: Document
): InputHandlerResponse {
  let temp: HistoryEntry | undefined;
  function displayIsEmpty(): boolean {
    return currentExpression === "0";
  }

  // Using a Set for O(1) lookup time complexity
  const scientificOperations = new Set(["sin", "cos", "tan", "log", "sqrt"]);

  function isScientificOperation(value: string): string {
    return scientificOperations.has(value) ? value + "(" : value;
  }

  function deleteFeature(): void {
    // Delete 4 spaces backwards in case of sin( cos( tan( log(
    const condition =
      currentExpression[currentExpression.length - 1] === "(" &&
      isNaN(Number(currentExpression[currentExpression.length - 2]));

    if (condition) {
      currentExpression = currentExpression.slice(0, -4);
      if (currentExpression.length === 0) {
        currentExpression = "0";
      }
    } else if (currentExpression.length > 1) {
      currentExpression = currentExpression.slice(0, -1);
    } else {
      currentExpression = "0";
    }
  }

  function formatAnswer(ans: string): number {
    let finalAnswer: string;

    let temp = ans.replaceAll("\\\\", "");
    finalAnswer = isNaN(Number(temp)) ? ans : temp;

    return Number(finalAnswer);
  }
  if (action === "clear") {
    currentExpression = "0";
  } else if (action === "delete") {
    deleteFeature();
  } else if (action === "equals") {
    try {
      const ans = evaluateExpression(currentExpression);
      const removedMinusExpression = currentExpression.replaceAll("\\\\", " ");

      let finalAnswer = formatAnswer(ans);

      temp = {
        expression: removedMinusExpression,
        ans: finalAnswer,
      };

      if (isNaN(Number(finalAnswer))) {
        currentExpression = String(ans);
      } else {
        currentExpression = `${parseFloat(Number(finalAnswer).toFixed(14))}`;
        myHistory.add(temp);
      }
    } catch (error: any) {
      currentExpression = error.message;
    }
  } else if (value) {
    // If scientific expression, add extra "(" after the expression (e.g., sin(, cos( ...)
    value = isScientificOperation(String(value));
    if (value === "(") {
      value = "(";
    }
    currentExpression = displayIsEmpty() ? value : currentExpression + value;
  }

  return { history: temp, currentExpression };
}

export default inputHandler;
