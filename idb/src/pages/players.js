import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridPlayers from "../components/grid-details/gridPlayers";
import { DotLoader } from 'react-spinners';


export default class Players extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            loading: true,
            grid: [],
            sortOpt: 'Tag',
            sortOrder: 'default'
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
            stateCopy.grid = Players.makeGrid(stateCopy.players);
            stateCopy.loading = false;
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });

        this.sortOptChange = this.sortOptChange.bind(this);
        this.sortHandle = this.sortHandle.bind(this);
        this.sortGrid = this.sortGrid.bind(this);
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
                    // case "Role":
                    //     stateCopy.players = stateCopy.players.sort((x, y) => (x.name.toLowerCase().localeCompare(y.name.toLowerCase())));
                    //     break;
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
                    // case "Role":
                    //     stateCopy.players = stateCopy.players.sort((x, y) => (y.name.toLowerCase().localeCompare(x.name.toLowerCase())));
                    //     break;
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
                        {/*<option value="Role">Role</option>*/}
                        <option value="Hometown">Hometown</option>
                    </select>
                    &nbsp;
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
