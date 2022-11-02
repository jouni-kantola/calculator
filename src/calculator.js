export const calculate = expression => {
  const sign = expression.includes("+") ? "+" : "-";
  const numbers = expression.split(sign);

  return numbers.length === 1
    ? +numbers[0]
    : numbers.slice(1).reduce((sum, addend) => {
        return sign === "+" ? (sum += +addend) : (sum -= +addend);
      }, +numbers[0]);
};
