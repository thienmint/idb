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
            grid: [],
            sortOpt: 'Tag',
            sortOrder: 'default',
            originalPlayers: [],
            sourcePlayers: [],
            nameEmpty: false,
            hometownEmpty: false,
            playOverwatch: false,
            playLeague: false,
            playHS: false
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

            let stateCopy = Object.assign([], this.state);
            stateCopy.players = stateCopy.players.slice();
            stateCopy.players = Object.assign([], response.data);
            stateCopy.sourcePlayers = stateCopy.players;
            stateCopy.displayedPlayers = stateCopy.players.slice(0,30);
            stateCopy.numberOfPages = Math.ceil(stateCopy.players.length / 30);
            stateCopy.loading = false;
            stateCopy.grid = Players.makeGrid(stateCopy.displayedPlayers);
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });

        this.updatePage = this.updatePage.bind(this);
        this.sortOptChange = this.sortOptChange.bind(this);
        this.sortHandle = this.sortHandle.bind(this);
        this.sortGrid = this.sortGrid.bind(this);
        this.handleCheckboxes = this.handleCheckboxes.bind(this);
        this.processFilter = this.processFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }

    updatePage(page) {
        let startingIndex = 30 * page;
        let stateCopy = Object.assign({}, this.state);
        stateCopy.displayedPlayers = this.state.players.slice(startingIndex, startingIndex + 30);
        stateCopy.grid = Players.makeGrid(stateCopy.displayedPlayers);
        this.setState(stateCopy);
    }

    static makeGrid(playerState) {
        let numItemPerRow = 3;
        let numRows = Math.ceil(Object.keys(playerState).length / numItemPerRow);
        let players = Object.values(playerState);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = players.splice(0,numItemPerRow);
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

    sortGrid(stateCopy) {
        // console.log("SortGrid")
        switch (stateCopy.sortOrder) {
            case "asc":
                switch (stateCopy.sortOpt) {
                    case "Tag":
                        stateCopy.players = stateCopy.players.sort((x, y) => (Players.compareString(x.tag, y.tag)));
                        break;
                    case "FirstName":
                        stateCopy.players = stateCopy.players.sort((x, y) => (Players.compareString(x.first_name, y.first_name)));
                        break;
                    case "LastName":
                        stateCopy.players = stateCopy.players.sort((x, y) => (Players.compareString(x.last_name, y.last_name)));
                        break;
                    case "Hometown":
                        stateCopy.players = stateCopy.players.sort((x, y) => (Players.compareString(x.hometown, y.hometown)));
                        break;

                } break;
            case "desc":
                switch (stateCopy.sortOpt) {
                    case "Tag":
                        stateCopy.players = stateCopy.players.sort((x, y) => (Players.compareString(y.tag, x.tag)));
                        break;
                    case "FirstName":
                        stateCopy.players = stateCopy.players.sort((x, y) => (Players.compareString(y.first_name, x.first_name)));
                        break;
                    case "LastName":
                        stateCopy.players = stateCopy.players.sort((x, y) => (Players.compareString(y.last_name, x.last_name)));
                        break;
                    case "Hometown":
                        stateCopy.players = stateCopy.players.sort((x, y) => (Players.compareString(y.hometown, x.hometown)));
                        break;
                } break;
            default: stateCopy.players = this.state.players;
        }

        stateCopy.loading = false;
        stateCopy.grid = Players.makeGrid(stateCopy.players);

        this.setState(stateCopy)
    }

    handleCheckboxes(event) {
        let stateCopy = Object.assign([], this.state);
        switch (event.target.name) {
            case  "nameCheck":
                stateCopy.nameEmpty = event.target.checked;
                break;
            case  "tagCheck":
                stateCopy.hometownEmpty = event.target.checked;
                break;
            case "overwatchCheck":
                stateCopy.playOverwatch = event.target.checked;
                break;
            case "leagueCheck":
                stateCopy.playLeague = event.target.checked;
                break;
            case "hsCheck":
                stateCopy.playHS = event.target.checked;
                break;
            default:
                console.log("Not match")
        }
        this.setState(stateCopy)
    }
    static checkGame(x, id) {
        if(x !== null && Object.keys(x).length > 0)
            return new Map(Object.entries(x)).get("id") === id;
        else
            return false;
    }

    processFilter() {
        console.log("Process filter called");
        let stateCopy = Object.assign([], this.state);
        stateCopy.players = stateCopy.sourcePlayers;

        if(stateCopy.nameEmpty)
            stateCopy.players = stateCopy.players.filter((x) =>
                (x.first_name !== null && x.last_name !== null &&
                    (
                        (x.first_name !== "" && x.first_name !== "Unknown") ||
                        (x.last_name !== "" && x.last_name !== "Unknown")
                    )
                )
            );

        if(stateCopy.hometownEmpty)
            stateCopy.players = stateCopy.players.filter((x) => (x.hometown !== null && x.hometown !== "" && x.hometown !== "Unknown"));

        if(stateCopy.playOverwatch)
            stateCopy.players = stateCopy.players.filter((x) => (
                Players.checkGame(x.current_game, 14)
            ));

        if(stateCopy.playLeague)
            stateCopy.players = stateCopy.players.filter((x) => (
                Players.checkGame(x.current_game, 1)
            ));

        if(stateCopy.playHS)
            stateCopy.players = stateCopy.players.filter((x) => (
                Players.checkGame(x.current_game, 2)
            ));

        stateCopy.displayedPlayers = stateCopy.players.slice(0,30);
        stateCopy.numberOfPages = Math.ceil(stateCopy.players.length / 30);

        stateCopy.grid = Players.makeGrid(stateCopy.displayedPlayers);
        this.setState(stateCopy)
    }

    resetFilter() {
        let stateCopy = Object.assign([], this.state);
        stateCopy.players = stateCopy.sourcePlayers;
        stateCopy.nameEmpty = false;
        stateCopy.hometownEmpty = false;
        stateCopy.playOverwatch = false;
        stateCopy.playLeague = false;
        stateCopy.playHS = false;

        stateCopy.displayedPlayers = stateCopy.players.slice(0,30);
        stateCopy.numberOfPages = Math.ceil(stateCopy.players.length / 30);

        stateCopy.grid = Players.makeGrid(stateCopy.displayedPlayers);
        this.setState(stateCopy)
    }

    render() {
        // console.log(this.state.players);
      return (
            <div>
                <Navbar/>
                <h1 className="page-title">Players</h1>
                <hr/>

                <p>Sort by: &nbsp;
                    <select value={this.state.sortOpt} onChange={this.sortOptChange}>
                        <option value="Tag">Tag</option>
                        <option value="FirstName">First Name</option>
                        <option value="LastName">Last Name</option>
                        <option value="Hometown">Hometown</option>
                    </select>
                    &nbsp;
                    <select value={this.state.sortOrder} onChange={this.sortHandle}>
                        <option value="default" className="default-option">Select</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </p>
                <p> Filter by: <br/>
                    <span>
                            Nonempty name &nbsp;
                        <input
                            name="nameCheck"
                            type="checkbox"
                            checked={this.state.nameEmpty}
                            onChange={this.handleCheckboxes} />
                        </span>
                    &nbsp;
                    <span>
                            Nonempty hometown &nbsp;
                        <input
                            name="tagCheck"
                            type="checkbox"
                            checked={this.state.hometownEmpty}
                            onChange={this.handleCheckboxes} />
                        </span>
                    <br/>
                    <span>
                            Overwatch &nbsp;
                        <input
                            name="overwatchCheck"
                            type="checkbox"
                            checked={this.state.playOverwatch}
                            onChange={this.handleCheckboxes} />
                        </span>
                    &nbsp;
                    <span>
                            League of Legends &nbsp;
                        <input
                            name="leagueCheck"
                            type="checkbox"
                            checked={this.state.playLeague}
                            onChange={this.handleCheckboxes} />
                        </span>
                    &nbsp;
                    <span>
                            HearthStone &nbsp;
                        <input
                            name="hsCheck"
                            type="checkbox"
                            checked={this.state.playHS}
                            onChange={this.handleCheckboxes} />
                        </span>
                    <br/>
                    <span>
                            <input
                                name="filter"
                                type="button"
                                value="Apply"
                                onClick={this.processFilter}
                            />
                        </span>
                    &nbsp;
                    <span>
                            <input
                                name="reset"
                                type="button"
                                value="Reset"
                                onClick={this.resetFilter}
                            />
                        </span>

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
                        <Pagination
                            numberOfPages={this.state.numberOfPages}
                            onClick={this.updatePage}
                        />
                        {this.state.grid.map((item, index) => (
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
