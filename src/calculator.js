export const calculate = expression => {
  const sign = evaluateSign(expression);
  const operands = expression.split(sign);

  return operands.slice(1).reduce((result, operand) => {
    switch (sign) {
      case "+":
        return result + +operand;
      case "*":
        return result * +operand;
      case "/":
        return result / +operand;
      default:
        return result - +operand;
    }
  }, +operands[0]);
};

function evaluateSign(expression) {
  if (expression.includes("/")) return "/";
  if (expression.includes("*")) return "*";
  if (expression.includes("-")) return "-";
  return "+";
}
