import React, { Component } from 'react';
import './../../pages/global.css'

import NotFound from './../../static/images/image-not-found.png'

class GridPlayers extends Component {
    render() {
        return (
            <div className="col">
            { this.props.value ?
                <div key={this.props.id}>
                    <div className="thumbnail">
                        <a href="">
                            {this.props.value.image_url &&
                            <img className="img-fluid" src={this.props.value.image_url} alt={this.props.value.name}/>
                            }
                            {!this.props.value.image_url &&
                            <img className="img-fluid" src={NotFound} alt={this.props.value.name}/>
                            }
                        </a>
                    </div>
                    <div className="attributes">
                        <div>Tag: {this.props.value.tag}</div>
                        <div>Real name: {this.props.value.first_name} {this.props.value.last_name}</div>
                        <div>Game: <a href="">{this.props.value.current_game.name}</a></div>
                        <div>Team: <a href="">{this.props.value.current_team.name}</a></div>
                        <div>Hometown: {this.props.value.hometown}</div>
                    </div>
                </div>
            : <div>Waiting for API</div> }
            </div>
        );
    }
}

export default GridPlayers;
