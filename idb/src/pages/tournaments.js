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
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'tournaments').then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.tournaments = stateCopy.tournaments.slice();
            stateCopy.tournaments = Object.assign({}, response.data);
            stateCopy.displayedTournaments = Object.values(stateCopy.tournaments).slice(0,30);
            stateCopy.numberOfPages = Math.ceil(Object.keys(stateCopy.tournaments).length / 30);
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
        stateCopy.displayedTournaments = Object.values(this.state.tournaments).slice(startingIndex, startingIndex + 30);
        this.setState(stateCopy);
    }

    render() {
        let numRows = Math.ceil(Object.keys(this.state.displayedTournaments).length / 3);
        let tournaments = Object.values(this.state.displayedTournaments);
        let grid = [];
        let row = [];
        for(let i = 0; i < numRows; i++){
            row = tournaments.splice(0,3);
            grid.push(row);
        }
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Tournaments</h1>
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
