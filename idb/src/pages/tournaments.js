import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridTournaments from "../components/grid-details/gridTournaments";
import { BarLoader } from 'react-spinners';

export default class Tournaments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tournaments: [],
            loading: true,
        };

        let proxyurl = 'https://cors-anywhere.herokuapp.com/';
        let apiurl = 'http://api.esportguru.com/';
        axios.get(proxyurl + apiurl + 'tournaments').then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.tournaments = stateCopy.tournaments.slice();
            stateCopy.tournaments = Object.assign({}, response.data);
            stateCopy.loading = false;
            this.setState(stateCopy);
            console.log(this.state.tournaments);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let numRows = Math.ceil(Object.keys(this.state.tournaments).length / 3);
        let tournaments = Object.values(this.state.tournaments);
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
                        <BarLoader
                            loading={this.state.loading}
                            color={'#338481'}
                            width={200}
                        />
                    </div>
                    :
                    <div className="container">
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
                React.createElement(GridTournaments, {value: tournament})
            ))
        );
        return (
            <div className="row align-items-start">
                {tournaments}
            </div>
        );
    }
}
