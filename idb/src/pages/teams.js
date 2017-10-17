import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'

import SoloMid from '../static/images/soloMid.jpg';
import Fnatic from '../static/images/fnatic-logo-font.png';
import Liquid from '../static/images/team-liquid-logo-B045C2BBCC-seeklogo.com.png';
import GridTeams from "../components/grid-details/teams";

class Teams extends Component {
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
        let numRows = Math.ceil(this.team_data.length / 3);
        let rows = [];
        let cols = [];
        for (let i=0; i< numRows; i++) {
            cols = this.team_data.splice(0,3);
            rows.push(
                <div className="row align-items-start">
                    {cols.map((team, index) => (
                        <GridTeams value={team} key={index}/>
                    ))}
                </div>
            )
        }
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Teams</h1>
                <hr/>
                <div className="container">
                    {rows}
                </div>
            </div>
        );
    }
}

export default Teams;
