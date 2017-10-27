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
        };

        let proxyurl = 'https://cors-anywhere.herokuapp.com/';
        let apiurl = 'http://api.esportguru.com/';
        axios.get(proxyurl + apiurl + 'games').then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.games = stateCopy.games.slice();
            stateCopy.games = Object.assign({}, response.data);
            stateCopy.loading = false;
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let numRows = Math.ceil(Object.keys(this.state.games).length / 3);
        let games = Object.values(this.state.games);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = games.splice(0,3);
            grid.push(row);
        }
        console.log(grid);
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Games</h1>
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
                        {grid.map((item, index) => (
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
