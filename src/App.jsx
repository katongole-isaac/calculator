import "./app.css";
import DisplayScreen from "./components/DisplayScreen";
import Note from "./components/Note";
import UserControls from "./components/UserControls";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: "0",
      answer: "",
      recentExpression: "",
      error: false,
    };
    this.setState = this.setState.bind(this);
  }

  render() {
    return (
      <>
        <div className="container-fluid vh-100 mw-100 p-1 d-flex align-items-center position-relative justify-content-center flex-column app">
          <div className="header text-white ">
            <h3>Calculator </h3>
          </div>
          <div className="main m-auto rounded ">
            <DisplayScreen
              expression={this.state.expression}
              answer={this.state.answer}
              recentExpression={this.state.recentExpression}
            />
            <UserControls
              setState={this.setState}
              answer={this.state.answer}
              expression={this.state.expression}
            />
          </div>
        </div>
      </>
    );
  }
}
