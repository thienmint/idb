import React, { Component } from 'react';
import Navbar from './../nav/navbar';
import './../../pages/global.css'
import './detail.css'
import axios from 'axios';
import NotFound from './../../static/images/image-not-found.png'
import { Link } from 'react-router-dom';

export default class DetailTournament extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tournament: {},
            found: true,
        };

        let proxyurl = 'https://cors-anywhere.herokuapp.com/';
        let apiurl = 'http://api.esportguru.com/';
        axios.get(proxyurl + apiurl + 'tournaments/' + this.props.match.params.id).then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.tournament = Object.assign({}, response.data);
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
            this.setState({found: false});
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                {this.state.found && this.state.tournament &&
                <div className="row">
                    <div className="card offset-2 col-8">
                        <div className="card-block">
                            <h1 className="col-12">{this.state.tournament.name}</h1>
                            <div className="row align-items-start">
                                <div className="col-10 offset-1">
                                    <div className="detail-image">
                                        <img className="img" src={NotFound} alt={this.state.tournament.name}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Name</div>
                                <div className="col-4 lists detail-columns">{this.state.tournament.name}</div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Slug</div>
                                <div className="col-4 lists detail-columns">{this.state.tournament.slug}</div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Start Date</div>
                                <div className="col-4 lists detail-columns">{this.state.tournament.begin_at}</div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">End Date</div>
                                <div className="col-4 lists detail-columns">{this.state.tournament.end_at}</div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Game</div>
                                <div className="col-4 lists detail-columns">
                                    {this.state.tournament.game ?
                                        <Link to={`/games/${this.state.tournament.game.id}`}>{this.state.tournament.game.name}</Link>:
                                        'None found'}
                                </div>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Teams</div>
                                <div className="col-4 lists detail-columns">
                                    {this.state.tournament.teams !== undefined ?
                                        this.state.tournament.teams.map((team, index) => (
                                            <Link to={`/teams/${team.id}`}>{team.name + ', '}</Link>
                                        )) :
                                        'None found'}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}