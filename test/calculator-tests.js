import test from "ava";
import { calculate } from "../src/calculator.js";

test("expression evaluated to number", t => {
  t.is(calculate("1"), 1);
});

test("can sum", t => {
  t.is(calculate("1+1"), 2);
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

test("evaluate multiplication before addition", t => {
  t.is(calculate("100*3+2"), 302);
  t.is(calculate("2+100*3"), 302);
});

test("evaluate same precedence operators left to right", t => {
  t.is(calculate("1+1+1+1"), 4);
  t.is(calculate("5+4-2"), 7);
  t.is(calculate("3-1+100"), 102);
  t.is(calculate("100*4/2"), 200);
  t.is(calculate("100/4*2"), 50);
  t.is(calculate("10-10+100*4/2"), 200);
  t.is(calculate("10-10+100/4*2"), 50);
});

test("parens evaluated first", t => {
  t.is(calculate("(2+3)*100"), 500);
  t.is(calculate("11-(2+3)"), 6);
  t.is(calculate("30/((1+2)*2)"), 5);
  t.is(calculate("1001-100*(2+3)"), 501);
});
