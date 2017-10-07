import React, { Component } from 'react';
import './../../pages/global.css'

class GridPlayers extends Component {
    render() {
        return (
            <div className="col">
            <div key={this.props.id}>
                <div className="thumbnail">
                    <a href="">
                        <img className="img-fluid" src={this.props.value.image_url} alt={this.props.value.name}/>
                    </a>
                </div>
                <div className="attributes">
                    <div>Tag: {this.props.value.tag}</div>
                    <div>Real name: {this.props.value.name}</div>
                    <div>Game: <a href="">{this.props.value.current_videogame}</a></div>
                    <div>Team: <a href="">{this.props.value.current_team}</a></div>
                    <div>Hometown: {this.props.value.hometown}</div>
                </div>
            </div>
            </div>
        );
    }
}

export default GridPlayers;
