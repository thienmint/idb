import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Navbar from "./components/navbar";

ReactDOM.render(<Navbar />, document.getElementById('root'));
registerServiceWorker();
