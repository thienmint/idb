import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'

import League from '../static/images/League_of_Legends_logo.png';
import CSGO from '../static/images/csgo.png';
import SSBM from '../static/images/ssbm.jpeg';

class Games extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Games</h1>
                <hr/>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col">
                            <div className="thumbnail">
                                <a href="">
                                    <img className="img-fluid" src={League} alt=""/>
                                </a>
                            </div>
                            <div className="attributes">
                                <div>Name: League of Legends</div>
                                <div>Year published: 2009</div>
                                <div>Company: Riot Games</div>
                                <div>Genre: MOBA</div>
                                <div>Current Champion: SKT T1</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="thumbnail">
                                <a href="">
                                    <img className="img-fluid" src={SSBM} alt=""/>
                                </a>
                            </div>
                            <div className="attributes">
                                <div>Name: SSBM</div>
                                <div>Year published: 2001</div>
                                <div>Company: HAL Laboratory</div>
                                <div>Genre: Fighting Game</div>
                                <div>Current Champion: <a href="">Armada</a></div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="thumbnail">
                                <a href="">
                                    <img className="img-fluid" src={CSGO} alt=""/>
                                </a>
                            </div>
                            <div className="attributes">
                                <div>Name: CSGO</div>
                                <div>Year published: 2012</div>
                                <div>Company: Valve</div>
                                <div>Genre: First person shooter</div>
                                <div>Current Champion: SK Gaming</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Games;
