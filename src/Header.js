import React, { Component } from 'react'
import searchIcon from './images/search.png';

class Header extends Component {
  constructor(props) {
    super(props)

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(search, source) {
    this.props.onFilter(search,source)
  }

  handleAtivateSearch() {
    document.getElementById('search').input.className = 'active'
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
              <input type="text" name="name" value="" />
              <a href="#" onClick={this.handleActivateSearch}><img src={searchIcon} alt="" /></a>
            </section>
          </nav>
          <div className="clearfix"></div>
        </section>
      </header>
    );
  }
}

export default Header
