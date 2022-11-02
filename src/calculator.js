export const calculate = expression => {
  const sign = evaluateSign(expression);
  const numbers = expression.split(sign);

  return numbers.slice(1).reduce((result, number) => {
    switch (sign) {
      case "+":
        return result + +number;
      case "*":
        return result * +number;
      case "/":
        return result / +number;
      default:
        return result - +number;
    }
  }, +numbers[0]);
};

function evaluateSign(expression) {
  if (expression.includes("/")) return "/";
  if (expression.includes("*")) return "*";
  if (expression.includes("-")) return "-";
  return "+";
}
