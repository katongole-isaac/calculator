const brackets = ["(", ")"];

/**
 * validates the order of parenthese in a string
 * @param {*} type string
 * @returns boolean otherwise `throws an error`
 */
export const checkParenthese = (str) => {
  if (typeof str !== "string") return false;

  //check if both of the brackets dont exists
  if (str.indexOf(brackets[0]) === -1 && str.indexOf(brackets[1]) === -1)
    return true;

  // check if the open brackets exists.
  // if (
  //   (str.indexOf(brackets[0]) === -1 && str.indexOf(brackets[1]) !== -1) ||
  //   str.indexOf(brackets[1]) === -1 &&
  //   str.indexOf(brackets[0]) !== -1
  // )
  //   if (str[0] === brackets[1] || str[str.length - 1] === brackets[0])
  // throw new Error(
  //   `Syntax error: ${str[str.length - 1]} at index ${[str.length - 1]}`
  // );

  //check if ) is at index 0  or ( is a last index throw otherwise skip
  // throw new Error(`Error ==> index ${[str.length - 1]}`);

  //Here we now check for validity
  let stack = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === brackets[0]) {
      stack.push(str[i]);
      continue;
    }

    if (str[i] === brackets[1]) {
      //if we are trying to pop an empty stack []
      if (!stack.length) return false;
      // throw new Error(`Error : not in order ${i}`);

      stack.pop(str[i]);

      //if the stack is not empty and i is on the last iteration then throw otherwise skip
      // if (stack.length !== 0 && i === str.length - 1) return false;

      // throw new Error(
      //   `Syntax Error : stack is not empty i.e stack length = [${stack.length}]`
      // );

      continue;
    }
  }

  return true;
};

// const brackets = ["(", ")"];

// /**
//  * validates the order of parenthese in a string
//  * @param {*} type string
//  * @returns boolean otherwise `throws an error`
//  */
// const checkSyntax = (str) => {
//   if (typeof str !== "string") return false;

//   //check if both of the brackets dont exists
//   if (str.indexOf(brackets[0]) === -1 && str.indexOf(brackets[1]) === -1)
//     return true;

//   // check if one of the brackets exists.
//   if (
//     (str.indexOf(brackets[0]) === -1 && str.indexOf(brackets[1]) !== -1) ||
//     (str.indexOf(brackets[1]) === -1 && str.indexOf(brackets[0]) !== -1)
//   )
//     throw new Error(
//       `Syntax error: ${str[str.length - 1]} at index ${[str.length - 1]}`
//     );

//   //check if ) is at index 0  or ( is a last index throw otherwise skip
//   if (str[0] === brackets[1] || str[str.length - 1] === brackets[0])
//     throw new Error(`Error ==> index ${[str.length - 1]}`);

//   //Here we now check for validity
//   let stack = [];

//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === brackets[0]) {
//       stack.push(str[i]);
//       continue;
//     }

//     if (str[i] === brackets[1]) {
//       //if we are trying to pop an empty stack []
//       if (!stack.length) throw new Error(`Error : not in order ${i}`);

//       stack.pop(str[i]);

//       //if the stack is not empty and i is on the last iteration then throw otherwise skip
//       if (stack.length !== 0 && i === str.length - 1)
//         throw new Error(
//           `Syntax Error : stack is not empty i.e stack length = [${stack.length}]`
//         );

//       continue;
//     }
//   }

//   return true;
// };
