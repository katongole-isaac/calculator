class DisplayScreen extends React.Component {
  render() {
    return (
      <>
        <div
          className="bg-light w-100 display-screen border  rounded text-right d-flex justify-content-end
          flex-column 
          
        "
        >
          <div className="answer-section align-self-end w-100  p-1 ">
            <span className="text-muted ">
              {`${this.props.answer}` && `${this.props.recentExpression} =`}
            </span>
          </div>
          <div className=" w-100 number-section align-self-end  p-1">
            <span> {this.props.answer || this.props.expression} </span>
          </div>
        </div>
      </>
    );
  }
}

export default DisplayScreen;
