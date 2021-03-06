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
            grid: [],
            sortOpt: 'Name',
            sortOrder: 'default',
            yearMinRange: '2000',
            yearMaxRange: '2017',
            originalGames: [],
            sourceGames: []
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'games').then((response) => {
            let stateCopy = Object.assign([], this.state);
            stateCopy.games = stateCopy.games.slice();
            stateCopy.games = Object.assign([], response.data);
            stateCopy.sourceGames = stateCopy.games;
            stateCopy.displayedGames = stateCopy.games.slice(0, 30);
            stateCopy.numberOfPages = Math.ceil(stateCopy.games.length / 30);
            stateCopy.currentPage = 0;
            stateCopy.loading = false;
            stateCopy.grid = Games.makeGrid(stateCopy.displayedGames);
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });
        this.updatePage = this.updatePage.bind(this);
        this.sortOptChange = this.sortOptChange.bind(this);
        this.sortHandle = this.sortHandle.bind(this);
        this.sortGrid = this.sortGrid.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
        this.processFilter = this.processFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }

    updatePage(page) {
        let startingIndex = 30 * page;
        let stateCopy = Object.assign({}, this.state);
        stateCopy.displayedGames = this.state.games.slice(startingIndex, startingIndex + 30);
        stateCopy.grid = Games.makeGrid(stateCopy.displayedGames);
        this.setState(stateCopy);
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

    static compareString(x, y) {
        if(x === null && y !== null)
            return -1;
        else if(x !== null && y === null)
            return 1;
        else if(x === null && y === null)
            return 0;
        else
            return x.toLowerCase().localeCompare(y.toLowerCase())
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
                    case "Name": stateCopy.games = stateCopy.games.sort((x, y) => (Games.compareString(x.name, y.name)));
                    break;
                    case "Date": stateCopy.games = stateCopy.games.sort((x, y) => (Games.compareString(x.release_date, y.release_date)));
                    break;
                    default:
                } break;
            case "desc":
                switch (stateCopy.sortOpt) {
                    case "Name": stateCopy.games = stateCopy.games.sort((x, y) => (Games.compareString(y.name, x.name)));
                        break;
                    case "Date": stateCopy.games = stateCopy.games.sort((x, y) => (Games.compareString(y.release_date, x.release_date)));
                    break;
                    default:
                } break;
            default: stateCopy.games = this.state.games;
        }

        stateCopy.loading = false;
        stateCopy.grid = Games.makeGrid(stateCopy.games);

        this.setState(stateCopy)
    }

    handleInputs(event) {
        let stateCopy = Object.assign([], this.state);
        switch (event.target.name) {
            case  "yearMin":
                stateCopy.yearMinRange = event.target.value;
                break;
            case  "yearMax":
                stateCopy.yearMaxRange = event.target.value;
                break;
            default:
                console.log("Not match")
        }
        this.setState(stateCopy)
    }

    static compareDate (datestring, min, max) {
        let year = null;
        if(datestring !== null){
             year = datestring.split("-")[0];
             return (Games.compareString(year, min) >= 0 && Games.compareString(year, max) <= 0)
        }
        else
            return false
    }

    processFilter() {
        // console.log("Process filter called");
        let stateCopy = Object.assign([], this.state);
        stateCopy.games = stateCopy.sourceGames;
        let min = parseInt(stateCopy.yearMinRange, 10);
        let max = parseInt(stateCopy.yearMaxRange, 10);

        if(!isNaN(max) && !isNaN(min))
            stateCopy.games = stateCopy.games.filter((x) => (
                Games.compareDate(x.release_date, stateCopy.yearMinRange, stateCopy.yearMaxRange)
            ));

        stateCopy.displayedGames = stateCopy.games.slice(0, 30);
        stateCopy.numberOfPages = Math.ceil(stateCopy.games.length / 30);

        stateCopy.grid = Games.makeGrid(stateCopy.displayedGames);
        this.setState(stateCopy)
    }

    resetFilter() {
        let stateCopy = Object.assign([], this.state);
        stateCopy.games = stateCopy.sourceGames;
        stateCopy.yearMinRange = '2000';
        stateCopy.yearMaxRange = '2017';

        stateCopy.displayedGames = stateCopy.games.slice(0, 30);
        stateCopy.numberOfPages = Math.ceil(stateCopy.games.length / 30);

        stateCopy.grid = Games.makeGrid(stateCopy.displayedGames);
        this.setState(stateCopy)
    }

    render() {
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Games</h1>
                <hr/>
                <div className="row gutter-for-sorting">
                <div className="container sort-filter col-md-3">
                    <div className="col card">
                        <div className="row fields sort"><b>Sort by:</b> &nbsp;
                            <select className="btn btn-default dropdown-toggle" value={this.state.sortOpt} onChange={this.sortOptChange}>
                                <option value="Name">Name</option>
                                <option value="Date">Release Date</option>
                            </select>
                            &nbsp;
                            <select className="btn btn-default dropdown-toggle" value={this.state.sortOrder} onChange={this.sortHandle}>
                                <option value="default" className="default-option">Select</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div className="fields row"><b>Filter by:</b></div>
                        <div className="row">
                            <div className="col"> Release date from &nbsp;</div>
                            <div className="col">
                                <input
                                    name="yearMin"
                                    type="number"
                                    min="2000"
                                    max={this.state.yearMaxRange}
                                    value={this.state.yearMinRange}
                                    onChange={this.handleInputs} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">to &nbsp;</div>
                            <div className="col">
                                <input
                                    name="yearMax"
                                    type="number"
                                    min={this.state.yearMinRange}
                                    max="2017"
                                    value={this.state.yearMaxRange}
                                    onChange={this.handleInputs} />
                            </div>
                        </div>
                        <div className="fields row">
                            <input
                                name="filter"
                                type="submit"
                                className="btn"
                                value="Apply"
                                onClick={this.processFilter}
                            />
                            &nbsp;
                            <input
                                name="reset"
                                type="submit"
                                className="btn"
                                value="Reset"
                                onClick={this.resetFilter}
                            />
                        </div>
                    </div>
                </div>
                {this.state.loading ?
                    <div className="loading">
                        <DotLoader
                            loading={this.state.loading}
                            color={'#338481'}
                            size={200}
                        />
                    </div>
                    :
                    <div className="container my-grid col-md-9">
                        <Pagination
                            numberOfPages={this.state.numberOfPages}
                            onClick={this.updatePage}
                        />
                        {this.state.grid.map((item, index) => (
                            <GameRow values={item} key={index}/>
                        ))}
                    </div>
                }
            </div>
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
