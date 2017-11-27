import React, { Component } from 'react';
import uuid from 'uuid'
import './css/normalize.css';
import './css/html5bp.css';
import './css/App.css';
import placeholder from './images/purple-placeholder.png';
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
      // reserving this for 'paginated' API calls on user scroll
      loadCount: 1,
    }

    this.getBuzzdFeed = this.getBuzzFeed.bind(this);
    this.getReddit = this.getReddit.bind(this);
    this.getMashable = this.getMashable.bind(this);
    this.launchPopUp = this.launchPopUp.bind(this);
    this.filterSource = this.filterSource.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
  }
  // constructor is only really needed if you have functions to bind
  // if there aren't any, you can go directly to setting the initial state
  // even when done directly, you still need to access state through this.state to refence states in components

  getReddit(existingArticles, count) {
    // need to add pagination params - 'after' from the api payload plus count - up by 20s each call
    const numArticles = count * 25 - 25
    return fetch(`https://www.reddit.com/r/all.json?sort=new&limit=25&count=${numArticles}`)
    .then(result => result.json())
    .then(reddit => {
      // add error logic to all content feeds for broken API calls
      const redditAfter = reddit.data.after
      reddit.data.children.forEach(article => {
          const redditArticle = {
            title: article.data.title,
            url: `https://www.reddit.com${article.data.permalink}`,
            thumbnail: article.data.thumbnail,
            score: article.data.score,
            category: article.data.subreddit,
            articleId: uuid(),
            content: article.selftext,
            // I've included these just to make it visible that sorting is working
            // can remove in final build (but I kind of like them)
            source: 'Reddit',
            timestamp: article.data.created_utc,
            }
          return existingArticles.push(redditArticle)
        })
      return existingArticles
    }).catch(err => {console.log('Error: ',err)})
  }

  getBuzzFeed(existingArticles, count) {
    return fetch(`https://accesscontrolalloworiginall.herokuapp.com/https://www.buzzfeed.com/api/v2/feeds/index?p=${count}`)
    .then(result => result.json())
    .then(buzzfeed => {
      // need to add a throw error option success = 1
      buzzfeed.buzzes.forEach(article => {
          const buzzfeedArticle = {
            title: article.title,
            url: `https://www.buzzfeed.com${article.canonical_path}`,
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

  getMashable(existingArticles, count) {
    return fetch(`https://accesscontrolalloworiginall.herokuapp.com/https://mashable.com/api/v1/posts?page=${count}`)
    .then(result => result.json())
    .then(mashable => {
      // this part confuses me because isNaN should work the reverse of the way it is working :/
        if (isNaN(mashable.collection.total)) {
          console.log(mashable)
          this.setState({
          showLoader: false,
          })
          throw new Error('could not get posts from Mashable')
        } else {
      // add throw error - mashable.collection.total > 0
      mashable.posts.forEach(article => {
          const mashableArticle = {
            title: article.title,
            url: article.link,
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
    }})
  }

  filterSource(sourceFilter) {
    this.setState({
      filterSource: sourceFilter,
    })
  }

  filterSearch(titleFilter){
    this.setState({
        filterTitle: titleFilter
    })
  }

  launchPopUp(id) {
    this.setState({
      popUpId: id,
    })
    document.getElementById('popup').style.display = ''
  }

  componentDidMount() {
    // not neccessary to pass in existing this.state.articles as it would be an empty array on componentDidMount
    // but this way it's scaleable for when calling the next set of articles when a user scrolls all the way down
    // this exact code can be made into another function and then called here later on
    // then it can be called here rather than keeping the code here
    this.getReddit(this.state.articles, this.state.loadCount)
    // this runs getReddit, returns the reddit articles and passes them as arguments to the next function
    // but only once the API call has resolved (it's a promise), ensuring there's no mutliple state setting
    .then(articles => this.getBuzzFeed(articles, this.state.loadCount))
    .then(articles => this.getMashable(articles, this.state.loadCount))
    // replace .then notation with promise.all() + change loadCount functionality to use prevState function information
    .then(articles => {
      this.setState({
        articles: articles.sort(function(a, b) {
          return a.timestamp - b.timestamp
        }).reverse(),
        // this finalises (ie.chronologically sorts) the list of articles for initial display and removes the loader from display
        showLoader: false,
        // this set is up so pagination will work correctly on the API fetch functions when they are called next
        // by increasing the count after each API call (to then use as a pagination param)
        loadCount: this.state.loadCount +1,
      })
    }).catch(err => console.log('Error,', err))
    // just to check what data is coming in, log the full set of articles to the console
    console.log(this.state.articles)
  }

  render() {om
    return (
      <div>
        <Header onFilter={this.filterSource} onSearch={this.filterSearch} {...this.state}/>
        <Loader showLoader={this.state.showLoader}/>
        {this.state.articles
          .map(article =>
            <PopUp articles={this.state.articles}
              id={this.state.popUpId}/>
          )}
        <section id="main" className="container">
          {this.state.articles
            .filter(article => article.title.toLowerCase().includes(this.state.filterTitle.toLowerCase()))
            .filter(article => article.source.includes(this.state.filterSource))
            // look at spread operator to pass state as an object {...this.state}
            .map(article =>
            <Article
              title={article.title}
              category={article.category}
              image={article.thumbnail}
              score={article.score}
              source={article.source}
              id={article.articleId}
              onPopUp={this.launchPopUp}
              onFilter={this.filterArticles}
              key={article.articleId}
            />
          )
          // use componentDidMount with the length of the articles array - 20 to start fetching the next set of articles when there's only
        }
        </section>
        {/* ADD BUTTON TO LOAD MORE ARTICLES */}
      </div>
    );
  }

}

export default App;
