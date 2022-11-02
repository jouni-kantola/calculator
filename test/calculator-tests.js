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
