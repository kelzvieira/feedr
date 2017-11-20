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
      showLoader: false,
      articles: [],
      // reserving this for the 'filter by source' functionality
      filterSource: '',
      filterTitle: '',
    }

    this.getBuzzdFeed = this.getBuzzFeed.bind(this);
    this.getReddit = this.getReddit.bind(this);
    this.getMashable = this.getMashable.bind(this);
    this.filterArticles = this.filterArticles.bind(this);
  }
  // constructor is only really needed if you have functions to bind
  // if there aren't any, you can go directly to setting the initial state
  // even when done directly, you still need to access state through this.state to refence states in components

  getReddit() {
    return fetch('https://www.reddit.com/r/all.json?sort=top&limit=20')
    .then(result => result.json())
    .then(reddit => {
      return reddit.data.children.forEach(article => {
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
          const newArticles = this.state.articles
          newArticles.push(redditArticle)
          this.setState({
            articles: newArticles
          })
        })
    }).catch(err => {console.log('Error: ',err)})
  }

  getBuzzFeed() {
    return fetch('https://accesscontrolalloworiginall.herokuapp.com/https://www.buzzfeed.com/api/v2/feeds/index')
    .then(result => result.json())
    .then(buzzfeed => {
      return buzzfeed.big_stories.forEach(article => {
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
          // need to remap articles to match my preferred format (category, timestamp, etc.)
          const newArticles = this.state.articles
          newArticles.push(buzzfeedArticle)
          this.setState({
            articles: newArticles
          })
        })
    }).catch(err => {console.log('Error: ',err)})
  }

  getMashable() {
    return fetch('https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/api/v1/posts')
    .then(result => result.json())
    .then(mashable => {
      return mashable.posts.forEach(article => {
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
          // need to remap articles to match my preferred format (category, timestamp, etc.)
          const newArticles = this.state.articles
          newArticles.push(mashableArticle)
          // MOVE SET STATE OUT OF LOOP!
          this.setState({
            articles: newArticles
          })
        })
    }).catch(err => {console.log('Error: ',err)})
  }

  filterArticles(searchFilter,sourceFilter) {
    /* this.setState({
      filterSource: sourceFilter,
      filterTitle: searchFilter,
    }) */
    console.log(this.state.filterSource,this.state.filterTitle)
  }

  componentDidMount() {
    this.getBuzzFeed()
    .then(this.getReddit())
    .then(this.getMashable())
    // I need to rewrite these as promise notation so the loader shows up until it ALL has run
    // otherwise each function will run and then the loader is turned off before the promises are complete
    .then(
      this.setState({
        articles: this.state.articles.sort(function(a, b) {
          return a.timestamp - b.timestamp
        })
      })
    )
    console.log(this.state.articles)
        // do I need to bring the catch for errors back? I need getArticle to return an object form the promises in it
  }

  render() {
    return (
      <div>
        <Header onFilter={this.filterArticles}/>
        <Loader showLoader={this.state.showLoader}/>
        {/* in react, just return 'null' to not display it */}
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
        <section id="main" className="container">
          {this.state.articles.map(article =>
            <Article title={article.title} category={article.category} image={article.thumbnail} score={article.score} key={article.articleId}/>
          )}

        </section>
      </div>
    );
  }

}

export default App;
