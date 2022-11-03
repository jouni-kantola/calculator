export const calculate = expression => {
  const parts = expression.split(/(?=[\*\-\+\/])/);
  return parts.slice(1).reduce((result, part) => {
    const sign = evaluateSign(part);
    const operand = +part.slice(1);

    switch (sign) {
      case "+":
        return result + operand;
      case "*":
        return result * operand;
      case "/":
        return result / operand;
      default:
        return result - operand;
    }
  }, +parts[0]);
};

function evaluateSign(expression) {
  if (expression.includes("/")) return "/";
  if (expression.includes("*")) return "*";
  if (expression.includes("-")) return "-";
  return "+";
}
