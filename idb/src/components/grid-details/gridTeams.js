import React, { Component } from 'react';
import './../../pages/global.css'
import NotFound from './../../static/images/image-not-found.png'

class GridTeams extends Component {
    render() {
        return (
            <div className="col">
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
                        <div>Name: {this.props.value.name}</div>
                        {this.props.value.current_game ?
                            <div>Current Game: {this.props.value.current_game.name}</div> :
                            <div>Current Game: None found</div>}
                        {this.props.value.current_players[0] !== undefined ?
                            <div>Current Players: {this.props.value.current_players[0].tag}</div> :
                            <div>Current Players: None found</div>}
                        <div>Acronym: {this.props.value.acronym}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GridTeams;

/* acronym:"GV"
current_game:{id: 1, name: "League of Legends"}
current_players:[]
id:9
image_url:"https://pandacdn.blob.core.windows.net/cdn/uploads/gravity-fg1nz3w2.png"
name: "Gravity"*/