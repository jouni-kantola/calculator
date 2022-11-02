import test from "ava";
import { calculate } from "../src/calculator.js";

test("expression evaulated to number", t => {
  t.is(1, calculate("1"));
});
