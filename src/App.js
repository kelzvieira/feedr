import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid'
import './css/normalize.css';
import './css/html5bp.css';
import './css/App.css';
import placeholder1 from './images/article_placeholder_1.jpg';
import placeholder2 from './images/article_placeholder_2.jpg';
import Header from './Header.js';
import Article from './Article.js';
import Loader from './Loader.js';
import PopUp from './PopUp.js';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLoader: true,
      articles: [],
      filterSource: '',
      filterTitle: '',
    }

    this.getBuzzdFeed = this.getBuzzFeed.bind(this);
    this.getReddit = this.getReddit.bind(this);
    this.getMashable = this.getMashable.bind(this);
    // this.filterArticles = this.filterArticles.bind(this);
  }
  // constructor is only really needed if you have functions to bind
  // if there aren't any, you can go directly to setting the initial state
  // even when done directly, you still need to access state through this.state to refence states in components

  getReddit(existingArticles) {
    return fetch('https://www.reddit.com/r/all.json?sort=top&limit=20')
    .then(result => result.json())
    .then(reddit => {
      // add error logic to all content feeds for broken API calls
      reddit.data.children.forEach(article => {
          const redditArticle = {
            title: article.data.title,
            URL: `https://www.reddit.com${article.data.permalink}`,
            thumbnail: article.data.thumbnail,
            score: article.data.score,
            category: article.data.subreddit,
            articleId: uuid(),
            content: '',
            source: 'Reddit',
            timestamp: article.data.created,
            }
          return existingArticles.push(redditArticle)
        })
      return existingArticles
    }).catch(err => {console.log('Error: ',err)})
  }

  getBuzzFeed(existingArticles) {
    return fetch('https://accesscontrolalloworiginall.herokuapp.com/https://www.buzzfeed.com/api/v2/feeds/index')
    .then(result => result.json())
    .then(buzzfeed => {
      buzzfeed.big_stories.forEach(article => {
          const buzzfeedArticle = {
            title: article.title,
            URL: `https://www.buzzfeed.com/${article.canonical_path}`,
            thumbnail: article.images.small,
            score: article.impressions,
            category: article.category,
            articleId: uuid(),
            content: '',
            source: 'BuzzFeed',
            timestamp: article.published,
          }
        return existingArticles.push(buzzfeedArticle)
      })
      return existingArticles
    }).catch(err => {console.log('Error: ',err)})
  }

  getMashable(existingArticles) {
    return fetch('https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/api/v1/posts')
    .then(result => result.json())
    .then(mashable => {
      mashable.posts.forEach(article => {
          const mashableArticle = {
            title: article.title,
            URL: article.link,
            thumbnail: article.images.i540x304,
            score: article.shares.total,
            category: article.channel_name,
            articleId: uuid(),
            content: article.content.excerpt,
            source: 'Mashable',
            timestamp: new Date(article.post_date).getTime() /1000,
          }
        return existingArticles.push(mashableArticle)
      })
      return existingArticles
    }).catch(err => {console.log('Error: ',err)})
  }

  /* filterArticles(searchFilter,sourceFilter) {
    this.setState({
      filterSource: sourceFilter,
      filterTitle: searchFilter,
    })
    console.log(this.state.filterSource,this.state.filterTitle)
  } */

  componentDidMount() {
    this.getReddit(this.state.articles)
    .then(articles => this.getBuzzFeed(articles))
    .then(articles => this.getMashable(articles))
    .then(articles => {
      this.setState({
        articles: articles.sort(function(a, b) {
          return a.timestamp - b.timestamp
        }),
        showLoader: false,
      })
    }).catch(err => {console.log('Error: ',err)})
    console.log(this.state.articles)
  }

  render() {
    return (
      <div>
        <Header onFilter={this.filterArticles}/>
        <Loader showLoader={this.state.showLoader}/>
        {/* will need to pass uuid  to popUp */}
        <PopUp />
        <section id="main" className="container">
          {this.state.articles
            .filter(article => article.title.toLowerCase().includes(this.state.filterTitle.toLowerCase()))
            .filter(article => article.source.toLowerCase().includes(this.state.filterSource.toLowerCase()))
            .map(article =>
            <Article title={article.title} category={article.category} image={article.thumbnail} score={article.score} key={article.articleId}/>
          )}

        </section>
      </div>
    );
  }

}

export default App;
