import test from "ava";
import { calculate } from "../src/calculator.js";

test("expression evaluated to number", t => {
  t.is(1, calculate("1"));
});

test("can sum", t => {
  t.is(2, calculate("1+1"));
});

test("supports multiple addends", t => {
  t.is(4, calculate("1+1+1+1"));
});

test("can subtract", t => {
  t.is(1, calculate("2-1"));
});

test("can multiply", t => {
  t.is(10, calculate("2*5"));
});

test("can divide", t => {
  t.is(3, calculate("6/2"));
});

test("can mix addition and subtraction", t => {
  t.is(7, calculate("5+4-2"));
});

test("evaluate multiplication before addition", t => {
  t.is(calculate("100*3+2"), calculate("2+100*3"));
});
