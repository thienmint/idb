import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridGames from "../components/grid-details/gridSearchGames";
import GridPlayers from "../components/grid-details/gridSearchPlayers";
import GridTeams from "../components/grid-details/gridSearchTeams";
import GridTournaments from "../components/grid-details/gridSearchTournaments";

import { DotLoader } from 'react-spinners';

export default class SearchPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            games: [],
            loading: true,
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'search/'+ this.props.match.params.id).then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.games = stateCopy.games.slice();
            stateCopy.games = Object.assign({}, response.data);
            stateCopy.loading = false;

            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });
        console.log(this.props.match.params.id);
    }

    render() {
        let games = Object.values(this.state.games);
        let grid = [];
        let grid2 = [];
        let grid3 = [];
        let grid4 = [];
        console.log(this.state.games);

        for(let i = 0; i < Math.ceil(Object.keys(this.state.games).length); i++){
                let row = games.splice(0,1);
                // console.log(row[0]);
                // console.log(row[0].length);
                for(let sub = 0; sub<row.length;sub++)
                {
                    let row2 = row[sub];
                    for(let sub2 = 0; sub2< row2.length;sub++ )
                    {
                        let part = row2.splice(0,1);
                        if(i == 0)
                            grid.push(part);
                        if(i == 1)
                            grid2.push(part);
                        if(i == 2)
                            grid3.push(part);
                        if(i == 3)
                            grid4.push(part);
                        
                        
                    }
                }

        }

        // console.log(grid);
        // console.log("sendhelp");
        return (
            <div>
                <Navbar/>
                <h1 className="page-title">Search Results</h1>
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
                        {grid.map((item, index) => (
                             <GameRow values={item} key={index}/>
                        ))}
                        {grid2.map((item, index) => (
                             <GamePlayer values={item} key={index}/>
                        ))}
                        {grid3.map((item, index) => (
                             <GameTeam values={item} key={index}/>
                        ))}
                        {grid4.map((item, index) => (
                             <GameTournament values={item} key={index}/>
                        ))}

                    </div>
                }
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
                React.createElement(GridGames, {value: game})
            ))
        );
        return (
            <div className="row align-items-start">
                {games}
            </div>
        );
    }
}
class GamePlayer extends Component {
    render() {
        let row = this.props.values;
        let games = [];
        games.push(
            row.map((game, index) => (
                React.createElement(GridPlayers, {value: game})
            ))
        );
        return (
            <div className="row align-items-start">
                {games}
            </div>
        );
    }
}
class GameTeam extends Component {
    render() {
        let row = this.props.values;
        let games = [];
        games.push(
            row.map((game, index) => (
                React.createElement(GridTeams, {value: game})
            ))
        );
        return (
            <div className="row align-items-start">
                {games}
            </div>
        );
    }
}

class GameTournament extends Component {
    render() {
        let row = this.props.values;
        let games = [];
        games.push(
            row.map((game, index) => (
                React.createElement(GridTournaments, {value: game})
            ))
        );
        return (
            <div className="row align-items-start">
                {games}
            </div>
        );
    }
}
