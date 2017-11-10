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
            temp: " ",
            numberOfPages: 0,
        };

        let apiurl = 'http://api.esportguru.com/';

        axios.get(apiurl + 'search/'+ this.props.match.params.id).then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.games = stateCopy.games.slice();
            stateCopy.games = Object.assign([], response.data);
            stateCopy.loading = false;
            stateCopy.temp = this.props.match.params.id;
            stateCopy.numberOfPages = Math.ceil(stateCopy.games.length / 10);
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let games = Object.values(this.state.games);
        let grid = [];
        let grid2 = [];
        let grid3 = [];
        let grid4 = [];
        let individual_words = this.state.temp.split(" ");

        for(let i = 0; i < Math.ceil(Object.keys(this.state.games).length); i++){
                let row = games.splice(0,1);
             
                for(let sub = 0; sub<row.length;sub++)
                {
                    let row2 = row[sub];
                    for(let sub2 = 0; sub2< row2.length;sub++ )
                    {
                        let part = row2.splice(0,1);
                        for(let part_of_part = 0; part_of_part < part.length; part_of_part++)
                        {
                            for(let word_position = 0; word_position< individual_words.length; word_position++)
                            {
                                this.state.temp = individual_words[word_position];
                                if(i === 0)
                                {
                                    if(part[part_of_part].name != null)
                                        part[part_of_part].name = part[part_of_part].name.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].summary != null)
                                        part[part_of_part].summary = part[part_of_part].summary.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].release_date != null)
                                        part[part_of_part].release_date = part[part_of_part].release_date.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].sample_players != null)
                                        part[part_of_part].sample_players = part[part_of_part].sample_players.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].sample_teams != null)
                                        part[part_of_part].sample_teams = part[part_of_part].sample_teams.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                }
                                if(i === 1)
                                {
                                    if(part[part_of_part].tag != null)
                                        part[part_of_part].tag = part[part_of_part].tag.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].first_name != null)
                                        part[part_of_part].first_name = part[part_of_part].first_name.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].last_name != null)
                                        part[part_of_part].last_name = part[part_of_part].last_name.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].role != null)
                                        part[part_of_part].role = part[part_of_part].role.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].hometown != null)
                                        part[part_of_part].hometown = part[part_of_part].hometown.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].current_game != null)
                                        part[part_of_part].current_game = part[part_of_part].current_game.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].current_team != null)
                                        part[part_of_part].current_team = part[part_of_part].current_team.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());

                                }
                                if(i === 2)
                                {
                                    if(part[part_of_part].name != null)
                                        part[part_of_part].name = part[part_of_part].name.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].acronym != null)
                                        part[part_of_part].acronym = part[part_of_part].acronym.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].current_players != null)
                                        part[part_of_part].current_players = part[part_of_part].current_players.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].current_game != null)
                                        part[part_of_part].current_game = part[part_of_part].current_game.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                }
                                if(i === 3)
                                {
                                    if(part[part_of_part].slug != null)
                                        part[part_of_part].slug = part[part_of_part].slug.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].name != null)
                                        part[part_of_part].name = part[part_of_part].name.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].begin_at != null)
                                        part[part_of_part].begin_at = part[part_of_part].begin_at.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].end_at != null)
                                        part[part_of_part].end_at = part[part_of_part].end_at.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].game != null)
                                        part[part_of_part].game = part[part_of_part].game.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                    if(part[part_of_part].teams != null)
                                        part[part_of_part].teams = part[part_of_part].teams.replace(new RegExp(this.state.temp, 'gi'),this.state.temp.bold());
                                }
                                
                            }
                        }
                        if(i === 0)
                            grid.push(part);
                        if(i === 1)
                            grid2.push(part);
                        if(i === 2)
                            grid3.push(part);
                        if(i === 3)
                            grid4.push(part);
                    }
                }
        }

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
                    [ (grid.length >= 1 && grid2.length >=1 && grid3.length >=1 && grid4.length >= 1 ?
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
                            :
                            <div className="no-search-results">Oh no! No results were found for your search. Please try making your search less specific or searching for a different term.</div>)
                    ]
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

