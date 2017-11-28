import React, { Component } from 'react'

class ErrorAlert extends Component {
  render() {
    if(this.props.showError) {
      return(
        <div className="error">
          <div className="error-message">{this.props.errorMessage}</div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default ErrorAlert
