class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

function scan(expression) {
  let tokens = [new Token("operand", expression.match(/\d+/)[0])];
  let position = tokens[0].value.length;
  while (position < expression.length) {
    let current = expression[position++];

    while (
      position < expression.length &&
      !isNaN(Number(expression[position]))
    ) {
      current += expression[position++];
    }

    tokens.push(new Token("expression", current));
  }
  return tokens;
}

export const calculate = expression => {
  const tokens = scan(expression);
  return tokens.slice(1).reduce((result, token) => {
    const sign = evaluateSign(token.value);
    const operand = +token.value.slice(1);

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
  }, +tokens[0].value);
};

function evaluateSign(expression) {
  if (expression.includes("/")) return "/";
  if (expression.includes("*")) return "*";
  if (expression.includes("-")) return "-";
  return "+";
}
