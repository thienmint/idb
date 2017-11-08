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
            grid: [],
            sortOpt: 'Name',
            sortOrder: 'default'
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

        this.sortOptChange = this.sortOptChange.bind(this);
        this.sortHandle = this.sortHandle.bind(this);
        this.sortGrid = this.sortGrid.bind(this);
    }

    static makeGrid(gameState) {
        let numItemPerRow = 3;
        let numRows = Math.ceil(Object.keys(gameState).length / numItemPerRow);
        let games = Object.values(gameState);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = games.splice(0,numItemPerRow);
            grid.push(row);
        }
        return grid
    }

    sortHandle(event) {
        let stateCopy = Object.assign([], this.state);
        stateCopy.sortOrder = event.target.value;
        this.sortGrid(stateCopy)
    }

    sortOptChange(event) {
        let stateCopy = Object.assign([], this.state);
        stateCopy.sortOpt = event.target.value;
        this.sortGrid(stateCopy)
    }

    sortGrid(stateCopy) {
        switch (stateCopy.sortOrder) {
            case "asc":
                switch (stateCopy.sortOpt) {
                    case "Name": stateCopy.games = stateCopy.games.sort((x, y) => (x.name.toLowerCase().localeCompare(y.name.toLowerCase())));
                    break;
                    case "Date": stateCopy.games = stateCopy.games.sort((x, y) => (x.release_date.toLowerCase().localeCompare(y.release_date.toLowerCase())));
                } break;
            case "desc":
                switch (stateCopy.sortOpt) {
                    case "Name": stateCopy.games = stateCopy.games.sort((x, y) => (y.name.toLowerCase().localeCompare(x.name.toLowerCase())));
                        break;
                    case "Date": stateCopy.games = stateCopy.games.sort((x, y) => (y.release_date.toLowerCase().localeCompare(x.release_date.toLowerCase())));
                } break;
            default: stateCopy.games = this.state.games;
        }

        stateCopy.loading = false;
        stateCopy.grid = Games.makeGrid(stateCopy.games);

        this.setState(stateCopy)
    }

    render() {
        console.log(this.state.grid);
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Games</h1>
                <hr/>

                <p>Sort by: &nbsp;
                <select value={this.state.sortOpt} onChange={this.sortOptChange}>
                    <option value="Name">Name</option>
                    <option value="Date">Release Date</option>
                </select>

                <select value={this.state.sortOrder} onChange={this.sortHandle}>
                    <option value="default" className="default-option">Select</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                </p>

                <br/>


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
