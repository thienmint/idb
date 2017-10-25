import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import Adam from '../static/images/adam.jpg';
import Nikola from '../static/images/niki.jpeg';
import Yilliang from '../static/images/yiliang_peng.jpg';
import GridPlayers from "../components/grid-details/players";


export default class Players extends Component {

    componentWillMount() {
        this.getData();
    }

    constructor(props) {
        super(props);
        this.state = {
            players: [],
        };
    }

    getData() {
        let proxyurl = 'https://cors-anywhere.herokuapp.com/';
        let apiurl = 'http://api.esportguru.com/';
        axios.get(proxyurl + apiurl + 'players').then((response) => {

            let stateCopy = Object.assign({}, this.state);
            stateCopy.players = stateCopy.players.slice();
            stateCopy.players = Object.assign({}, response.data);
            this.setState(stateCopy);
            this.setState(this.state);
        }).catch(function (error) {
            console.log(error);
        });
    }

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
        let numRows = Math.ceil(Object.keys(this.state.players).length / 3);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = Object.values(this.state.players).splice(0,3);
            grid.push(row);
        }
        console.log('in main render - logging grid before passing to playerRow');
        console.log(grid);
      return (
            <div>
                <Navbar/>
                <h1 className="page-title">Players</h1>
                <hr/>
                <div className="container">
                    {grid.map((item, index) => (
                        <PlayerRow values={item} key={index}/>
                    ))}
                </div>
            </div>
        );
    }
}

class PlayerRow extends Component {
    render() {
        // console.log(this.props.values);
        // let numRows = Math.ceil(Object.keys(this.props.values).length / 3);
        // let rows = [];
        // let val = [];
        // for (let i=0; i< numRows; i++) {
        //     val = Object.values(this.props.values).splice(0,3);
        //     console.log('in player row... logging value');
        //     console.log(val);
        //     rows.push(val);
        // }

        console.log('in player row');
        let row = this.props.values;
        let players = [];
        players.push(
            row.map((player, index) => (
                React.createElement(GridPlayers, {value: player})
            ))
        );
        console.log(row);
        console.log('loggin players before shit blows up');
        console.log(players);
    return (
        <div className="row align-items-start">
            {players}
        </div>
        );
    }

// <div className="row align-items-start" key={i}>
// </div>
}
