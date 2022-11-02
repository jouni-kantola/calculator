export const calculate = expression => {
  const addends = expression.includes("+")
    ? expression.split("+")
    : expression.split("-");

  return addends.length === 1
    ? +addends[0]
    : addends.slice(1).reduce((sum, addend) => {
        return expression.includes("+") ? (sum += +addend) : (sum -= +addend);
      }, +addends[0]);
};
