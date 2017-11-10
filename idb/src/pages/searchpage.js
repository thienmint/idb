import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridGames from "../components/grid-details/gridSearchGames";
import GridPlayers from "../components/grid-details/gridSearchPlayers";
import GridTeams from "../components/grid-details/gridSearchTeams";
import GridTournaments from "../components/grid-details/gridSearchTournaments";

import { DotLoader } from 'react-spinners';
import {Pagination} from "../components/nav/pagination";

export default class SearchPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            results: [],
            loading: true,
            temp: " ",
            numberOfPages: 0,
            games: [],
            players: [],
            teams: [],
            tournaments: [],
            displayedGames: [],
            displayedPlayers: [],
            displayedTeams: [],
            displayedTournaments: []
        };

        let apiurl = 'http://api.esportguru.com/';

        if (typeof this.props.match.params.id !== "undefined" && this.props.match.params.id !== null && this.props.match.params.id.trim() !== "")
            axios.get(apiurl + 'search/'+ this.props.match.params.id).then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.results = stateCopy.results.slice();
            stateCopy.results = Object.assign([], response.data);
            stateCopy.loading = false;
            stateCopy.temp = this.props.match.params.id;

            let valuesForHighlighting = Object.assign({}, stateCopy);
            let stateTwo = this.highlightAllKeywords(valuesForHighlighting);
            stateCopy.games = stateTwo.games;
            stateCopy.players = stateTwo.players;
            stateCopy.teams = stateTwo.teams;
            stateCopy.tournaments = stateTwo.tournaments;
            stateCopy.numberOfPages = Math.ceil((Object.keys(stateCopy.games).length + Object.keys(stateCopy.players).length +
                Object.keys(stateCopy.teams).length + Object.keys(stateCopy.tournaments).length) / 10);

            let displayedValues = Object.assign({}, stateCopy);
            let stateToDisplay = this.getTenResults(0, displayedValues);
            stateCopy.displayedGames = stateToDisplay.displayedGames;
            stateCopy.displayedPlayers = stateToDisplay.displayedPlayers;
            stateCopy.displayedTeams = stateToDisplay.displayedTeams;
            stateCopy.displayedTournaments = stateToDisplay.displayedTournaments;

            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });
        this.updatePage = this.updatePage.bind(this);
    }

    updatePage(page) {
        let startingIndex = 10 * page;
        let stateCopy = Object.assign({}, this.state);
        let stateToBeDisplayed = this.getTenResults(startingIndex, stateCopy);
        this.setState(stateToBeDisplayed);
    }

    getTenResults(startingIndex, state) {
        let endOfGames = Object.keys(state.games).length - 1;
        let endOfPlayers = Object.keys(state.players).length - 1;
        let endOfTeams = Object.keys(state.teams).length - 1;
        let arrayLengths = [ endOfGames, endOfPlayers, endOfTeams];

        let numResults = 0;
        let numLeftToGrab = 10;
        let endingIndex = startingIndex + 10;
        let srtInx = startingIndex;
        let endInx = endingIndex;

        state.displayedGames = [];
        state.displayedPlayers = [];
        state.displayedTeams = [];
        state.displayedTournaments = [];

        let arraysUntilStart = 0;
        while (srtInx > 0) {
            srtInx = srtInx - arrayLengths[arraysUntilStart];
            arraysUntilStart++;
        }

        let arraysUntilEnd = 0;
        while (endInx > 0) {
            endInx = endInx - arrayLengths[arraysUntilEnd];
            arraysUntilEnd++;
        }

        if (arraysUntilStart === arraysUntilEnd) {
            if (arraysUntilStart === 0) {
                state.displayedGames = Object.values(state.games).splice(startingIndex, 10);
            } else if (arraysUntilStart === 1) {
                startingIndex = startingIndex - arrayLengths[0];
                state.displayedPlayers = Object.values(state.players).splice(startingIndex, 10);
            } else if (arraysUntilStart === 2) {
                startingIndex = startingIndex - arrayLengths[0] - arrayLengths[1];
                state.displayedTeams = Object.values(state.teams).splice(startingIndex, 10);
            } else {
                startingIndex = startingIndex - arrayLengths[0] - arrayLengths[1] - arrayLengths[2];
                state.displayedTournaments = Object.values(state.tournaments).splice(startingIndex,  10);
            }
        } else {
            while (numResults < 10) {
                if (arraysUntilStart === 0) {
                    state.displayedGames = Object.values(state.games).splice(startingIndex, startingIndex + numLeftToGrab);
                } else if (arraysUntilStart === 1) {
                    state.displayedPlayers = Object.values(state.players).splice(startingIndex, startingIndex + numLeftToGrab);
                } else if (arraysUntilStart === 2) {
                    state.displayedTeams = Object.values(state.teams).splice(startingIndex, startingIndex + numLeftToGrab);
                } else if (arraysUntilStart ===3) {
                    state.displayedTournaments = Object.values(state.tournaments).splice(startingIndex, startingIndex + numLeftToGrab);
                }
                startingIndex = 0;
                numResults = Object.keys(state.displayedGames).length + Object.keys(state.displayedPlayers).length +
                    Object.keys(state.displayedTeams).length + Object.keys(state.displayedTournaments).length;
                numLeftToGrab = 10 - numResults;
                arraysUntilStart++;
            }
        }
        return state;
    }


    highlightAllKeywords(state) {
        let games = Object.values(state.results);
        let grid = [];
        let grid2 = [];
        let grid3 = [];
        let grid4 = [];
        let individual_words = state.temp.split(" ");

        for(let i = 0; i < Math.ceil(Object.keys(state.results).length); i++){
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
                                state.temp = individual_words[word_position];
                                if(i === 0)
                                {
                                    if(part[part_of_part].name !== null)
                                        part[part_of_part].name = part[part_of_part].name.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].summary !== null)
                                        part[part_of_part].summary = part[part_of_part].summary.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].release_date !== null)
                                        part[part_of_part].release_date = part[part_of_part].release_date.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].sample_players !== null)
                                        part[part_of_part].sample_players = part[part_of_part].sample_players.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].sample_teams !== null)
                                        part[part_of_part].sample_teams = part[part_of_part].sample_teams.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                }
                                if(i === 1)
                                {
                                    if(part[part_of_part].tag !== null)
                                        part[part_of_part].tag = part[part_of_part].tag.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].first_name !== null)
                                        part[part_of_part].first_name = part[part_of_part].first_name.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].last_name !== null)
                                        part[part_of_part].last_name = part[part_of_part].last_name.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].role !== null)
                                        part[part_of_part].role = part[part_of_part].role.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].hometown !== null)
                                        part[part_of_part].hometown = part[part_of_part].hometown.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].current_game !== null)
                                        part[part_of_part].current_game = part[part_of_part].current_game.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].current_team !== null)
                                        part[part_of_part].current_team = part[part_of_part].current_team.replace(new RegExp(state.temp, 'gi'),state.temp.bold());

                                }
                                if(i === 2)
                                {
                                    if(part[part_of_part].name !== null)
                                        part[part_of_part].name = part[part_of_part].name.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].acronym !== null)
                                        part[part_of_part].acronym = part[part_of_part].acronym.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].current_players !== null)
                                        part[part_of_part].current_players = part[part_of_part].current_players.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].current_game !== null)
                                        part[part_of_part].current_game = part[part_of_part].current_game.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                }
                                if(i === 3)
                                {
                                    if(part[part_of_part].slug !== null)
                                        part[part_of_part].slug = part[part_of_part].slug.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].name !== null)
                                        part[part_of_part].name = part[part_of_part].name.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].begin_at !== null)
                                        part[part_of_part].begin_at = part[part_of_part].begin_at.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].end_at !== null)
                                        part[part_of_part].end_at = part[part_of_part].end_at.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].game !== null)
                                        part[part_of_part].game = part[part_of_part].game.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                    if(part[part_of_part].teams !== null)
                                        part[part_of_part].teams = part[part_of_part].teams.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
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

        state.games = grid;
        state.players = grid2;
        state.teams = grid3;
        state.tournaments = grid4;
        return state;
    }

    render() {
        if(typeof this.props.match.params.id === "undefined")
            return(
                <div>
                    <Navbar/>
                    <h1 className="page-title">Please use the search bar!</h1>
                </div>
            );
        if(this.props.match.params.id === null || this.props.match.params.id.trim() === "")
            return(
                <div>
                    <Navbar/>
                    <h1 className="page-title">Please use enter at least one nonempty search word!</h1>
                </div>
            );
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
                    [ (Object.keys(this.state.games).length >= 1 || Object.keys(this.state.players).length >=1
                        || Object.keys(this.state.teams).length >=1 || Object.keys(this.state.tournaments).length >= 1 ?
                            <div className="container">
                                <Pagination
                                    numberOfPages={this.state.numberOfPages}
                                    onClick={this.updatePage}
                                />
                                {this.state.displayedGames.map((item, index) => (
                                    <GameRow values={item} key={index}/>
                                ))}
                                {this.state.displayedPlayers.map((item, index) => (
                                    <GamePlayer values={item} key={index}/>
                                ))}
                                {this.state.displayedTeams.map((item, index) => (
                                    <GameTeam values={item} key={index}/>
                                ))}
                                {this.state.displayedTournaments.map((item, index) => (
                                    <GameTournament values={item} key={index}/>
                                ))}

                            </div>
                            :
                            <div className="no-search-results">Oh no! No results were found for your search.
                                Please try making your search less specific or searching for a different term.
                            </div>
                      )
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

