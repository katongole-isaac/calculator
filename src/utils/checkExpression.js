import { controls } from "./controls";

export default function (expr) {
    
  const symbols = /[×÷\+\-\.]$/g;
  if (typeof expr !== "string") return "";

  let output = "";

  if (symbols.test(expr)) return ""; // check if the last character in the expr is a symbol, if true remove it

  for (let i = 0; i < expr.length; i++) {
    switch (expr[i]) {
      case controls[11]: // ×
        output += expr[i].replace(controls[11], "*");
        continue;
      case controls[7]:
        output += expr[i].replace(controls[7], "/");
        continue;
      case controls[2]: //%
        output += expr[i].replace(controls[2], "/100");
        continue;
      default:
        output += expr[i];
        continue;
    }
  }

  return output;
}
