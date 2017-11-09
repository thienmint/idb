import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';
import NotFound from './../../static/images/image-not-found.png'

class GridSearchGames extends Component {

    render() {

        return (
            <div className="row ">
                <div key={this.props.id}>

                    <div className="attributes">
                        <Link to={`/games/${this.props.value.id}`}>
                        <div> {this.props.value.name}</div>

                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default GridSearchGames;