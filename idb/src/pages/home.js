import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import MyCarousel from './../components/carousel/carousel';

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

export default Home;
