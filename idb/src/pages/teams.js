import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';
import { DotLoader } from 'react-spinners';

import GridTeams from "../components/grid-details/gridTeams";
import {Pagination} from "../components/nav/pagination";

export default class Teams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            loading: true,
            displayedTeams: [],
            numberOfPages: 0,
            currentPage: 0,
            grid: [],
            sortOpt: 'Name',
            sortOrder: 'default',
            originalTeams: [],
            sourceTeams: [],
            emptyPlayers: false
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'teams').then((response) => {
            let stateCopy = Object.assign([], this.state);
            stateCopy.teams = stateCopy.teams.slice();
            stateCopy.teams = Object.assign([], response.data);
            stateCopy.sourceTeams = stateCopy.teams;
            stateCopy.displayedTeams = stateCopy.teams.slice(0,30);
            stateCopy.numberOfPages = Math.ceil(stateCopy.teams.length / 30);
            stateCopy.currentPage = 0;
            stateCopy.grid = Teams.makeGrid(stateCopy.displayedTeams);
            stateCopy.loading = false;
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
        stateCopy.displayedTeams = this.state.teams.slice(startingIndex, startingIndex + 30);
        stateCopy.grid = Teams.makeGrid(stateCopy.displayedTeams);
        this.setState(stateCopy);
    }

    static makeGrid(teamState) {
        let numItemPerRow = 3;
        let numRows = Math.ceil(Object.keys(teamState).length / numItemPerRow);
        let teams = Object.values(teamState);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = teams.splice(0, numItemPerRow);
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
                    case "Name":
                        stateCopy.teams = stateCopy.teams.sort((x, y) => (Teams.compareString(x.name, y.name)));
                        break;
                    case "Acronym":
                        stateCopy.teams = stateCopy.teams.sort((x, y) => (Teams.compareString(x.acronym, y.acronym)));
                        break;

                } break;
            case "desc":
                switch (stateCopy.sortOpt) {
                    case "Name":
                        stateCopy.teams = stateCopy.teams.sort((x, y) => (Teams.compareString(y.name, x.name)));
                        break;
                    case "Acronym":
                        stateCopy.teams = stateCopy.teams.sort((x, y) => (Teams.compareString(y.acronym, x.acronym)));
                        break;
                } break;
            default: stateCopy.teams = this.state.teams;
        }

        stateCopy.loading = false;
        stateCopy.grid = Teams.makeGrid(stateCopy.teams);

        this.setState(stateCopy)
    }

    handleCheckboxes(event) {
        let stateCopy = Object.assign([], this.state);
        switch (event.target.name) {
            case  "playersCheck":
                stateCopy.emptyPlayers = event.target.checked;
                break;
            default:
                console.log("Not match")
        }
        this.setState(stateCopy)
    }

    processFilter() {
        console.log("Process filter called");
        let stateCopy = Object.assign([], this.state);
        stateCopy.teams = stateCopy.sourceTeams;

        if(stateCopy.emptyPlayers)
            stateCopy.teams = stateCopy.teams.filter((x) =>
                (Object.keys(x.current_players).length > 0)
            );

        stateCopy.displayedTeams = stateCopy.teams.slice(0,30);
        stateCopy.numberOfPages = Math.ceil(stateCopy.teams.length / 30);

        stateCopy.grid = Teams.makeGrid(stateCopy.displayedTeams);
        this.setState(stateCopy)
    }

    resetFilter() {
        let stateCopy = Object.assign([], this.state);
        stateCopy.teams = stateCopy.sourceTeams;
        stateCopy.emptyPlayers = false;

        stateCopy.displayedTeams = stateCopy.teams.slice(0,30);
        stateCopy.numberOfPages = Math.ceil(stateCopy.teams.length / 30);

        stateCopy.grid = Teams.makeGrid(stateCopy.displayedTeams);
        this.setState(stateCopy)
    }

    render() {
        // console.log(this.state.grid);
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Teams</h1>
                <hr/>

                <p>Sort by: &nbsp;
                    <select value={this.state.sortOpt} onChange={this.sortOptChange}>
                        <option value="Name">Name</option>
                        <option value="Acronym">Acronym</option>
                    </select>
                    &nbsp;
                    <select value={this.state.sortOrder} onChange={this.sortHandle}>
                        <option value="default" className="default-option">Select</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </p>

                <p> Filter by: &nbsp;
                    <span>
                            Only 1 or more players: &nbsp;
                        <input
                            name="playersCheck"
                            type="checkbox"
                            checked={this.state.emptyPlayers}
                            onChange={this.handleCheckboxes} />
                        </span>
                    &nbsp;
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
                        <Pagination className="pagination"
                            numberOfPages={this.state.numberOfPages}
                            onClick={this.updatePage}
                        />
                        {this.state.grid.map((item, index) => (
                            <TeamRow values={item} key={index}/>
                        ))}
                    </div>
                }
            </div>
        );
    }
}

class TeamRow extends Component {
    render() {
        let row = this.props.values;
        let teams = [];
        teams.push(
            row.map((team, index) => (
                React.createElement(GridTeams, {value: team, key: index})
            ))
        );
        return (
            <div className="row align-items-start">
                {teams}
            </div>
        );
    }
}
