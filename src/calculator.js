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

function parse(tokens) {
  let stack = [];
  let queue = [];

  for (let token of tokens) {
    if (token.type === "operand") queue.push(token);
    else {
      while (
        stack.length &&
        (stack[stack.length - 1].value === "*" ||
          stack[stack.length - 1].value === "/")
      ) {
        queue.push(stack.pop());
      }

      stack.push(token);
    }
  }

  while (stack.length) {
    queue.push(stack.pop());
  }

  const operands = [];
  while (queue.length) {
    const term = queue.shift();
    if (term.type === "operand") operands.push(term.value);
    else {
      const rightOperand = operands.pop();
      const leftOperand = operands.pop();
      const operator = term.value;

      operands.push(
        new Expression(leftOperand, rightOperand, operator).evaluate()
      );
    }
  }

  return operands.pop();
}

export const calculate = expression => {
  const tokens = scan(expression);

  return parse(tokens);
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
