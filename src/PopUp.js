import React, { Component } from 'react'

class PopUp extends Component {
  constructor(props) {
    super(props)

    this.closePopUp = this.closePopUp.bind(this);
    this.setDescription = this.setDescription.bind(this);
  }

  closePopUp() {
    document.getElementById('popup').style.display = 'none'
  }

  setDescription(content) {
    // sets a default if no description is included - eg. Reddit posts that are links or media-only
    if(content) {
      return content
    } return 'This article doesn\'t have a preview. Click through to read the whole thing.'
  }

  render() {
    return(
      <div className="popUp" id="popup" style={{display: "none"}}>
        <a href="#" className="closePopUp" onClick={() => this.closePopUp()}>X</a>
          {this.props.articles
            .filter(article => article.articleId.includes(this.props.id))
            .map(article =>
              <div className="container">
                <h1>{article.title}</h1>
                <p>
                  {this.setDescription(article.content)}
                </p>
                <a href={article.url} className="popUpAction" target="_blank">Read more from source</a>
              </div>
            )}
      </div>
    );
  }
}

export default PopUp
