import { findByLabelText } from '@testing-library/react';
import React, { Component } from 'react';

class EnterArea extends Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }
  
  addEnterAreaStyles = () => {
    return {
      display: 'flex',
      justifyContent: 'space-between',
    }
  }
  
  submitMessage = event => {
    event.preventDefault();
    if (!this.inputField.current.value) return;
    this.props.sendMessage(this.inputField.current.value)
    this.inputField.current.value = "";
   }

   render() {
    return <div className="EnterArea w-100">
      <form style={this.addEnterAreaStyles()} onSubmit={this.submitMessage}>
        <input ref={this.inputField} style={{flexGrow: 1}} className="m-1" type="text"></input>
        <input type="submit" value="Send" className="btn btn-primary m-1" />
      </form>
    </div>
  }
}

export default EnterArea;