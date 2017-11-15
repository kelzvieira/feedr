import React, { Component } from 'react'
import placeholder1 from './images/article_placeholder_1.jpg';
import placeholder2 from './images/article_placeholder_2.jpg';

class Article extends Component {
  render() {
    return(
      <article className="article">
        <section className="featuredImage">
          <img src={placeholder1} alt="" />
        </section>
        <section className="articleContent">
            <a href="#"><h3>Test article title</h3></a>
            <h6>Lifestyle</h6>
        </section>
        <section className="impressions">
          526
        </section>
        <div className="clearfix"></div>
      </article>
    );
  }
}

export default Article
