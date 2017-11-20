import React, { Component } from 'react'
import searchIcon from './images/search.png';

class Header extends Component {
  constructor(props) {
    super(props)

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(searchFilter, sourceFilter) {
    this.props.onFilter(searchFilter,sourceFilter)
  }

  render() {
    return(
      <header>
        <section className="container">
          <a href="#"><h1>Feedr</h1></a>
          <nav>
            <ul>
              <li><a href="#">"News" Source: <span>All</span></a>
                <ul>
                    <li><a href="#" onClick={this.handleFilter('','Reddit')}>Reddit</a></li>
                    <li><a href="#">BuzzFeed</a></li>
                    <li><a href="#">Mashable</a></li>
                </ul>
              </li>
            </ul>
            <section id="search">
              <input type="text" name="name" value="" />
              <a href="#"><img src={searchIcon} alt="" /></a>
            </section>
          </nav>
          <div className="clearfix"></div>
        </section>
      </header>
    );
  }
}

export default Header
