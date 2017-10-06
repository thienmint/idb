import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Home from './pages/home';
import About from "./pages/about";
import Players from "./pages/players";
import Teams from "./pages/teams";
import Games from "./pages/games";
import Tournaments from "./pages/tournaments";

ReactDOM.render(<Tournaments />, document.getElementById('root'));
registerServiceWorker();
