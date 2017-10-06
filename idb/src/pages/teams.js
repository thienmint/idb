import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'

import SoloMid from '../static/images/soloMid.jpg';
import Fnatic from '../static/images/fnatic-logo-font.png';
import Liquid from '../static/images/team-liquid-logo-B045C2BBCC-seeklogo.com.png';

class Teams extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Teams</h1>
                <hr/>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col">
                            <div className="thumbnail">
                                <a href="">
                                    <img className="img-fluid" src={SoloMid} alt=""/>
                                </a>
                            </div>
                            <div className="attributes">
                                <div>Name: Team SoloMid</div>
                                <div>Games: <a href="">League of Legends</a></div>
                                <div>Roster: Hauntzer, Svenskeren, Bjergsen, <a href="">Doublelift</a>, Biofrost</div>
                                <div>Date founded: 2009</div>
                                <div> Championships: <a href="">NALCS #1 2017</a></div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="thumbnail">
                                <a href="">
                                    <img className="img-fluid" src={Fnatic} alt=""/>
                                </a>
                            </div>
                            <div className="attributes">
                                <div>Name: Fnatic</div>
                                <div>Games: <a href="">League of Legends</a>, <a href="">CS:GO</a></div>
                                <div>Roster: Krimz, JW, flusha, golden, lekr0, jumpy</div>
                                <div>Date founded: 2004</div>
                                <div>Championships: <a href="">#2 Dreamhack summer 2017</a></div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="thumbnail">
                                <a href="">
                                    <img className="img-fluid" src={Liquid} alt=""/>
                                </a>
                            </div>
                            <div className="attributes">
                                <div>Name: Liquid</div>
                                <div>Games: <a href="">League of Legends</a>, <a href="">CS:GO</a></div>
                                <div>Roster: ken, hungrybox, chillindude, crunch, chudat</div>
                                <div>Date founded: 2000</div>
                                <div>Championships: <a href="">The International 2017</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Teams;
