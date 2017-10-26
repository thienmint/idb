import React, { Component } from 'react';
import './../../pages/global.css';
import { Link } from 'react-router-dom';

import NotFound from './../../static/images/image-not-found.png'

class GridPlayers extends Component {
    render() {
        return (
            <div className="col">
            { this.props.value ?
                <div key={this.props.value.id}>
                    <div className="thumbnail">
                        <Link  to={`/players/${this.props.value.id}`}>
                            {this.props.value.image_url &&
                            <img className="img-fluid" src={this.props.value.image_url} alt={this.props.value.name}/>
                            }
                            {!this.props.value.image_url &&
                            <img className="img-fluid" src={NotFound} alt={this.props.value.name}/>
                            }
                        </Link>
                    </div>
                    <div className="attributes">
                        <div>Tag: {this.props.value.tag}</div>
                        <div>Real name: {this.props.value.first_name} {this.props.value.last_name}</div>
                        <div>Game: <Link to={`/games/${this.props.value.current_game.id}`}> {this.props.value.current_game.name}</Link></div>
                        <div>Team: <Link to={`/teams/${this.props.value.current_team.id}`}>{this.props.value.current_team.name}</Link></div>
                        <div>Hometown: {this.props.value.hometown}</div>
                    </div>
                </div>
            : <div>Waiting for API</div> }
            </div>
        );
    }
}

export default GridPlayers;
