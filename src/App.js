import React, { Component } from 'react';
import uuid from 'uuid'
import './css/normalize.css';
import './css/html5bp.css';
import './css/App.css';
import placeholder1 from './images/article_placeholder_1.jpg';
import Header from './Header.js';
import Article from './Article.js';
import PopUp from './PopUp.js';
import Loader from './Loader.js';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLoader: true,
      articles: [],
      filterSource: '',
      filterTitle: '',
      popUpId: '',
    }

    this.getBuzzdFeed = this.getBuzzFeed.bind(this);
    this.getReddit = this.getReddit.bind(this);
    this.getMashable = this.getMashable.bind(this);
    this.launchPopUp = this.launchPopUp.bind(this);
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
            content: article.selftext,
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
            content: article.description,
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

  launchPopUp(id) {
    this.setState({
      popUpId: id,
    })
  }

  componentDidMount() {
    // not neccessary to pass in existing this.state.articles as it would be an empty array on componentDidMount
    // but this way it's scaleable for when calling the next set of articles when a user scrolls all the way down
    // this exact code can be made into another function and then called here later on
    this.getReddit(this.state.articles)
    // this runs getReddit, returns the rreddit articles and passes them as arguments to the next function
    // but only once the API call has resolved, ensuring there's no mutliple state setting
    .then(articles => this.getBuzzFeed(articles))
    .then(articles => this.getMashable(articles))
    .then(articles => {
      this.setState({
        articles: articles.sort(function(a, b) {
          return a.timestamp - b.timestamp
        }),
        // this finalises the list of articles and removes the loader from display
        showLoader: false,
      })
    }).catch(err => {console.log('Error: ',err)})
    // just to check what data is s=coming in, log the full set of articles to the console
    console.log(this.state.articles)
  }

  render() {
    return (
      <div>
        <Header onFilter={this.filterArticles}/>
        <Loader showLoader={this.state.showLoader}/>
        {/* this.state.articles
          .filter(article => article.articleId.includes(this.state.popUpId))
          .map(article =>
            <PopUp articles={this.state.articles} id={this.state.popUpId}/>
          ) */}
        <section id="main" className="container">
          {this.state.articles
            .filter(article => article.title.toLowerCase().includes(this.state.filterTitle.toLowerCase()))
            .filter(article => article.source.toLowerCase().includes(this.state.filterSource.toLowerCase()))
            .map(article =>
            <Article title={article.title} category={article.category} image={article.thumbnail} score={article.score} key={article.articleId} onPopUp={this.launchPopUp}/>
          )}
        </section>
      </div>
    );
  }

}

export default App;
