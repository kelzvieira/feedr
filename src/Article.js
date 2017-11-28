import React, { Component } from 'react'
import PropTypes from 'prop-types';
import placeholder from './images/purple-placeholder.png';
import moment from 'moment';

class Article extends Component {
  constructor(props) {
    super(props)

    this.popUp = this.popUp.bind(this);
    this.setThumbnail = this.setThumbnail.bind(this);
    this.setScore = this.setScore.bind(this)
    this.setDate = this.setDate.bind(this)
  }

  popUp() {
    this.props.onPopUp(this.props.id)
  }

  setScore(score){
    // sets 0 value of null scores - eg. BuzzFeed caches their API / doesn't include some impression numbers for posts
    if(score) {
      return score
    } return 0
  }

  setThumbnail(imageUrl) {
    // sets the default image if an image url is not supplied - eg. Reddit has 'default' if no thumbnail image is set
    if(imageUrl.substring(0,4) === 'http') {
      return imageUrl
    } return placeholder
  }

  setDate(date) {
    return moment.unix(date)
  }

  componentDidMount() {
    
  }

  render() {
    return(
      <article className="article">
        <section className="featuredImage">
          <img src={this.setThumbnail(this.props.image)} alt="" />
        </section>
        <section className="articleContent">
            <a href="#" onClick={() => this.popUp()}><h3>{this.props.title}</h3></a>
            <h6>{this.props.category}&nbsp;&nbsp;&nbsp;<b>source:</b> {this.props.source} &nbsp;&nbsp;&nbsp;<b>posted:</b> {this.setDate(this.props.timestamp).format("ddd, MMM Do YYYY, h:mm:ss a")}</h6>
        </section>
        <section className="impressions">
          {this.setScore(this.props.score)}
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
  id: PropTypes.string.isRequired,
}

export default Article
