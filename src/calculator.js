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
    const operator = evaluateSign(token.value);
    const rightOperand = +token.value.slice(1);
    return new Expression(result, rightOperand, operator).evaluate();
  }, +tokens[0].value);
};

class Expression {
  constructor(leftOperand, rightOperand, operator) {
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
    this.operator = operator;
  }

  evaluate() {
    switch (this.operator) {
      case "+":
        return this.leftOperand + this.rightOperand;
      case "*":
        return this.leftOperand * this.rightOperand;
      case "/":
        return this.leftOperand / this.rightOperand;
      default:
        return this.leftOperand - this.rightOperand;
    }
  }
}

function evaluateSign(expression) {
  if (expression.includes("/")) return "/";
  if (expression.includes("*")) return "*";
  if (expression.includes("-")) return "-";
  return "+";
}
