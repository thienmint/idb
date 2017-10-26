import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridPlayers from "../components/grid-details/gridPlayers";
import { BarLoader } from 'react-spinners';


export default class Players extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            loading: true,
        };

        let proxyurl = 'https://cors-anywhere.herokuapp.com/';
        let apiurl = 'http://api.esportguru.com/';
        axios.get(proxyurl + apiurl + 'players').then((response) => {
            response.data.sort(function (player1, player2) {
                if (player1.image_url !== null) {
                    return -1;
                } else if (player2.image_url !== null) {
                    return 1;
                } else {
                    return 0;
                }});
            let stateCopy = Object.assign({}, this.state);
            stateCopy.players = stateCopy.players.slice();
            stateCopy.players = Object.assign({}, response.data);
            stateCopy.loading = false;
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let numRows = Math.ceil(Object.keys(this.state.players).length / 3);
        let players = Object.values(this.state.players);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = players.splice(0,3);
            grid.push(row);
        }
      return (
            <div>
                <Navbar/>
                <h1 className="page-title">Players</h1>
                <hr/>
                {this.state.loading ?
                    <div className="loading">
                        <BarLoader
                            loading={this.state.loading}
                            color={'#338481'}
                            width={200}
                        />
                    </div>
                    :
                    <div className="container">
                        {grid.map((item, index) => (
                            <PlayerRow values={item} key={index}/>
                        ))}
                    </div>
                }
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
