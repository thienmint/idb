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
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'teams').then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.teams = stateCopy.teams.slice();
            stateCopy.teams = Object.assign({}, response.data);
            stateCopy.displayedTeams = Object.values(stateCopy.teams).slice(0,30);
            stateCopy.numberOfPages = Math.ceil(Object.keys(stateCopy.teams).length / 30);
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
        stateCopy.displayedTeams = Object.values(this.state.teams).slice(startingIndex, startingIndex + 30);
        this.setState(stateCopy);
    }

    render() {
        let numRows = Math.ceil(Object.keys(this.state.displayedTeams).length / 3);
        let teams = Object.values(this.state.displayedTeams);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = teams.splice(0,3);
            grid.push(row);
        }
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Teams</h1>
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
                        <Pagination className="pagination"
                            numberOfPages={this.state.numberOfPages}
                            onClick={this.updatePage}
                        />
                        {grid.map((item, index) => (
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
