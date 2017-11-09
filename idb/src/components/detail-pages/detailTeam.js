import React, { Component } from 'react';
import Navbar from './../nav/navbar';
import './../../pages/global.css'
import './detail.css'
import axios from 'axios';
import NotFound from './../../static/images/image-not-found.png'
import { Link } from 'react-router-dom';

export default class DetailTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            team: {},
            hasPlayers: false,
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'teams/' + this.props.match.params.id).then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.team = Object.assign({}, response.data);
            if (Object.keys(response.data.current_players).length !== 0) {
                stateCopy.hasPlayers = true;
            }
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                {this.state.team &&
                <div className="row">
                    <div className="card offset-2 col-8">
                        <div className="card-block">
                            <h1 className="col-12">{this.state.team.name}</h1>
                            <div className="row align-items-start">
                                <div className="col-10 offset-1">
                                    <div className="detail-image">
                                        {this.state.team.image_url &&
                                        <img className="img" src={this.state.team.image_url}
                                             alt={this.state.team.name}/>
                                        }
                                        {!this.state.team.image_url &&
                                        <img className="img" src={NotFound} alt={this.state.team.name}/>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Name</div>
                                <div className="col-4 lists detail-columns">{this.state.team.name}</div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Current Game</div>
                                <div className="col-4 lists detail-columns">
                                    {this.state.team.current_game ?
                                    <Link to={'/games/' + this.state.team.current_game.id}>{this.state.team.current_game.name}</Link>:
                                    'None found'}
                                </div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Current Players</div>
                                <div className="col-4 lists detail-columns">
                                    {this.state.hasPlayers ?
                                        this.state.team.current_players.map((player, index) => (
                                            <Link to={'/players/' + player.id} key={index}>{player.tag  + '  '}</Link>
                                        )):
                                        'None found'
                                    }
                                </div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Acronym</div>
                                <div className="col-4 lists detail-columns">{this.state.team.acronym}</div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}