import { calculate } from "./src/calculator.js";

const expression = process.argv.slice(2).join("");
console.log(calculate(expression));
