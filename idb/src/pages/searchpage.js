import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'
import axios from 'axios';

import GridGames from "../components/grid-details/gridGames";
import { DotLoader } from 'react-spinners';

export default class SearchPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            games: [],
            loading: true,
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'games').then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.games = stateCopy.games.slice();
            stateCopy.games = Object.assign({}, response.data);
            stateCopy.loading = false;

            // console.log(stateCopy.games);
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let numRows = Math.ceil(Object.keys(this.state.games).length / 3);
        let games = Object.values(this.state.games);
        let grid = [];
        let row2 = [];
        let temp = 0;

        for(let i = 0; i < Math.ceil(Object.keys(this.state.games).length); i++){
               let row = games.splice(0,1);
               console.log(row[0]);
                if(row[0].name.includes("Overwatch"))
                {
                    row2.push.apply(row2, row);
                    temp++;
                }
  
                if( temp == 3)
                {
                    grid.push(row2);
                    row2 = [];
                    temp -=3;
                }
        }
        if(temp != 0)
        {
            grid.push(row2);
        }
        console.log(grid);
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
