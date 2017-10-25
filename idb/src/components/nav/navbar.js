import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './navbar.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <Link to='/' className='navbar-brand nav-link'>eSport Guru</Link>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">
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
                        <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                        <button className="btn search-button my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}

export default Navbar;
