import React, { Component } from 'react';
import './../../pages/global.css';
import { Link } from 'react-router-dom';
import NotFound from './../../static/images/image-not-found.png'

class GridTeams extends Component {
    render() {
        return (
            <div className="col">
                <div key={this.props.id}>
                    <div className="thumbnail">
                        <Link to={`/teams/${this.props.value.id}`}>
                            {this.props.value.image_url &&
                            <img className="img-fluid" src={this.props.value.image_url} alt={this.props.value.name}/>
                            }
                            {!this.props.value.image_url &&
                            <img className="img-fluid" src={NotFound} alt={this.props.value.name}/>
                            }
                            </Link>
                    </div>
                    <div className="attributes">
                        <div>Name: {this.props.value.name}</div>
                        {this.props.value.current_game ?
                            <div>Current Game: <Link to={`/games/${this.props.value.current_game.id}`}>{this.props.value.current_game.name}</Link></div> :
                            <div>Current Game: None found</div>}
                        {this.props.value.current_players[0] !== undefined ?
                            <div>Current Players: <Link to={`/players/${this.props.value.current_players[0].id}`}>{this.props.value.current_players[0].tag}</Link></div> :
                            <div>Current Players: None found</div>}
                        <div>Acronym: {this.props.value.acronym}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GridTeams;
