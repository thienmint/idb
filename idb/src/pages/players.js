import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'

import Adam from '../static/images/adam.jpg';
import Nikola from '../static/images/niki.jpeg';
import Yilliang from '../static/images/yiliang_peng.jpg';
import GridPlayers from "../components/grid-details/players";


class Players extends Component {
    player_data = [
        {
            id: 1,
            name: 'Yiliang Peng',
            first_name: 'Yiliang',
            last_name: 'Peng',
            tag: 'Doublelift',
            role: 'abc',
            hometown: 'Austin',
            image_url: Yilliang,
            current_team: 'SoloMid',
            current_videogame: 'League of Legends'
        },
        {
            id: 2,
            name: 'Adam Lindgren',
            first_name: 'Adam',
            last_name: 'Lindgren',
            tag: 'Armada',
            role: 'def',
            hometown: 'Austin',
            image_url: Adam,
            current_team: 'Alliance',
            current_videogame: 'Super Smash Bros. Melee'
        },
        {
            id: 3,
            name: 'Nikola Kovač',
            first_name: 'Nikola',
            last_name: 'Kovač',
            tag: 'NiKo',
            role: 'ghi',
            hometown: 'Austin',
            image_url: Nikola,
            current_team: 'FaZe Clan',
            current_videogame: 'CounterStrike: Global Offensive'
        },
        {
            id: 4,
            name: 'Nikola Kovač',
            first_name: 'Nikola',
            last_name: 'Kovač',
            tag: 'NiKo',
            role: 'ghi',
            hometown: 'Austin',
            image_url: Nikola,
            current_team: 'FaZe Clan',
            current_videogame: 'CounterStrike: Global Offensive'
        }
    ];

    render() {
        let numRows = Math.ceil(this.player_data.length / 3);
        let rows = [];
        let cols = [];
        for (let i=0; i< numRows; i++) {
            cols = this.player_data.splice(0,3);
            rows.push(
                <div className="row align-items-start">
                    {cols.map((player, index) => (
                        <GridPlayers value={player} key={index}/>
                    ))}
                </div>
            )
        }
      return (
            <div>
                <Navbar/>
                <h1 className="page-title">Players</h1>
                <hr/>
                <div className="container">
                    {rows}
                </div>
            </div>
        );
    }
}

export default Players;
