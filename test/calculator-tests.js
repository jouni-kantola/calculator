import test from "ava";
import { calculate } from "../src/calculator.js";

test("expression evaluated to number", t => {
  t.is(calculate("1"), 1);
});

test("can sum", t => {
  t.is(calculate("1+1"), 1 + 1);
});

test("can subtract", t => {
  t.is(calculate("2-1"), 2 - 1);
});

test("can multiply", t => {
  t.is(calculate("2*5"), 2 * 5);
});

test("can divide", t => {
  t.is(calculate("6/2"), 6 / 2);
});

test("can power of", t => {
  t.is(calculate("6^2"), Math.pow(6, 2));
});

test("evaluate multiplication and division before addition and subtraction", t => {
  t.is(calculate("100*3+2"), 100 * 3 + 2);
  t.is(calculate("2+100*3"), 2 + 100 * 3);
  t.is(calculate("10-10+100*4/2"), 10 - 10 + (100 * 4) / 2);
  t.is(calculate("10-10+100/4*2"), 10 - 10 + (100 / 4) * 2);
});

test("evaluate same precedence operators left to right", t => {
  t.is(calculate("1+1+1+1"), 1 + 1 + 1 + 1);
  t.is(calculate("5+4-2"), 5 + 4 - 2);
  t.is(calculate("3-1+100"), 3 - 1 + 100);
  t.is(calculate("100*4/2"), (100 * 4) / 2);
  t.is(calculate("100/4*2"), (100 / 4) * 2);
});

test("parens evaluated first", t => {
  t.is(calculate("(2+3)*100"), (2 + 3) * 100);
  t.is(calculate("11-(2+3)"), 11 - (2 + 3));
  t.is(calculate("30/((1+2)*2)"), 30 / ((1 + 2) * 2));
  t.is(calculate("1001-100*(2+3)"), 1001 - 100 * (2 + 3));
  t.is(calculate("(2+3)*3^2"), (2 + 3) * Math.pow(3, 2));
});
