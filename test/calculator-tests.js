import { strict as assert } from "node:assert";
import test from "node:test";
import { calculate } from "../src/calculator.js";

test("expression evaluated to number", t => {
  assert.strictEqual(calculate("1"), 1);
});

test("can sum", t => {
  assert.strictEqual(calculate("1+1"), 1 + 1);
});

test("can subtract", t => {
  assert.strictEqual(calculate("2-1"), 2 - 1);
});

test("can multiply", t => {
  assert.strictEqual(calculate("2*5"), 2 * 5);
});

test("can divide", t => {
  assert.strictEqual(calculate("6/2"), 6 / 2);
});

test("can power of", t => {
  assert.strictEqual(calculate("6^2"), Math.pow(6, 2));
});

test("evaluate multiplication and division before addition and subtraction", t => {
  assert.strictEqual(calculate("100*3+2"), 100 * 3 + 2);
  assert.strictEqual(calculate("2+100*3"), 2 + 100 * 3);
  assert.strictEqual(calculate("10-10+100*4/2"), 10 - 10 + (100 * 4) / 2);
  assert.strictEqual(calculate("10-10+100/4*2"), 10 - 10 + (100 / 4) * 2);
});

test("evaluate same precedence operators left to right", t => {
  assert.strictEqual(calculate("1+1+1+1"), 1 + 1 + 1 + 1);
  assert.strictEqual(calculate("5+4-2"), 5 + 4 - 2);
  assert.strictEqual(calculate("3-1+100"), 3 - 1 + 100);
  assert.strictEqual(calculate("100*4/2"), (100 * 4) / 2);
  assert.strictEqual(calculate("100/4*2"), (100 / 4) * 2);
});

test("parens evaluated first", t => {
  assert.strictEqual(calculate("(2+3)*100"), (2 + 3) * 100);
  assert.strictEqual(calculate("11-(2+3)"), 11 - (2 + 3));
  assert.strictEqual(calculate("30/((1+2)*2)"), 30 / ((1 + 2) * 2));
  assert.strictEqual(calculate("1001-100*(2+3)"), 1001 - 100 * (2 + 3));
  assert.strictEqual(calculate("(2+3)*3^2"), (2 + 3) * Math.pow(3, 2));
});
