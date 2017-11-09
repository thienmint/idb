import React, { Component } from 'react';
import Navbar from './../nav/navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './../../pages/global.css'
import './detail.css'

import NotFound from './../../static/images/image-not-found.png'

export default class DetailPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: {}
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'players/' + this.props.match.params.id).then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.player = Object.assign({}, response.data);
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    render() {
        return (
            <div>
                <Navbar/>
                {this.state.player &&
                <div className="row">
                    <div className="card offset-2 col-8">
                        <div className="card-block">
                            <h1 className="col-12">{this.state.player.tag}</h1>
                            <div className="row align-items-start">
                                <div className="col-10 offset-1">
                                    <div className="detail-image">
                                        {this.state.player.image_url &&
                                        <img className="img" src={this.state.player.image_url}
                                             alt={this.state.player.name}/>
                                        }
                                        {!this.state.player.image_url &&
                                        <img className="img" src={NotFound} alt={this.state.player.tag}/>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Tag</div>
                                <div className="col-4 lists detail-columns">
                                    {this.state.player.tag ? this.state.player.tag : 'None found'}
                                    </div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Real Name</div>
                                <div className="col-4 lists detail-columns">
                                    {this.state.player.first_name || this.state.player.last_name ?
                                        this.state.player.first_name + ' ' + this.state.player.last_name :
                                        'None found'
                                    }
                                    </div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Hometown</div>
                                <div className="col-4 lists detail-columns">
                                    {this.state.player.hometown ? this.state.player.hometown : 'None found'}
                                    </div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Game</div>
                                <div className="col-4 lists detail-columns">
                                    {this.state.player.current_game ?
                                        <Link to={`/games/${this.state.player.current_game.id}`}>{this.state.player.current_game.name}</Link>:
                                        'None found'}
                                </div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Team</div>
                                <div className="col-4 lists detail-columns">
                                    {this.state.player.current_team ?
                                        <Link to={`/teams/${this.state.player.current_team.id}`}>{this.state.player.current_team.name}</Link>:
                                        'None found'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}
