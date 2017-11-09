import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';
import NotFound from './../../static/images/image-not-found.png'

class GridSearchGames extends Component {

    render() {

        return (
            <div className="row ">
                <div key={this.props.id}>

                    <div className="search-title">
                        <Link to={`/games/${this.props.value.id}`}>
                        <div> {this.props.value.name}</div>

                        </Link>

                    </div>
                    <div>
                            Release Date: {this.props.value.release_date + " "} 
                            Summary: {this.props.value.summary}

                    </div>
                </div>
            </div>
        );
    }
}

export default GridSearchGames;