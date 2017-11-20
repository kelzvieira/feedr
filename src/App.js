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
      sourceFilter: '',
    }

    this.getArticle = this.getArticle.bind(this);
    this.getBuzzdFeed = this.getBuzzFeed.bind(this);
    this.getReddit = this.getReddit.bind(this);
    this.getMashable = this.getMashable.bind(this);
  }
  // constructor is only really needed if you have functions to bind
  // if there aren't any, you can go directly to setting the initial state
  // even when done directly, you still need to access state through this.state to refence states in components

  getArticle() {
    this.setState({
      showLoader: true
    })
    this.getBuzzFeed()
    this.getReddit()
    this.getMashable()
    // I need to rewrite these as promise notation so the loader shows up until it ALL has run
    // otherwise each function will run and then the loader is turned off before the promises are complete
    this.setState({
      showLoader: false
    })
  }

  getReddit() {
    return fetch('https://www.reddit.com/r/all.json?sort=top&limit=20')
    .then(result => result.json())
    .then(reddit => {
      // just testing for chronological order (not planning to include just yet)
      const articlesReddit = reddit.data.children.forEach(article => {
          article.data.source = 'Reddit'
          // have to fix uuid - how do i reference it correctly in code?
          article.data.articleId = uuid
          // need to remap articles to match my preferred format (category, timestamp, etc.)
          const newArticles = this.state.articles
          newArticles.push(article)
          this.setState({
            articles: newArticles
          })
        })
      return reddit.data.children
    }).catch(err => {console.log('Error: ',err)})
  }

  getBuzzFeed() {
    return fetch('https://accesscontrolalloworiginall.herokuapp.com/https://www.buzzfeed.com/api/v2/feeds/index')
    .then(result => result.json())
    .then(buzzfeed => {
      // need to build if statement for catching errors - "success" : 1
      buzzfeed.big_stories.forEach(article => {
        article.source = 'BuzzFeed'
        const newArticles = this.state.articles
        newArticles.push(article)
        this.setState({
          articles: newArticles,
        })
      })
      console.log(buzzfeed.big_stories)
      console.log(this.state.articles)
      /* this.setState({
        // neither is this
        articles: this.state.artciles.push(buzzfeed.big_stories),
      }) */
      return buzzfeed.big_stories
    }).catch(err => {console.log('Error: ',err)})
  }

  getMashable() {
    return fetch('https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/api/v1/posts')
    .then(result => result.json())
    .then(mashable => {
      // need to build if statement for catching errors - "success" : 1
      mashable.posts.forEach(article => {
        article.source = 'Mashable'
        const newArticles = this.state.articles
        newArticles.push(article)
        this.setState({
          articles: newArticles,
        })
      })
      console.log(mashable.posts)
      console.log(this.state.articles)
      /* this.setState({
        // neither is this
        articles: this.state.artciles.push(buzzfeed.big_stories),
      }) */
      return mashable.posts
    }).catch(err => {console.log('Error: ',err)})
  }

  componentDidMount() {
        this.getArticle()
        // do I need to bring the catch for errors back? I need getArticle to return an object form the promises in it
  }

  render() {
    return (
      <div>
        <Header />
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
          {/* this.state.articles.map(article =>
            // need to remap properties of article objects to avoid the '.data' from reddit
            <Article title={article.data.title} category={article.data.subreddit} image={article.data.thumbnail} score={article.data.score}/>
          ) */}

        </section>
      </div>
    );
  }

  // helpful to ensure you're sending all the data correctly to your components
  // if a required prop is missing or the wrong type is sent, React will log this error to the console


}

export default App;
