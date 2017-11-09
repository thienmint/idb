import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridGames from "../components/grid-details/gridSearch";
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
                        // console.log(part);
                        grid.push(part);
                        
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
