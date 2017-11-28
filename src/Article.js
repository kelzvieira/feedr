import React, { Component } from 'react'
import PropTypes from 'prop-types';
import placeholder from './images/purple-placeholder.png';
import moment from 'moment';

function Article(props) {
    return Object.keys(props.articles).map(key =>
      <article className="article">
        <section className="featuredImage">
          <img src={props.articles[key].thumbnail} alt={props.articles[key].source} />
        </section>
        <section className="articleContent">
            <a href="#" ><h3>{props.articles[key].title}</h3></a>
            <h6>{props.articles[key].category}&nbsp;&nbsp;&nbsp;
              <b>source:</b> {props.articles[key].source} &nbsp;&nbsp;&nbsp;
              <b>posted:</b> {props.articles[key].timestamp}
            </h6>
        </section>
        <section className="impressions">
          {props.articles[key].score}
        </section>
        <div className="clearfix"></div>
      </article>

      // .filter(article => article.title.toLowerCase().includes(this.props.filterTitle.toLowerCase()))
      // .filter(article => article.source.includes(this.props.filterSource))

  )
}

/*


  render() {
    return (
      <div>
          {this.props.articles
            .filter(article => article.title.toLowerCase().includes(this.props.filterTitle.toLowerCase()))
            .filter(article => article.source.includes(this.props.filterSource))
            // look at spread operator to pass all of state as an object {...this.state}
            .map(article =>
              <article className="article">
                <section className="featuredImage">
                  <img src={this.setThumbnail(article.image)} alt={article.source} />
                </section>
                <section className="articleContent">
                    <a href="#" onClick={() => this.popUp()}><h3>{article.title}</h3></a>
                    <h6>{this.props.category}&nbsp;&nbsp;&nbsp;<b>source:</b> {article.source} &nbsp;&nbsp;&nbsp;<b>posted:</b> {this.setDate(this.props.timestamp).format("ddd, MMM Do YYYY, h:mm:ss a")}</h6>
                </section>
                <section className="impressions">
                  {this.setScore(article.score)}
                </section>
                <div className="clearfix"></div>
              </article>
            )
          }
          {console.log(this.props)}
        </div>
    );
  }
}

Article.PropTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string,
  score: PropTypes.number,
  id: PropTypes.string.isRequired,
} */

export default Article
