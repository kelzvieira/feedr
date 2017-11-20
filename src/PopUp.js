import React, { Component } from 'react'

class PopUp extends Component {
  constructor(props) {
    super(props)

    this.togglePopUp = this.togglePopUp.bind(this);
  }

togglePopUp(id) {
  if (id === "") {
    return ""
  } else {
    return "block"
  }
}

  render() {
    return(
      // add onlcick event to article where uuid is passed to show that article's content
      <div className="popUp" style={{display: this.togglePopUp(this.props.id)}}>
        <a href="#" className="closePopUp">X</a>
        <div className="container">
          <h1>{this.props.articles.filter(article => article.articleId === this.props.id).title}</h1>
          <p>
            Article description/content here.
          </p>
          <a href="#" className="popUpAction" target="_blank">Read more from source</a>
        </div>
      </div>
    );
  }
}

export default PopUp
