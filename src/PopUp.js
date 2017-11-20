import React, { Component } from 'react'
import PropTypes from 'prop-types';

class PopUp extends Component {
  render() {
    return(
      // add onlcick event to article where uuid is passed to show that article's content
      <div className="popUp" style={{display: "none"}}>
        <a href="#" className="closePopUp">X</a>
        <div className="container">
          <h1>Article title here</h1>
          <p>
            Article description/content here.
          </p>
          <a href="#" className="popUpAction" target="_blank">Read more from source</a>
        </div>
      </div>
    );
  }
}

PopUp.PropTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string,
  score: PropTypes.number
}

export default PopUp
