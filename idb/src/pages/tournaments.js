import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'

import Dreamhack from '../static/images/dreamhack.png';
import NALCS from '../static/images/league-championships.jpeg';
import TI7 from '../static/images/int7.jpg';
import GridTournaments from "../components/grid-details/tournaments";

class Tournaments extends Component {

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
        let numRows = Math.ceil(this.tournament_data.length / 3);
        let rows = [];
        let cols = [];
        for (let i=0; i< numRows; i++) {
            cols = this.tournament_data.splice(0,3);
            rows.push(
                <div className="row align-items-start">
                    {cols.map((team, index) => (
                        <GridTournaments value={team} key={index}/>
                    ))}
                </div>
            )
        }
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Tournaments</h1>
                <hr/>
                <div className="container">
                    {rows}
                </div>
            </div>
        );
    }
}

export default Tournaments;
