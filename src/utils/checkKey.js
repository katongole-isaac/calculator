import { controls } from "./controls";

const otherKeys = ["Enter", "Backspace", "*", "/"];

//find the pressed key
export default function (key, modifyState, onEquals, onAC, thisArg) {
    // make all non string values strings 
  let keys = controls.map((control) =>
    typeof control === "string" ? control : control.toString()
  );

  if (keys.indexOf(key) === -1) {
    switch (key) {
      case otherKeys[0]:
        onEquals();
        return;
      case otherKeys[1]:
        onAC();
        return;
      case otherKeys[2]: // if key is * replace it with controls[11]
        modifyState(keys[11], thisArg);
        return;
      case otherKeys[3]: // // if key is / replace it with controls[7]
        modifyState(keys[7], thisArg);
        return;
      default:
        break;
    }
  } else modifyState(key, thisArg);
}
