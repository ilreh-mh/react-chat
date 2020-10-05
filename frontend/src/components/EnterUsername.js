import React, { Component } from 'react';

class EnterUsername extends Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.props.setUsername(this.inputField.current.value)) {
      this.props.sendUsername(this.inputField.current.value);
    }
  }

  formStyles = () => {
    return {
      alignSelf: 'center',
      marginTop: 20
    }
  }

  render() {
    return <form className="EnterUsername" style={this.formStyles()} onSubmit={this.handleSubmit}>
      <p style={{textAlign: 'center'}}>Please enter your username:</p>
      <input type="text" className="p-2 m-1" ref={this.inputField} placeholder="Username" />
      <input type="submit" className="btn btn-primary m-1" value="set username" />
    </form>
  }
}

export default EnterUsername;