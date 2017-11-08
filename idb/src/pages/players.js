import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridPlayers from "../components/grid-details/gridPlayers";
import { DotLoader } from 'react-spinners';
import {Pagination} from "../components/nav/pagination";


export default class Players extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            loading: true,
            displayedPlayers: [],
            numberOfPages: 0,
            currentPage: 0,
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'players').then((response) => {
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
            stateCopy.displayedPlayers = Object.values(stateCopy.players).slice(0,30);
            stateCopy.numberOfPages = Math.ceil(Object.keys(stateCopy.players).length / 30);
            stateCopy.loading = false;
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });

        this.updatePage = this.updatePage.bind(this);
    }

    updatePage(page) {
        let startingIndex = 30 * page;
        let stateCopy = Object.assign({}, this.state);
        stateCopy.displayedPlayers = Object.values(this.state.players).slice(startingIndex, startingIndex + 30);
        this.setState(stateCopy);
    }

    render() {
        let numRows = Math.ceil(Object.keys(this.state.displayedPlayers).length / 3);
        let players = Object.values(this.state.displayedPlayers);
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
                        <DotLoader
                            loading={this.state.loading}
                            color={'#338481'}
                            size={200}
                        />
                    </div>
                    :
                    <div className="container">
                        <Pagination
                            numberOfPages={this.state.numberOfPages}
                            onClick={this.updatePage}
                        />
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
                React.createElement(GridPlayers, {value: player, key: index})
            ))
        );
    return (
        <div className="row align-items-start">
            {players}
        </div>
        );
    }
}
