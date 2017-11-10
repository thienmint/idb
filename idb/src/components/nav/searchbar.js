import React, { Component } from 'react';
import './navbar.css';
class Search extends Component {
	   handleClick = () => {
    // console.log(this.state.query+ ' ok ');

        window.location = '/search/' ;
        <SearchPage value={["Search", this.state.query]}/>

        // console.log(this.state.query);

    // this.context.location.transitionTo('login');
    };
    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={this.handleChange}/>
                        <button onClick={() => {this.handleClick()}} className="btn search-button my-2 my-sm-0" type="button">Search</button>

                    </form>
}
export default Search;
