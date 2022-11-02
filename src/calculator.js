export const calculate = expression => {
  const numbers = expression.includes("+")
    ? expression.split("+")
    : expression.split("-");

  return numbers.length === 1
    ? +numbers[0]
    : numbers.slice(1).reduce((sum, addend) => {
        return expression.includes("+") ? (sum += +addend) : (sum -= +addend);
      }, +numbers[0]);
};
