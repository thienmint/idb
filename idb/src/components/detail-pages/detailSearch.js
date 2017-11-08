import React, { Component } from 'react';
import Navbar from './../nav/navbar';
import './../../pages/global.css'
import './detail.css'
import axios from 'axios';
import NotFound from './../../static/images/image-not-found.png'
import { Link } from 'react-router-dom';

export default class DetailSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            game: {}
        };

        let apiurl = 'http://api.esportguru.com/';
        axios.get(apiurl + 'search/' + this.props.match.params.id).then((response) => {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.game = Object.assign({}, response.data);
            this.setState(stateCopy);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                {this.state.game &&
                <div className="row">
                    <div className="card offset-2 col-8">
                        <div className="card-block">
                            <h1 className="col-12">{this.state.game.name}</h1>

                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Name</div>
                                <div className="col-4 lists detail-columns">{this.state.game.name}</div>
                            </div>

                            {this.state.game.website &&
                            <div className="row align-items-start">
                                <div className="col-4 offset-2 labels lists">Websites</div>
                                    <div className="col-4 lists detail-columns">
                                        {this.state.game.website.map((site, index) => (
                                            <div><a href={site}>{site}</a></div>
                                        ))}
                                    </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}