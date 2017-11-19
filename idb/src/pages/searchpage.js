import React, {Component} from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridGames from "../components/grid-details/gridSearchGames";
import GridPlayers from "../components/grid-details/gridSearchPlayers";
import GridTeams from "../components/grid-details/gridSearchTeams";
import GridTournaments from "../components/grid-details/gridSearchTournaments";

import {DotLoader} from 'react-spinners';
import {Pagination} from "../components/nav/pagination";

export default class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: {},
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
                // TODO this line is not nececssary?
                // stateCopy.results = stateCopy.results.slice();

                stateCopy.results = Object.assign({}, response.data);
                stateCopy.loading = false;
                stateCopy.temp = this.props.match.params.id;

                // Necessary to make copy so that we continue to keep the original data as is
                let highlightedState = SearchPage.boldKeywords(Object.assign({}, stateCopy));

                stateCopy.games = highlightedState.games;
                stateCopy.players = highlightedState.players;
                stateCopy.teams = highlightedState.teams;
                stateCopy.tournaments = highlightedState.tournaments;

                // TODO after refactor everything to simple array, we won't have to use Object.keys anymore
                stateCopy.numberOfPages = Math.ceil((Object.keys(stateCopy.games).length + Object.keys(stateCopy.players).length +
                    Object.keys(stateCopy.teams).length + Object.keys(stateCopy.tournaments).length) / 10);

                console.log("Number of pages = " + stateCopy.numberOfPages);
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
            if (srtInx > 0) {
                arraysUntilStart++;
            }
        }

        let arraysUntilEnd = 0;
        while (endInx > 0) {
            endInx = endInx - arrayLengths[arraysUntilEnd];
            if (endInx > 0) {
                arraysUntilEnd++;
            }
        }

        if (arraysUntilStart === arraysUntilEnd) {
            // TODO change this to switch case
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
                state.displayedTournaments = Object.values(state.tournaments).splice(startingIndex, 10);
            }
        } else {

            while (numResults < 10) {
                // TODO change this to switch case
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
                    break; // If there are less than 10 elements in the last array we want to get out of the loop
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

    /**
     * This method will take in the p1 grouping, which should be the found keyword, then it will wrap the found
     * keyword with <span id="keyword"> ... </span>
     * @param match The matched substring. (Corresponds to $& above.)
     * @param p1 The word that matches with one of the search keywords
     * @param offset The offset of the matched substring within the whole string being examined.
     * @param string The whole string being examined.
     */
    static regexReplaceFunction(match, p1, offset, string) {
        // console.log("p1 = " + p1.bold());
        // TODO convert this to <span> as specified above, keeping .bold() for backward compatibility for nwo
        return p1.bold();
    }


    /**
     * This is a simple contain check for null for a given search string. If it is not null, replace all regex's matches
     * with the value specified from regexReplaceFunction
     * @param resultString The given result string come from API
     * @param regex given RegExp object or string
     */
    static highlightKeywords(resultString, regex){
        if(resultString !== null){
            return resultString.replace(regex, SearchPage.regexReplaceFunction);
        }
        else
            return resultString;
    }

    /**
     * This method take in an array of items, each item is a dictionary of its attribute:values pairs.
     * @param array contain a number of items. Each item should be a dictionary with only simple alphanumeric type
     * @param regex given RegExp object or string
     */
    static boldData(array, regex) {
        for(let i = 0; i < array.length; i++){
            let item = array[i];
            for (let label in item) {
                if(item.hasOwnProperty(label)){
                    item[label] = SearchPage.highlightKeywords(String(item[label]), regex);
                }
            }
            // TODO this line is necessary for backward compatitbility, but will need to be taken out eventually
            array[i] = [item]
        }

        return array;
    }

    /**
     * Manipulate the given result data set to bold/highlight found words
     * This method specifically create the regex based on given search words by inserting OR logic in between each word
     * and combine all of it as one grouping. For example "a b c" will become "(a|b|c)"
     * @param state A copy of our the page current state with all the data in .results
     */
    static boldKeywords(state) {
        let results = state.results;
        // For each key word, we'll put an OR logic in between
        let regex = new RegExp("(" + state.temp.replace(/\s+/gi,"|") + ")", "gi");
        state.games = SearchPage.boldData(results.games, regex);
        state.players = SearchPage.boldData(results.players, regex);
        state.teams = SearchPage.boldData(results.teams, regex);
        state.tournaments = SearchPage.boldData(results.tournaments, regex);
        console.log(state.players);
        return state
    }

    render() {
        if (typeof this.props.match.params.id === "undefined")
            return (
                <div>
                    <Navbar/>
                    <h1 className="page-title">Please use the search bar!</h1>
                </div>
            );
        if (this.props.match.params.id === null || this.props.match.params.id.trim() === "")
            return (
                <div>
                    <Navbar/>
                    <h1 className="page-title">Please use enter at least one nonempty search word!</h1>
                </div>
            );
        console.log("Return from rendering now");

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

