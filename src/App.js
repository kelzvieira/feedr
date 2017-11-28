import React, { Component } from 'react';
import uuid from 'uuid'
import './css/normalize.css';
import './css/html5bp.css';
import './css/App.css';
import placeholder from './images/purple-placeholder.png';
import Header from './Header';
import Article from './Article';
import PopUp from './PopUp';
import Loader from './Loader';
import ErrorAlert from './ErrorAlert';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLoader: true,
      showError: false,
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
    this.fetchArticles = this.fetchArticles.bind(this);
  }
  // constructor is only really needed if you have functions to bind
  // if there aren't any, you can go directly to setting the initial state
  // even when done directly, you still need to access state through this.state to refence states in components

  getReddit(count) {
    // count * 25 to add pagination params - up by 25 each call starting from 0
    return fetch(`https://www.reddit.com/r/all.json?sort=new&limit=25&count=${count * 25 - 25}`)
    .then(result => result.json())
    .then(reddit => {
      // add error logic here for broken API call
      return reddit.data.children.map(article => { return {
            title: article.data.title,
            url: `https://www.reddit.com${article.data.permalink}`,
            thumbnail: article.data.thumbnail,
            score: article.data.score,
            category: article.data.subreddit,
            articleId: uuid(),
            content: article.selftext,
            // I've included source just to make it visible that sorting is working
            // can remove in final build
            source: 'Reddit',
            timestamp: article.data.created_utc,
        }
      })
    })
  }

  getBuzzFeed(count) {
    return fetch(`https://accesscontrolalloworiginall.herokuapp.com/https://www.buzzfeed.com/api/v2/feeds/index?p=${count}`)
    .then(result => result.json())
    .then(buzzfeed => {
      if (buzzfeed.success !== 1) {
        console.log(buzzfeed)
        this.setState({
        showLoader: false,
        showError: true,
        })
        throw new Error('could not get posts from Buzzfeed')
      } else {
      // need to add a throw error option success = 1
      return buzzfeed.buzzes.map(article => { return {
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
      })
    }
  })
}

  getMashable(count) {
    return fetch(`https://accesscontrolalloworiginall.herokuapp.com/https://mashable.com/api/v1/posts?page=${count}`)
    .then(result => result.json())
    .then(mashable => {
      // this part confuses me because isNaN should work the reverse of the way it is working now :/
        if (isNaN(mashable.collection.total)) {
          console.log(mashable)
          this.setState({
          showLoader: false,
          })
          throw new Error('could not get posts from Mashable')
        } else {
        // add throw error - mashable.collection.total > 0
          return mashable.posts.map(article => { return {
                title: article.title,
                url: article.link,
                thumbnail: article.images.i540x304,
                score: article.shares.total,
                category: article.channel_name,
                articleId: uuid(),
                content: article.content.excerpt,
                source: 'Mashable',
                timestamp: new Date(article.post_date).getTime() /1000,
              }})
          }
      })
  }

  fetchArticles() {
    Promise.all([this.getMashable(this.state.loadCount),this.getBuzzFeed(this.state.loadCount),this.getReddit(this.state.loadCount)])
    .then((response) => {
      const newFeed = [].concat.apply([], response)
      console.log(newFeed)
      this.setState((prevState) => { return {
        articles: newFeed.sort((a,b) => {
          return a.timestamp - b.timestamp
        }).reverse(),
        // this finalises (ie.chronologically sorts) the list of articles for initial display and removes the loader from display
        showLoader: false,
        // this set is up so pagination will work correctly on the API fetch functions when they are called next
        // by increasing the count after each API call (to then use as a pagination param)
        loadCount: prevState.loadCount +1,
      }})
      console.log(this.state.articles)
      })
      .catch(err => console.log('Error,', err))
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
    this.fetchArticles()
  }

  render() {
    return (
      <div>
        <Header onFilter={this.filterSource} onSearch={this.filterSearch} {...this.state}/>
        <Loader showLoader={this.state.showLoader}/>
        <ErrorAlert showError={this.state.showError}/>
        {this.state.articles
          .map(article =>
            <PopUp articles={this.state.articles}
              id={this.state.popUpId}/>
          )}
        <section id="main" className="container">
          {this.state.articles
            .filter(article => article.title.toLowerCase().includes(this.state.filterTitle.toLowerCase()))
            .filter(article => article.source.includes(this.state.filterSource))
            // look at spread operator to pass all of state as an object {...this.state}
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
                timestamp={article.timestamp}
              />
            )
          }
        </section>
      </div>
    );

  }

}

export default App;
