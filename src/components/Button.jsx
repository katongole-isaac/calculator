class Button extends React.Component {
  render() {
    return (
      <>
        <button
          className={`calculator-btn  ${this.props.classes}`}
          onClick={(e) => this.props.handleClick(e, this.props.label)}
        >
          {this.props.children || this.props.label}
        </button>
      </>
    );
  }
}

export default Button;
