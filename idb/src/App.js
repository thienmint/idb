import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded" styles={{height: '5%'}}>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="./">eSport Guru</a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                      <a className="nav-link" href="./about">About</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="./players">Players</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="./games">Games</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="./teams">Teams</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="./tournaments">Tournaments</a>
                  </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                  <input class="form-control mr-sm-2" type="text" placeholder="Search"/>
                      <button class="btn search-button my-2 my-sm-0" type="submit">Search</button>
              </form>
          </div>
      </nav>
    );
  }
}

export default App;
