import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Article extends Component {
  render() {
    return(
      <article className="article">
        <section className="featuredImage">
          <img src={this.props.image} alt="" />
        </section>
        <section className="articleContent">
            <a href="#"><h3>{this.props.title}</h3></a>
            <h6>{this.props.category}</h6>
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
  score: PropTypes.number
}

export default Article
