import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Navbar from "./components/nav/navbar";
import MyCarousel from "./components/carousel/carousel";

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <MyCarousel/>
            </div>

        );
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
