import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Home from './pages/home';
import About from './pages/about';
import Players from './pages/players';
import Teams from './pages/teams';
import Games from './pages/games';
import Tournaments from './pages/tournaments';

import Player from "./components/detail-pages/player";

import { Route, Switch} from 'react-router-dom';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/players' component={Players}/>
            <Route path='players/:id' component={Player}/>
            <Route path='/teams' component={Teams}/>
            <Route path='/games' component={Games}/>
            <Route path='/tournaments' component={Tournaments}/>
        </Switch>
    </main>
)

class App extends Component {
  render() {
    return (
        <div>
            <Main/>
        </div>
    );
  }
}

export default App;
