import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'


class Players extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="row">
                    <div className="card offset-2 col-8" style="margin-top: 15px;">
                        <div className="card-block">
                            <h1 className="col-12" style="text-align: center;">Adam Lindgren</h1>
                            <div className="row align-items-start">
                                <div className="col-10 offset-1">
                                    <div className="detail-image" style="text-align: center;">
                                        <img className="img" style="max-height: 25vh" src={this.props.imgage_url} alt={this.props.name}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style="text-align: center">
                                <div className="col-4 offset-2 labels lists">Tag</div>
                                <div className="col-4 lists detail-columns">Armada</div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Real Name</div>
                                <div className="col-4 lists detail-columns">Adam Lindgren</div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Game</div>
                                <div className="col-4 lists detail-columns"><a href="./ssbm">Super Smash Bros. Melee</a></div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Team</div>
                                <div className="col-4 lists detail-columns">Alliance</div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Rank</div>
                                <div className="col-4 lists detail-columns">#1 Summer 2017 SSBM</div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Championships</div>
                                <div className="col-4 lists detail-columns"><a href="./dreamhack">1st place DreamHack Summer 2017</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Players;
