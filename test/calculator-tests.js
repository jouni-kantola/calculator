import test from "ava";
import { calculate } from "../src/calculator.js";

test("expression evaluated to number", t => {
  t.is(calculate("1"), 1);
});

test("can sum", t => {
  t.is(calculate("1+1"), 2);
});

test("supports multiple addends", t => {
  t.is(calculate("1+1+1+1"), 4);
});

test("can subtract", t => {
  t.is(calculate("2-1"), 1);
});

test("can multiply", t => {
  t.is(calculate("2*5"), 10);
});

test("can divide", t => {
  t.is(calculate("6/2"), 3);
});

test("can mix addition and subtraction", t => {
  t.is(calculate("5+4-2"), 7);
});

test("evaluate multiplication before addition", t => {
  t.is(calculate("100*3+2"), calculate("2+100*3"));
});
