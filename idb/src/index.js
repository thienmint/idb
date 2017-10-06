import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Home from './pages/home';
import About from "./pages/about";
import Players from "./pages/players";

ReactDOM.render(<Players />, document.getElementById('root'));
registerServiceWorker();
