import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'

import Dreamhack from '../static/images/dreamhack.png';
import NALCS from '../static/images/league-championships.jpeg';
import TI7 from '../static/images/int7.jpg';

class Tournaments extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Tournaments</h1>
                <hr/>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col">
                            <div className="thumbnail">
                                <a href="">
                                    <img className="img-fluid" src={Dreamhack} alt=""/>
                                </a>
                            </div>
                            <div className="attributes">
                                <div>Name: DreamHack Summer 2017</div>
                                <div><a href="./csgo"> Game: CSGO</a></div>
                                <div>City: Jönköping</div>
                                <div>Number of Attendees: 8 teams</div>
                                <div>Winner: SK Gaming</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="thumbnail">
                                <a href="">
                                    <img className="img-fluid" src={NALCS} alt=""/>
                                </a>
                            </div>
                            <div className="attributes">
                                <div>Name: NA LCS Summer Split 2017</div>
                                <div><a href=""> Game: League of Legends</a></div>
                                <div>City: San Francisco</div>
                                <div>Number of Attendees: 8 teams</div>
                                <div>Winner: <a href="">Team SoloMid</a></div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="thumbnail">
                                <a href="">
                                    <img className="img-fluid" src={TI7} alt=""/>
                                </a>
                            </div>
                            <div className="attributes">
                                <div>Name: The International 2017</div>
                                <div>Game: Dota 2</div>
                                <div>City: Seattle</div>
                                <div>Number of Attendees: 18</div>
                                <div>Winner: <a href="">Team Liquid</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tournaments;
