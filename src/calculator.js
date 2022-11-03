export const calculate = expression => {
  let parts = [expression.match(/\d+/)[0]];
  let position = parts[0].length;
  while (position < expression.length) {
    let current = expression[position++];

    while (
      position < expression.length &&
      !isNaN(Number(expression[position]))
    ) {
      current += expression[position++];
    }

    parts.push(current);
  }

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
