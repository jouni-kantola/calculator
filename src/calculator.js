class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

function scan(expression) {
  let tokens = [];
  let position = 0;
  let lastToken = null;
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
    } else if (current === "(") {
      tokens.push(new Token("left_paren", current));
    } else if (current === ")") {
      tokens.push(new Token("right_paren", current));
    } else if (
      current === "+" &&
      (position === 1 ||
        expression[position - 2] === "(" ||
        (lastToken && lastToken.type !== "operand"))
    ) {
      tokens.push(new Token("unary_operator", current));
    } else if (
      current === "-" &&
      (position === 1 ||
        expression[position - 2] === "(" ||
        (lastToken && lastToken.type !== "operand"))
    ) {
      tokens.push(new Token("unary_operator", current));
    } else {
      tokens.push(new Token("operator", current));
    }
    lastToken = tokens[tokens.length - 1];
  }
  return tokens;
}

function parse(infixTokens) {
  let operatorStack = [];
  let postfixOutput = [];

  for (let token of infixTokens) {
    if (token.type === "operand") postfixOutput.push(token);
    else if (token.type === "left_paren") operatorStack.push(token);
    else if (token.type === "right_paren") {
      let operator = operatorStack.pop();
      while (operatorStack.length && operator.type !== "left_paren") {
        postfixOutput.push(operator);
        operator = operatorStack.pop();
      }
    } else if (token.type === "unary_operator") {
      operatorStack.push(token);
    } else {
      const precedenceOrder = {
        "^": { precedence: 4, associativity: "right" },
        "*": { precedence: 3, associativity: "left" },
        "/": { precedence: 3, associativity: "left" },
        "+": { precedence: 2, associativity: "left" },
        "-": { precedence: 2, associativity: "left" },
      };

      const o1 = precedenceOrder[token.value];

      for (let index = operatorStack.length - 1; index > -1; index--) {
        const operator = operatorStack[index];
        if (operator.type === "left_paren") break;

        const o2 = precedenceOrder[operator.value];
        if (
          o2.precedence > o1.precedence ||
          (o2.precedence === o1.precedence && o1.associativity === "left")
        ) {
          postfixOutput.push(operatorStack.pop());
        }
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
    else if (term.type === "unary_operator") {
      const operand = operands.pop();
      const operator = term.value;
      if (operator === "+") {
        operands.push(operand);
      } else {
        operands.push(-operand);
      }
    } else {
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
      case "^":
        return this.leftOperand ** this.rightOperand;
      default:
        return this.leftOperand - this.rightOperand;
    }
  }
}
