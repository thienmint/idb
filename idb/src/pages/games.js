import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'

import League from '../static/images/League_of_Legends_logo.png';
import CSGO from '../static/images/csgo.png';
import SSBM from '../static/images/ssbm.jpeg';
import GridGames from "../components/grid-details/games";

class Games extends Component {

    game_data = [
        {
            id: 1,
            image_url: League,
            name: 'League of Legends',
            year: '2009',
            company: 'Riot Games',
            genre: 'MOBA',
            champion: 'SKT T1',
            teams: ['Cloud9', 'SoloMid', 'Liquid', 'Fnatic'],
            tournaments: ['LCS Europe', 'LCS North America', 'IEM World Championships']
        },
        {
            id: 2,
            image_url: CSGO,
            name: 'Counter-Strike: Global Offensive',
            year: '2012',
            company: 'Valve',
            genre: 'First person shooter',
            champion: 'SK Gaming',
            teams: ['Cloud9', 'Fnatic', 'Liquid'],
            tournaments: ['Dreamhack', 'Intel Extreme Masters']
        },
        {
            id: 3,
            image_url: SSBM,
            name: 'Super Smash Bros. Melee',
            year: '2001',
            company: 'HAL Laboratory',
            genre: 'Fighting Game',
            champion: 'Armada',
            teams: ['Alliance', 'Liquid', 'SoloMid', 'Cloud9'],
            tournaments: ['Apex', 'DreamHack', 'Genesis']
        },
        {
            id: 4,
            image_url: CSGO,
            name: 'League of Legends',
            year: '2012',
            company: 'HAL Laboratory',
            genre: 'MOBA',
            champion: 'Armada',
            teams: ['Cloud9', 'SoloMid', 'Liquid', 'Fnatic'],
            tournaments: ['Apex', 'DreamHack', 'Genesis']
        }
    ];

    render() {
        let numRows = Math.ceil(this.game_data.length / 3);
        let rows = [];
        let cols = [];
        for (let i=0; i< numRows; i++) {
            cols = this.game_data.splice(0,3);
            rows.push(
                <div className="row align-items-start">
                    {cols.map((team, index) => (
                        <GridGames value={team} key={index}/>
                    ))}
                </div>
            )
        }

        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Games</h1>
                <hr/>
                <div className="container">
                    {rows}
                </div>
            </div>
        );
    }
}

export default Games;
