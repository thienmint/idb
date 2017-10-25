import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridPlayers from "../components/grid-details/gridPlayers";


export default class Players extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [],
        };

        let proxyurl = 'https://cors-anywhere.herokuapp.com/';
        let apiurl = 'http://api.esportguru.com/';
        axios.get(proxyurl + apiurl + 'players').then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.players = stateCopy.players.slice();
            stateCopy.players = Object.assign({}, response.data);
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let numRows = Math.ceil(Object.keys(this.state.players).length / 3);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = Object.values(this.state.players).splice(0,3);
            grid.push(row);
        }
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
        let row = this.props.values;
        let players = [];
        players.push(
            row.map((player, index) => (
                React.createElement(GridPlayers, {value: player})
            ))
        );
    return (
        <div className="row align-items-start">
            {players}
        </div>
        );
    }
}
