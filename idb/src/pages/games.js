import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridGames from "../components/grid-details/gridGames";
import { DotLoader } from 'react-spinners';

export default class Games extends Component {

    constructor(props){
        super(props);
        this.state = {
            games: [],
            loading: true,
            grid: []
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'games').then((response) => {
            let stateCopy = Object.assign([], this.state);
            stateCopy.games = stateCopy.games.slice();
            stateCopy.games = Object.assign([], response.data);
            stateCopy.loading = false;

            stateCopy.grid = Games.makeGrid(stateCopy.games);
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });

        this.sortAsc = this.sortAsc.bind(this);
        this.sortDesc = this.sortDesc.bind(this);
    }

    static makeGrid(gameState) {
        let numRows = Math.ceil(Object.keys(gameState).length / 3);
        let games = Object.values(gameState);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = games.splice(0,3);
            grid.push(row);
        }
        return grid
    }

    sortAsc() {
        let stateCopy = Object.assign([], this.state);
        stateCopy.games = stateCopy.games.sort((x, y) => (x.name.toLowerCase().localeCompare(y.name.toLowerCase())));
        stateCopy.loading = false;
        stateCopy.grid = Games.makeGrid(stateCopy.games);

        this.setState(stateCopy);
    }

    sortDesc() {
        let stateCopy = Object.assign([], this.state);
        stateCopy.games = stateCopy.games.sort((x, y) => (y.name.toLowerCase().localeCompare(x.name.toLowerCase())));
        stateCopy.loading = false;
        stateCopy.grid = Games.makeGrid(stateCopy.games);

        this.setState(stateCopy);
    }

    render() {
        console.log(this.state.grid);
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Games</h1>
                <hr/>
                Sort: <br/>
                <button onClick={this.sortAsc}>
                    Ascending
                </button>
                <button onClick={this.sortDesc}>
                    Descending
                </button>

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
                        {this.state.grid.map((item, index) => (
                            <GameRow values={item} key={index}/>
                        ))}
                    </div>
                }
            </div>
        );
    }
}

class GameRow extends Component {
    render() {
        let row = this.props.values;
        let games = [];
        games.push(
            row.map((game, index) => (
                React.createElement(GridGames, {value: game})
            ))
        );
        return (
            <div className="row align-items-start">
                {games}
            </div>
        );
    }
}
