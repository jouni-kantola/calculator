class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

function scan(expression) {
  let tokens = [];
  let position = 0;
  while (position < expression.length) {
    let current = expression[position++];

    while (
      position < expression.length &&
      !isNaN(Number(expression[position]))
    ) {
      current += expression[position++];
    }

    tokens.push(new Token("operand", Number(current)));

    if (position < expression.length) {
      current = expression[position++];
      tokens.push(new Token("operator", current));
    }
  }
  return tokens;
}

export const calculate = (expression) => {
  const tokens = scan(expression);

  let result = tokens[0].value;

  for (let i = 1; i < tokens.length; i = i + 2) {
    result = new Expression(
      result,
      tokens[i + 1].value,
      tokens[i].value
    ).evaluate();
  }

  return result;
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
