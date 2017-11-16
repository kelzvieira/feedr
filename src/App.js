import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/normalize.css';
import './css/html5bp.css';
import './css/App.css';
import placeholder1 from './images/article_placeholder_1.jpg';
import placeholder2 from './images/article_placeholder_2.jpg';
import Header from './Header.js';
import Article from './Article.js';
import Loader from './Loader.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLoader: false,
      articles: [],
    }

    this.getArticle = this.getArticle.bind(this)
  }
  // constructor is only really needed if you have functions to bind
  // if there aren't any, you can go directly to setting the initial state
  // even when done directly, you still need to access state through this.state to refence states in components

  getArticle() {
    this.setState({
      showLoader: true
    })
    return fetch('https://www.reddit.com/r/all.json?sort=top&limit=20')
    .then(result => result.json())
    .then(data => {
      console.log(data.data.children)
      this.setState({
        articles: data.data.children
      })
      console.log(this.state.articles)
      this.setState({
        showLoader: false
      })
      return data.data.children
    }).catch(err => {console.log('Error: ',err)})
  }

  componentDidMount() {
    // need to work out how to get the city from input into componentDidMount
        this.getArticle()
            .catch(err => console.log('Error,', err))
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
          {this.state.articles.map(article =>
            <Article title={article.data.title} category={article.data.subreddit} image={article.data.thumbnail} score={article.data.score}/>
          )}

        </section>
      </div>
    );
  }

  // helpful to ensure you're sending all the data correctly to your components
  // if a required prop is missing or the wrong type is sent, React will log this error to the console


}

export default App;
