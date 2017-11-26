import React, { Component } from 'react'
import searchIcon from './images/search.png';

class Header extends Component {
  constructor(props) {
    super(props)

    this.handleFilter = this.handleFilter.bind(this);
    this.handleActivateSearch = this.handleActivateSearch.bind(this)
  }

  handleFilter(search, source) {
    this.props.onFilter(search,source)
  }

  handleActivateSearch(currentClass) {
    if (currentClass === '') {
      document.getElementById('search').className = 'active'
    } else {
    console.log(document.getElementById('search').childNodes[0].value)
    document.getElementById('search').className = ''
    console.log(document.getElementById('search').className)
    }
  }

  render() {
    return(
      <header>
        <section className="container">
          <a href="#" onClick={() => this.handleFilter('','')}><h1>Feedr</h1></a>
          <nav>
            <ul>
              <li><a href="#" onClick={() => this.handleFilter('','')}>"News" Source: <span>All</span></a>
                <ul>
                    <li><a id='source-reddit' href="#" onClick={() => this.handleFilter('','Reddit')}>Reddit</a></li>
                    <li><a id='source-buzzfeed' href="#" onClick={() => this.handleFilter('','BuzzFeed')}>BuzzFeed</a></li>
                    <li><a id='source-mashable' href="#" onClick={() => this.handleFilter('','Mashable')}>Mashable</a></li>
                </ul>
              </li>
            </ul>
            <section id="search">
              <input type="text" name="name" value="" onKeyPress={() => this.handleFilter('',this.props.filterSource)}/>
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
