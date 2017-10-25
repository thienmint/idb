import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import SoloMid from '../static/images/soloMid.jpg';
import Fnatic from '../static/images/fnatic-logo-font.png';
import Liquid from '../static/images/team-liquid-logo-B045C2BBCC-seeklogo.com.png';
import GridTeams from "../components/grid-details/gridTeams";

export default class Teams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
        };

        let proxyurl = 'https://cors-anywhere.herokuapp.com/';
        let apiurl = 'http://api.esportguru.com/';
        axios.get(proxyurl + apiurl + 'teams').then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.teams = stateCopy.teams.slice();
            stateCopy.teams = Object.assign({}, response.data);
            this.setState(stateCopy);
            console.log(this.state.teams);
        }).catch(function (error) {
            console.log(error);
        });
    }

    team_data = [
        {
            id: 1,
            name: 'Team SoloMid',
            games: ['League of Legends'],
            roster: ['JHauntzer', 'Svenskeren', 'Bjergsen', 'Doublelift', 'Biofrost'],
            date: '2009',
            championships: ['NALCS #1 2017'],
            logo_url: SoloMid,
            location: 'California, USA'
        },
        {
            id: 2,
            name: 'Fnatic',
            games: ['League of Legends'],
            roster: ['Krimz', 'JW', 'flusha', 'golden', 'lekr0', 'jump'],
            date: '2004',
            championships: ['#2 DreamHack summer 2017'],
            logo_url: Fnatic,
            location: 'Europe'
        },
        {
            id: 3,
            name: 'Liquid',
            games: ['League of Legends'],
            roster: ['ken', 'hungrybox', 'chillindude', 'crunch', 'chudat'],
            date: '2000',
            championships: ['The International 2017'],
            logo_url: Liquid,
            location: 'Netherlands'
        },
        {
            id: 4,
            name: 'Team SoloMid',
            games: ['League of Legends'],
            roster: ['ken', 'hungrybox', 'chillindude', 'crunch', 'chudat'],
            date: '2000',
            championships: ['The International 2017'],
            logo_url: Fnatic,
            location: 'Netherlands'
        }
    ];

    render() {
        let numRows = Math.ceil(Object.keys(this.state.teams).length / 3);
        let teams = Object.values(this.state.teams);
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
                <div className="container">
                    {grid.map((item, index) => (
                        <TeamRow values={item} key={index}/>
                    ))}
                </div>
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
                React.createElement(GridTeams, {value: team})
            ))
        );
        return (
            <div className="row align-items-start">
                {teams}
            </div>
        );
    }
}
