import React, { Component } from 'react'

class Loader extends Component {
  render() {
    if(this.props.showLoader) {
      return(
        <div className="loader"></div>
      );
    } else {
      return null
    }
  }
}

export default Loader
