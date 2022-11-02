export const calculate = expression => {
  const addends = expression.split("+");

  return addends.length === 1
    ? +addends[0]
    : addends.reduce((sum, addend) => (sum += +addend), 0);
};
