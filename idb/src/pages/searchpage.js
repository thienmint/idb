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
                if(stateCopy.numberOfPages > 0)
                {
                    let displayedValues = Object.assign({}, stateCopy);
                    let stateToDisplay = this.getTenResults(0, displayedValues);
                    stateCopy.displayedGames = stateToDisplay.displayedGames;
                    stateCopy.displayedPlayers = stateToDisplay.displayedPlayers;
                    stateCopy.displayedTeams = stateToDisplay.displayedTeams;
                    stateCopy.displayedTournaments = stateToDisplay.displayedTournaments;
                }
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
        let endOfGames = Object.keys(state.games).length;
        let endOfPlayers = Object.keys(state.players).length;
        let endOfTeams = Object.keys(state.teams).length;
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

            let startingLength = 0;
            startingLength += Object.keys(state.games).length;
            startingLength += Object.keys(state.players).length;
            startingLength += Object.keys(state.teams).length;
            startingLength += Object.keys(state.tournaments).length;

            if (startingLength > 0 && startingLength < 10){
                console.log("here ");
                console.log("startingLenght: " + startingLength);
                state.displayedGames = Object.values(state.games).splice(0, Object.keys(state.games).length);
                state.displayedPlayers = Object.values(state.players).splice(0, Object.keys(state.players).length);
                state.displayedTeams = Object.values(state.teams).splice(0, Object.keys(state.teams).length);
                state.displayedTournaments = Object.values(state.tournaments).splice(0, Object.keys(state.tournaments).length);

                return state;
            }

            while (numResults < 10) {
                if (arraysUntilStart === 0) {
                    state.displayedGames = Object.values(state.games).splice(startingIndex, startingIndex + numLeftToGrab);
                }

                if (arraysUntilStart === 1) {
                    state.displayedPlayers = Object.values(state.players).splice(startingIndex, startingIndex + numLeftToGrab);
                }

                if (arraysUntilStart === 2) {
                    state.displayedTeams = Object.values(state.teams).splice(startingIndex, startingIndex + numLeftToGrab);
                }

                if (arraysUntilStart === 3) {
                    state.displayedTournaments = Object.values(state.tournaments).splice(startingIndex, startingIndex + numLeftToGrab);
                    break; // If there are less than 10 elements in the array we want to get out of the loop
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
        let games_grid = [];
        let players_grid = [];
        let teams_grid = [];
        let tournaments_grid = [];
        let individual_words = state.temp.split(" ");

        for(let i = 0; i < Math.ceil(Object.keys(state.results).length); i++){
            let type_of_model_list = games.slice(i,i+1);

            for(let idx_model = 0; idx_model<type_of_model_list.length;idx_model++)
            {
                let row2 = type_of_model_list[idx_model];
                for(let _ = 0; _< row2.length; _++ )
                {
                    let model = row2.slice(_,_ + 1);
                    for(let attributes = 0; attributes < model.length; attributes++)
                    {
                        for(let word_position = 0; word_position< individual_words.length; word_position++)
                        {
                            state.temp = individual_words[word_position];
                            if(i === 0)
                            {
                                if(model[attributes].name !== null)
                                    model[attributes].name = model[attributes].name.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].summary !== null)
                                    model[attributes].summary = model[attributes].summary.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].release_date !== null)
                                    model[attributes].release_date = model[attributes].release_date.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].sample_players !== null)
                                    model[attributes].sample_players = model[attributes].sample_players.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].sample_teams !== null)
                                    model[attributes].sample_teams = model[attributes].sample_teams.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                            }
                            if(i === 1)
                            {
                                if(model[attributes].tag !== null)
                                    model[attributes].tag = model[attributes].tag.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].first_name !== null)
                                    model[attributes].first_name = model[attributes].first_name.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].last_name !== null)
                                    model[attributes].last_name = model[attributes].last_name.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].role !== null)
                                    model[attributes].role = model[attributes].role.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].hometown !== null)
                                    model[attributes].hometown = model[attributes].hometown.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].current_game !== null)
                                    model[attributes].current_game = model[attributes].current_game.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].current_team !== null)
                                    model[attributes].current_team = model[attributes].current_team.replace(new RegExp(state.temp, 'gi'),state.temp.bold());

                            }
                            if(i === 2)
                            {
                                if(model[attributes].name !== null)
                                    model[attributes].name = model[attributes].name.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].acronym !== null)
                                    model[attributes].acronym = model[attributes].acronym.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].current_players !== null)
                                    model[attributes].current_players = model[attributes].current_players.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].current_game !== null)
                                    model[attributes].current_game = model[attributes].current_game.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                            }
                            if(i === 3)
                            {
                                if(model[attributes].slug !== null)
                                    model[attributes].slug = model[attributes].slug.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].name !== null)
                                    model[attributes].name = model[attributes].name.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].begin_at !== null)
                                    model[attributes].begin_at = model[attributes].begin_at.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].end_at !== null)
                                    model[attributes].end_at = model[attributes].end_at.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].game !== null)
                                    model[attributes].game = model[attributes].game.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                                if(model[attributes].teams !== null)
                                    model[attributes].teams = model[attributes].teams.replace(new RegExp(state.temp, 'gi'),state.temp.bold());
                            }

                        }
                    }
                    if(i === 0)
                        games_grid.push(model);
                    if(i === 1)
                        players_grid.push(model);
                    if(i === 2)
                        teams_grid.push(model);
                    if(i === 3)
                        tournaments_grid.push(model);
                }
            }
        }

        state.games = games_grid;
        state.players = players_grid;
        state.teams = teams_grid;
        state.tournaments = tournaments_grid;
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
                    [ this.state.numberOfPages > 0 ?
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
        let players = [];
        players.push(
            row.map((player, index) => (
                React.createElement(GridPlayers, {value: player})
            ))
        );
        return (
            <div className="row align-items-start">
                {players}
            </div>
        );
    }
}
class GameTeam extends Component {
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

class GameTournament extends Component {
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
