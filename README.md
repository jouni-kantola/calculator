# Calculator

Parse and evaluate arithmetic expression string.

## Usage

Pass in infix expression.

```sh
node index "10^2+(5+5)*2"
# => 120
```

## Test

```
npm test
```

## Internals

Infix expression string is tokenized and then converted to [postfix](https://en.wikipedia.org/wiki/Reverse_Polish_notation) with [shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm) before evaluated.
