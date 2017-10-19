import React, { Component } from 'react';
import './../../pages/global.css'

class GridGames extends Component {
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
                        <div>Year Published: {this.props.value.year}</div>
                        <div>Company: {this.props.value.company}</div>
                        <div>Genre: {this.props.genre}</div>
                        <div>Current Champion: {this.props.value.champion}</div>
                        <div>Teams: {this.props.value.teams}</div>
                        <div>Tournaments: {this.props.value.tournaments}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GridGames;