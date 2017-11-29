import React, { Component } from 'react'

class ErrorAlert extends Component {
  render() {
    if(this.props.showError) {
      console.log(this.props.errorMessage)
      return(
        <div className="error">
          <div className="error-message">{this.props.errorMessage.toString()}</div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default ErrorAlert
