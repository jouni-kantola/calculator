export const calculate = expression => {
  const sign = evaluateSign(expression);
  const numbers = expression.split(sign);

  return numbers.slice(1).reduce((result, number) => {
    return sign === "+"
      ? (result += +number)
      : sign === "*"
      ? (result *= +number)
      : sign === "/"
      ? (result /= +number)
      : (result -= +number);
  }, +numbers[0]);
};

function evaluateSign(expression) {
  if (expression.includes("/")) return "/";
  if (expression.includes("*")) return "*";
  if (expression.includes("-")) return "-";
  return "+";
}
