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

    if (!isNaN(Number(current))) {
      let number = current;
      while (
        position < expression.length &&
        !isNaN(Number(expression[position]))
      ) {
        number += expression[position++];
      }
      tokens.push(new Token("operand", Number(number)));
    } else {
      tokens.push(new Token("operator", current));
    }
  }
  return tokens;
}

function parse(infixTokens) {
  let operatorStack = [];
  let postfixOutput = [];

  for (let token of infixTokens) {
    if (token.type === "operand") postfixOutput.push(token);
    else {
      while (
        operatorStack.length &&
        (operatorStack[operatorStack.length - 1].value === "*" ||
          operatorStack[operatorStack.length - 1].value === "/")
      ) {
        postfixOutput.push(operatorStack.pop());
      }

      while (
        operatorStack.length &&
        !(token.value === "*" || token.value === "/")
      ) {
        postfixOutput.push(operatorStack.pop());
      }

      operatorStack.push(token);
    }
  }

  while (operatorStack.length) {
    postfixOutput.push(operatorStack.pop());
  }

  const operands = [];
  while (postfixOutput.length) {
    const term = postfixOutput.shift();
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
