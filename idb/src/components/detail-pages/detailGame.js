import React, { Component } from 'react';
import Navbar from './../nav/navbar';
import './../../pages/global.css'
import './detail.css'
import axios from 'axios';
import NotFound from './../../static/images/image-not-found.png'
import { Link } from 'react-router-dom';

export default class DetailGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            game: {}
        };

        let proxyurl = 'https://cors-anywhere.herokuapp.com/';
        let apiurl = 'http://api.esportguru.com/';
        axios.get(proxyurl + apiurl + 'games/' + this.props.match.params.id).then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.game = Object.assign({}, response.data);
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                {this.state.game &&
                <div className="row">
                    <div className="card offset-2 col-8">
                        <div className="card-block">
                            <h1 className="col-12">{this.state.game.name}</h1>
                            <div className="row align-items-start">
                                <div className="col-10 offset-1">
                                    <div className="detail-image">
                                        {this.state.game.screenshots &&
                                        <img className="img" src={this.state.game.screenshots[0]}
                                             alt={this.state.game.name}/>
                                        }
                                        {!this.state.game.screenshots &&
                                        <img className="img" src={NotFound} alt={this.state.game.name}/>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Name</div>
                                <div className="col-4 lists detail-columns">{this.state.game.name}</div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Summary</div>
                                <div className="col-4 lists detail-columns">{this.state.game.summary}</div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Release Date</div>
                                <div className="col-4 lists detail-columns">{this.state.game.release_date}</div>
                            </div>
                            {this.state.game.website &&
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Websites</div>
                                    <div className="col-4 lists detail-columns">
                                        {this.state.game.website.map((site, index) => (
                                            <div><a href={site}>{site}</a></div>
                                        ))}
                                    </div>
                            </div>
                            }
                            {this.state.game.sample_players &&
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Players</div>
                                <div className="col-4 lists detail-columns">
                                    {this.state.game.sample_players.map((player, index) => (
                                        <div><Link to={`/players/${player.id}`}>{player.tag}</Link></div>
                                    ))}
                                </div>
                            </div>
                            }
                            {this.state.game.sample_teams &&
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Teams</div>
                                <div className="col-4 lists detail-columns">
                                    {this.state.game.sample_teams.map((team, index) => (
                                        <div><Link to={`/teams/${team.id}`}>{team.name}</Link></div>
                                    ))}
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}