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
        }
    ];

    render() {
      return (
            <div>
                <Navbar/>
                <h1 className="page-title">Players</h1>
                <hr/>
                <div className="container">
                    <div className="row align-items-start">
                        {this.player_data.map((player, index) => (
                             <GridPlayers value={player} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Players;
