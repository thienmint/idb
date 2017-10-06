import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Home from './pages/home';
import About from "./pages/about";

ReactDOM.render(<About />, document.getElementById('root'));
registerServiceWorker();
