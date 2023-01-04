import Button from "./Button";
import groupItems from "../utils/groupItems";
import { controls } from "../utils/controls";
import checkKey from "../utils/checkKey";
import checkExpression from "../utils/checkExpression";
import { checkParenthese } from "../../checkParenthese";

const ZERO = "0";
const ErrorMsg = "Error";
const SYMBOLS = /[÷×\+\-]/; // %
const makeAnswerNextExprSymbols = /[÷×\+\-\(%]/;

class UserControls extends React.Component {
  modifyState = (label, thisArg) => {
    const onlyZeroRegExp = /^0+$/g;
    const signRegExp = /^[%+÷\-\+.]$/;
    const repeatedSymbol = /^.*(××|\+\+|\-\-|÷÷|\.\.).*$/g; //%%
    const percentFollowedByNum = /^.*(%\d|%\.).*$/g;
    const percentFollowedBySymbol =
      /([÷×\+\-](?=%|\))|\((?=[÷×\+\-.%])|\((?=\)))/g;

    const closingBracketFollowedByNum =
      /(\)(?=\d)|\d(?=\()|\.(?=\()|\)(?=\()|\)(?=\.)|%(?=\())/;

    const findTwoPointWithNumbersPattern =
      /(\.{2,}\d+?|\d+\.{2,}\d+?|\d+\.{2,}?|\.{2,}?|(\d+\.{1}\d+\.{1})+?)/g;

    // if answer && if label is in symbols ,
    // make the answer an expression
    if (this.props.answer && makeAnswerNextExprSymbols.test(label))
      this.makeAnswerNextExpr();
    else if (this.props.answer) this.reset();
    // you can start another computation everwhen u have got an anwser for the previous computation.

    return thisArg.props.setState((prev) => {
      let testPattern = prev.expression + label;

      // if the label is either "(" or ")" run checkParenthese
      if (label === controls[0] || label === controls[1])
        if (!checkParenthese(testPattern)) return;

      //dont accept the closing bracket to start the expression.
      if (
        prev.expression === ZERO &&
        testPattern[testPattern.length - 1] === controls[1]
      )
        return;

      if (
        closingBracketFollowedByNum.test(testPattern) &&
        prev.expression !== ZERO
      )
        //if closing bracket followed by a num  add x in between e.g 3*(3)*2
        label = `${controls[11]}${label}`;

      //dont allow a number with more than one decimal point e.g  2.3.5 such as pattern are not permitted
      if (findTwoPointWithNumbersPattern.test(testPattern)) return;

      // dont allow symbols to follow each other e.g +- x+ etc
      if (
        SYMBOLS.test(testPattern[testPattern.length - 1]) &&
        SYMBOLS.test(testPattern[testPattern.length - 2])
      )
        return;

      //dont allow the symbol to be followed by  percent(%) e.g  1+%, 34*% OR ()
      if (percentFollowedBySymbol.test(testPattern)) return;

      // if the % symbol is followed by a num , add x e.g 3% x 4
      if (percentFollowedByNum.test(testPattern))
        label = `${controls[11]}${label}`;

      // dont allow repeated symbol e.g ++ --
      if (repeatedSymbol.test(testPattern)) return;

      //if the second char in expression is a symbol dont remove the leading '0' otherwise remove it

      // testPattern[1] === controls[11] means if the char in the first index is x , in other words if(x===x) do nothing

      if (testPattern[1] === controls[11]) {
      } else if (
        onlyZeroRegExp.test(parseInt(prev.expression)) &&
        !signRegExp.test(testPattern[1])
      )
        prev.expression = "";

      return {
        ...prev,
        expression: `${prev.expression}${label}`,
      };
    });
  };

  reset = (thisArg) => {
    this.props.setState({
      answer: "",
      expression: ZERO,
    });
  };

  makeAnswerNextExpr = () =>
    this.props.setState((prev) => {
      // if prev.answer = "Error" , reset the expression back to "0"
      let checkIfAnswerHasNoNum = /^[a-zA-Z]+$/;
      return {
        expression: checkIfAnswerHasNoNum.test(prev.answer)
          ? ZERO
          : prev.answer,
        answer: "",
      };
    });

  //when you click '=' or press 'Enter Key'
  onEquals = () => {
    if (
      this.props.expression.length > 0 &&
      this.props.expression !== ZERO &&
      checkExpression(this.props.expression)
    )
      this.props.setState((prev) => {
        //if we get an error in the computation return "Error" otherwise compute the expression.
        if (this.compute(this.props.expression) instanceof Error)
          return {
            ...prev,
            answer: ErrorMsg,
            recentExpression: prev.expression,
            expression: ZERO,
          };

        return {
          ...prev,
          answer: this.compute(this.props.expression),
          recentExpression: prev.expression,
          expression: ZERO,
        };
      });
  };

  //clear the screen
  onAC = () => {
    if (this.props.answer) return this.reset();
    this.props.setState((prev) => {
      return {
        ...prev,
        expression:
          prev.expression.length > 0 &&
          prev.expression !== ZERO &&
          prev.expression.slice(0, -1) !== ""
            ? prev.expression.slice(0, -1)
            : ZERO,
      };
    });
  };

  handleClick = (e, label) => {
    switch (label) {
      case controls[3]: // 'AC'
        this.onAC();
        return;
      case controls[18]: // '='
        this.onEquals();
        return;

      default:
        this.modifyState(label, this);
        return;
    }
  };

  handleKeyDown = (e) => {
    e.preventDefault();
    checkKey(e.key, this.modifyState, this.onEquals, this.onAC, this);
    console.log(e);
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  compute = (expression) => {
    try {
      return eval(checkExpression(expression));
    } catch (error) {
      return error;
    }
  };

  render() {
    return (
      <>
        <div className="w-100 p-1 user-controls">
          {groupItems(controls).map((controlArray) => {
            return (
              <div
                key={controlArray.toString()}
                className=" w-100  d-flex gap-2 p-1 "
              >
                {controlArray.map((label) => (
                  <Button
                    handleClick={this.handleClick}
                    handleKeyDown={this.handleKeyDown}
                    key={label}
                    label={label}
                    classes={label === controls[18] ? "equals" : ""}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default UserControls;
