import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Article extends Component {

  constructor(props) {
    super(props)

    this.popUp = this.popUp.bind(this);
  }

  popUp() {
    this.props.onPopUp(this.props.key)
  }

  render() {
    return(
      <article className="article">
        <section className="featuredImage">
          <img src={this.props.image} alt="" />
        </section>
        <section className="articleContent">
            <a href="#" id="article-title" onClick={() => this.popUp()}><h3>{this.props.title}</h3></a>
            <h6>{this.props.category}&nbsp;&nbsp;&nbsp;<b>source: {this.props.source}</b></h6>
        </section>
        <section className="impressions">
          {this.props.score}
        </section>
        <div className="clearfix"></div>
      </article>
    );
  }
}

Article.PropTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string,
  score: PropTypes.number,
  key: PropTypes.string.isRequired,
}

export default Article
