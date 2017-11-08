import React, { Component } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
        constructor(props) {
        super(props);
        this.state = {
            query: ' '
    };
            console.log(this.state.query);

    }
        handleChange = (event) => {
            this.setState({
            query: event.target.value,
            });
        };
    handleClick = () => {
    console.log(this.state.query);
    // window.location = '/search/' + this.state.query;
        // console.log(this.state.query);

    // this.context.location.transitionTo('login');
    };

    render()  {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>


                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <Link to='/' className='navbar-brand nav-link'>eSport Guru</Link>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to='/about' className='nav-link'>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/players' className='nav-link'>Players</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/games' className='nav-link'>Games</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/teams' className='nav-link'>Teams</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/tournaments' className='nav-link'>Tournaments</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={this.handleChange}/>
                        <button onClick={() => {this.handleClick()}} className="btn search-button my-2 my-sm-0" type="button">Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}

export default Navbar;
