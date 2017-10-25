import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Home from './pages/home';
import About from './pages/about';
import Players from './pages/players';
import Page404 from './pages/404page';
import Teams from './pages/teams';
import Games from './pages/games';
import Tournaments from './pages/tournaments';

import Player from "./components/detail-pages/player";

import { Route, Switch} from 'react-router-dom';
import DetailGame from "./components/detail-pages/detailGame";

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/players' component={Players}/>
            <Route path='players/:id' component={Player}/>
            <Route path='/404page' component={Page404}/>
            <Route exact path='/teams' component={Teams}/>
            <Route exact path='/games' component={Games}/>
            <Route path='/games/:id' component={DetailGame}/>
            <Route exactmpath='/tournaments' component={Tournaments}/>
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
