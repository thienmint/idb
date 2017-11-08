import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridGames from "../components/grid-details/gridGames";
import { DotLoader } from 'react-spinners';
import {Pagination} from "../components/nav/pagination";

export default class Games extends Component {

    constructor(props){
        super(props);
        this.state = {
            games: [],
            loading: true,
            displayedGames: [],
            numberOfPages: 0,
            currentPage: 0,
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'games').then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.games = stateCopy.games.slice();
            stateCopy.games = Object.assign({}, response.data);
            stateCopy.displayedGames = Object.values(stateCopy.games).slice(0, 30);
            stateCopy.numberOfPages = Math.ceil(Object.keys(stateCopy.games).length / 30);
            stateCopy.currentPage = 0;
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
        stateCopy.displayedGames = Object.values(this.state.games).slice(startingIndex, startingIndex + 30);
        this.setState(stateCopy);
    }

    render() {
        let numRows = Math.ceil(Object.keys(this.state.displayedGames).length / 3);
        let games = Object.values(this.state.displayedGames);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = games.splice(0,3);
            grid.push(row);
        }
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
                        <Pagination
                            numberOfPages={this.state.numberOfPages}
                            onClick={this.updatePage}
                        />
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
                React.createElement(GridGames, {value: game, key: index})
            ))
        );
        return (
            <div className="row align-items-start">
                {games}
            </div>
        );
    }
}
