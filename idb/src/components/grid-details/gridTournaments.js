import React, { Component } from 'react';
import './../../pages/global.css'

class GridTournaments extends Component {
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
                        <div>Name: {this.props.value.name}</div>
                        <div>Game: {this.props.value.game}</div>
                        <div>City: {this.props.city}</div>
                        <div>Teams: {this.props.value.teams}</div>
                        <div>Winner: {this.props.value.winner}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GridTournaments;