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
import XML from './sitemap.xml'

import { Route, Switch } from 'react-router-dom';
import DetailGame from "./components/detail-pages/detailGame";
import DetailTeam from "./components/detail-pages/detailTeam";
import DetailPlayer from "./components/detail-pages/detailPlayer";
import DetailTournament from "./components/detail-pages/detailTournaments";

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/players' component={Players}/>
            <Route exact path='/xml' component={XML}/>

            <Route path='/players/:id' component={DetailPlayer}/>
            <Route exact path='/teams' component={Teams}/>
            <Route path='/teams/:id' component={DetailTeam}/>
            <Route exact path='/games' component={Games}/>
            <Route path='/games/:id' component={DetailGame}/>
            <Route exact path='/tournaments' component={Tournaments}/>
            <Route path='/tournaments/:id' component={DetailTournament}/>
            <Route path='*' exact={true} component={Page404}/>
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
