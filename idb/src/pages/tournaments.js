import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridTournaments from "../components/grid-details/gridTournaments";
import { DotLoader } from 'react-spinners';
import {Pagination} from "../components/nav/pagination";

export default class Tournaments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tournaments: [],
            loading: true,
            displayedTournaments: [],
            numberOfPages: 0,
            currentPage: 0,
            grid: [],
            sortOpt: 'Name',
            sortOrder: 'default'
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'tournaments').then((response) => {
            let stateCopy = Object.assign([], this.state);
            stateCopy.tournaments = stateCopy.tournaments.slice();
            stateCopy.tournaments = Object.assign([], response.data);
            stateCopy.displayedTournaments = stateCopy.tournaments.slice(0,30);
            stateCopy.numberOfPages = Math.ceil(stateCopy.tournaments.length / 30);
            stateCopy.currentPage = 0;
            stateCopy.grid = Tournaments.makeGrid(stateCopy.displayedTournaments);
            stateCopy.loading = false;
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });

        this.updatePage = this.updatePage.bind(this);
        this.sortOptChange = this.sortOptChange.bind(this);
        this.sortHandle = this.sortHandle.bind(this);
        this.sortGrid = this.sortGrid.bind(this);
    }

    updatePage(page) {
        let startingIndex = 30 * page;
        let stateCopy = Object.assign({}, this.state);
        stateCopy.displayedTournaments = this.state.tournaments.slice(startingIndex, startingIndex + 30);
        stateCopy.grid = Tournaments.makeGrid(stateCopy.displayedTournaments);
        this.setState(stateCopy);
    }

    static makeGrid(tourneyState) {
        let numItemPerRow = 3;
        let numRows = Math.ceil(Object.keys(tourneyState).length / numItemPerRow);
        let tournaments = Object.values(tourneyState);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = tournaments.splice(0, numItemPerRow);
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
                        stateCopy.tournaments = stateCopy.tournaments.sort((x, y) => (Tournaments.compareString(x.name, y.name)));
                        break;
                    case "Slug":
                        stateCopy.tournaments = stateCopy.tournaments.sort((x, y) => (Tournaments.compareString(x.slug, y.slug)));
                        break;
                    case "StartDate":
                        stateCopy.tournaments = stateCopy.tournaments.sort((x, y) => (Tournaments.compareString(x.begin_at, y.begin_at)));
                        break;
                    case "EndDate":
                        stateCopy.tournaments = stateCopy.tournaments.sort((x, y) => (Tournaments.compareString(x.end_at, y.end_at)));
                        break;
                } break;
            case "desc":
                switch (stateCopy.sortOpt) {
                    case "Name":
                        stateCopy.tournaments = stateCopy.tournaments.sort((x, y) => (Tournaments.compareString(y.name, x.name)));
                        break;
                    case "Slug":
                        stateCopy.tournaments = stateCopy.tournaments.sort((x, y) => (Tournaments.compareString(y.slug, x.slug)));
                        break;
                    case "StartDate":
                        stateCopy.tournaments = stateCopy.tournaments.sort((x, y) => (Tournaments.compareString(y.begin_at, x.begin_at)));
                        break;
                    case "EndDate":
                        stateCopy.tournaments = stateCopy.tournaments.sort((x, y) => (Tournaments.compareString(y.end_at, x.end_at)));
                        break;
                } break;
            default: stateCopy.tournaments = this.state.players;
        }

        stateCopy.loading = false;
        stateCopy.grid = Tournaments.makeGrid(stateCopy.tournaments);

        this.setState(stateCopy)
    }

    render() {

        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Tournaments</h1>
                <hr/>

                <p>Sort by: &nbsp;
                    <select value={this.state.sortOpt} onChange={this.sortOptChange}>
                        <option value="Name">Name</option>
                        <option value="Slug">Slug</option>
                        <option value="StartDate">Start Date</option>
                        <option value="EndDate">End Date</option>
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
                        <Pagination
                            numberOfPages={this.state.numberOfPages}
                            onClick={this.updatePage}
                        />
                        {this.state.grid.map((item, index) => (
                            <TournamentRow values={item} key={index}/>
                        ))}
                    </div>
                }
            </div>
        );
    }
}

class TournamentRow extends Component {
    render() {
        let row = this.props.values;
        let tournaments = [];
        tournaments.push(
            row.map((tournament, index) => (
                React.createElement(GridTournaments, {value: tournament, key: index})
            ))
        );
        return (
            <div className="row align-items-start">
                {tournaments}
            </div>
        );
    }
}
