import React, {Component} from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GameRow from "../components/search-details/GameRow"
import PlayerRow from "../components/search-details/PlayerRow"
import TeamRow from "../components/search-details/TeamRow"
import TournamentRow from "../components/search-details/TournamentRow"

import {DotLoader} from 'react-spinners';
import {Pagination} from "../components/nav/pagination";

import HighlightKeywords from './helpers/HighlightKeywords'
import SliceResults from './helpers/SliceResults'

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
            displayedTournaments: [],
            dataLength: []
        };

        let apiurl = 'http://api.esportguru.com/';

        if (typeof this.props.match.params.id !== "undefined" && this.props.match.params.id !== null && this.props.match.params.id.trim() !== "")
            axios.get(apiurl + 'search/'+ this.props.match.params.id).then((response) => {
                let stateCopy = Object.assign({}, this.state);
                stateCopy.results = Object.assign({}, response.data);
                stateCopy.loading = false;
                stateCopy.temp = this.props.match.params.id;

                let highlightedState = HighlightKeywords.boldKeywords(Object.assign({}, stateCopy));

                stateCopy.games = highlightedState.games;
                stateCopy.players = highlightedState.players;
                stateCopy.teams = highlightedState.teams;
                stateCopy.tournaments = highlightedState.tournaments;

                stateCopy.dataLength = highlightedState.dataLength;
                stateCopy.numberOfPages = Math.ceil(stateCopy.dataLength.reduce((a,b) => a + b, 0) / 10);

                console.log("Number of pages = " + stateCopy.numberOfPages);
                let displayState = SliceResults.getResults(Object.assign({}, stateCopy), stateCopy.numberOfPages & 1);
                stateCopy.displayedGames = displayState.displayedGames;
                stateCopy.displayedPlayers = displayState.displayedPlayers;
                stateCopy.displayedTeams = displayState.displayedTeams;
                stateCopy.displayedTournaments = displayState.displayedTournaments;
                this.setState(stateCopy);
            }).catch(function (error) {
                console.log(error);
            });

        this.handlePage = this.handlePage.bind(this);
    }

    handlePage(page) {
        let stateCopy = Object.assign({}, this.state);
        let stateToBeDisplayed = SliceResults.getResults(stateCopy, page+1);
        this.setState(stateToBeDisplayed);
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
                            <div className="container" key={this.state.numberOfPages}>
                                <Pagination
                                    numberOfPages={this.state.numberOfPages}
                                    onClick={this.handlePage}
                                />
                                {this.state.displayedGames.map((item, index) => (
                                    <GameRow value={item} key={index}/>
                                ))}
                                {this.state.displayedPlayers.map((item, index) => (
                                    <PlayerRow value={item} key={index}/>
                                ))}
                                {this.state.displayedTeams.map((item, index) => (
                                    <TeamRow value={item} key={index}/>
                                ))}
                                {this.state.displayedTournaments.map((item, index) => (
                                    <TournamentRow value={item} key={index}/>
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