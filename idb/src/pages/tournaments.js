import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import Dreamhack from '../static/images/dreamhack.png';
import NALCS from '../static/images/league-championships.jpeg';
import TI7 from '../static/images/int7.jpg';
import GridTournaments from "../components/grid-details/gridTournaments";

export default class Tournaments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tournaments: [],
        };

        let proxyurl = 'https://cors-anywhere.herokuapp.com/';
        let apiurl = 'http://api.esportguru.com/';
        axios.get(proxyurl + apiurl + 'tournaments').then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.tournaments = stateCopy.tournaments.slice();
            stateCopy.tournaments = Object.assign({}, response.data);
            this.setState(stateCopy);
            console.log(this.state.tournaments);
        }).catch(function (error) {
            console.log(error);
        });
    }

    tournament_data = [
        {
            id: 1,
            image_url: Dreamhack,
            name: 'DreamHack Summer 2017',
            game: 'CSGO',
            city: 'Jönköping',
            teams: ['SKGaming', 'Fnatic', 'Immortals', 'Counter Logic', 'mousesports',
                'Gambit Esports', 'Team Singularity', 'Cloud9'],
            winner: ['SKGaming']
        },
        {
            id: 2,
            image_url: NALCS,
            name: 'NA LCS Summer Split 2017',
            game: 'League of Legends',
            city: 'San Fransisco',
            teams: ['Cloud 9', 'Counter Logic Gaming', 'Echo Fox', 'FlyQuest eSports',
                'Immortals', 'Phoenix1', 'Team Dignitas', 'Team EnVyUs', 'Team Liquid'],
            winner: ['Team SoloMid']
        },
        {
            id: 3,
            image_url: TI7,
            name: 'DreamHack Summer 2017',
            game: 'CSGO',
            city: 'Jönköping',
            teams: ['SKGaming', 'Fnatic', 'Immortals', 'Counter Logic', 'mousesports',
                'Gambit Esports', 'Team Singularity', 'Cloud9'],
            winner: ['SKGaming']
        },
        {
            id: 4,
            image_url: NALCS,
            name: 'DreamHack Summer 2017',
            game: 'CSGO',
            city: 'Jönköping',
            teams: ['SKGaming', 'Fnatic', 'Immortals', 'Counter Logic', 'mousesports',
                'Gambit Esports', 'Team Singularity', 'Cloud9'],
            winner: ['SKGaming']
        }
    ];

    render() {
        let numRows = Math.ceil(Object.keys(this.state.tournaments).length / 3);
        let tournaments = Object.values(this.state.tournaments);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = tournaments.splice(0,3);
            grid.push(row);
        }
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Tournaments</h1>
                <hr/>
                <div className="container">
                    {grid.map((item, index) => (
                        <TournamentRow values={item} key={index}/>
                    ))}
                </div>
            </div>
        );
    }
}

class TournamentRow extends Component {
    render() {
        let row = this.props.values;
        let tournaments = [];
        tournaments.push(
            row.map((tournament, index) => (
                React.createElement(GridTournaments, {value: tournament})
            ))
        );
        return (
            <div className="row align-items-start">
                {tournaments}
            </div>
        );
    }
}
