import React, { Component } from 'react'
import PropTypes from 'prop-types';
import placeholder from './images/purple-placeholder.png';
import moment from 'moment';
import Article from './Article'

class ArticleRender extends Component {
  constructor(props) {
    super(props)

    this.popUp = this.popUp.bind(this);
    this.setThumbnail = this.setThumbnail.bind(this);
    this.setScore = this.setScore.bind(this)
    this.setDate = this.setDate.bind(this)
    this.cleanFeed = this.cleanFeed.bind(this)
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

  cleanFeed() {
    return this.props
    .filter(article => article.title.toLowerCase().includes(this.props.filterTitle.toLowerCase()))
    .filter(article => article.source.includes(this.props.filterSource))
  }

  render() {
    console.log(this.state)
    return (
      <Article {...this.props}
        clickPopUp={this.popUp}
        />
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

export default ArticleRender
