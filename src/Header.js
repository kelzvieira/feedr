import React, { Component } from 'react'
import searchIcon from './images/search.png';

class Header extends Component {
  constructor(props) {
    super(props)

    this.handleFilter = this.handleFilter.bind(this);
    this.handleActivateSearch = this.handleActivateSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleFilter(source) {
    this.props.onFilter(source)
  }

  handleActivateSearch(currentClass) {
    if (currentClass === '') {
      document.getElementById('search').className = 'active'
    } else {
    document.getElementById('search').className = ''
    // need to make it so that clicking the search bar resets search (and state)
    // document.getElementById('search').innerHTML.input.value = ''
    }
  }

  handleKeyPress(key){
    this.props.onSearch(key)
    console.log(key)
  }

  render() {
    return(
      <header>
        <section className="container">
          <a href="#" onClick={() => this.handleFilter('')}><h1>Feedr</h1></a>
          <nav>
            <ul>
              <li><a href="#" onClick={() => this.handleFilter('')}>"News" Source: <span>All</span></a>
                <ul>
                    <li><a id='source-reddit' href="#" onClick={() => this.handleFilter('Reddit')}>Reddit</a></li>
                    <li><a id='source-buzzfeed' href="#" onClick={() => this.handleFilter('BuzzFeed')}>BuzzFeed</a></li>
                    <li><a id='source-mashable' href="#" onClick={() => this.handleFilter('Mashable')}>Mashable</a></li>
                </ul>
              </li>
            </ul>
            <section id="search">
              <input type="text" name="name" value={this.props.filterTitle} onChange={(event) => this.handleKeyPress(event.target.value)}/>
              <a href="#" onClick={() => this.handleActivateSearch(document.getElementById('search').className)}><img src={searchIcon} alt="" /></a>
            </section>
          </nav>
          <div className="clearfix"></div>
        </section>
      </header>
    );
  }
}

export default Header
