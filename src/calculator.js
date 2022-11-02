export const calculate = expression => {
  const sign = evaluateSign(expression);
  const numbers = expression.split(sign);

  return numbers.slice(1).reduce((sum, addend) => {
    return sign === "+"
      ? (sum += +addend)
      : sign === "*"
      ? (sum *= +addend)
      : sign === "/"
      ? (sum /= +addend)
      : (sum -= +addend);
  }, +numbers[0]);
};

function evaluateSign(expression) {
  if (expression.includes("/")) return "/";
  if (expression.includes("*")) return "*";
  if (expression.includes("-")) return "-";
  return "+";
}
