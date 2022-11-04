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
    return evaluate(result, token.value);
  }, +tokens[0].value);
};

function evaluate(leftOperand, expression) {
  const operator = evaluateSign(expression);
  const rightOperand = +expression.slice(1);

  switch (operator) {
    case "+":
      return leftOperand + rightOperand;
    case "*":
      return leftOperand * rightOperand;
    case "/":
      return leftOperand / rightOperand;
    default:
      return leftOperand - rightOperand;
  }
}

function evaluateSign(expression) {
  if (expression.includes("/")) return "/";
  if (expression.includes("*")) return "*";
  if (expression.includes("-")) return "-";
  return "+";
}
