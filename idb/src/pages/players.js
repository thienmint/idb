import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'

import Adam from '../static/images/adam.jpg';
import Nikola from '../static/images/niki.jpeg';
import Yilliang from '../static/images/yiliang_peng.jpg';

class Players extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Players</h1>
                <hr/>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col">
                            <div className="thumbnail">
                                <a href="">
                                    <img className="img-fluid" src={Yilliang} alt=""/>
                                </a>
                            </div>
                            <div className="attributes">
                                <div>Tag: Doublelift</div>
                                <div>Real name: Yiliang Peng</div>
                                <div>Game: <a href="">League of Legends</a></div>
                                <div>Team: <a href="">Team SoloMid</a></div>
                                <div>Rank: (Team SoloMid) #1 in North America</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="thumbnail">
                                <a href="">
                                    <img className="img-fluid" src={Adam} alt=""/>
                                </a>
                            </div>
                            <div className="attributes">
                                <div>Tag: Armada</div>
                                <div>Real name: Adam Lindgren</div>
                                <div>Game: <a href="">Super Smash Bros. Melee</a></div>
                                <div>Team: Alliance</div>
                                <div>Rank: #1 Summer 2017 SSBM</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="thumbnail">
                                <a href="">
                                    <img className="img-fluid" src={Nikola} alt=""/>
                                </a>
                            </div>
                            <div className="attributes">
                                <div>Tag: NiKo</div>
                                <div>Real name: Nikola Kovač</div>
                                <div>Game: <a href="">CounterStrike: Global Offensive</a></div>
                                <div>Team: FaZe Clan</div>
                                <div>Rank: N/A</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Players;
