import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import './carousel.css';

import first from '../../static/images/esports-arena.png';
import second from '../../static/images/carousel-3.jpg';
import third from '../../static/images/esports-trophy.jpg';

class MyCarousel extends Component {
    render() {
        return (
            <Carousel showStatus={false} infiniteLoop={true} autoPlay={true} showThumbs={false}>
                <div>
                    <img className="carousel-img" src={first} alt=""/>
                </div>
                <div>
                    <img className="carousel-img" src={second} alt=""/>
                </div>
                <div>
                    <img className="carousel-img" src={third} alt=""/>
                </div>
            </Carousel>
        );

    }
}

export default MyCarousel;
