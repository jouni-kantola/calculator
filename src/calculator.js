export const calculate = expression => {
  const sign = expression.includes("+") ? "+" : "-";
  const numbers = expression.split(sign);

  return numbers.slice(1).reduce((sum, addend) => {
    return sign === "+" ? (sum += +addend) : (sum -= +addend);
  }, +numbers[0]);
};
