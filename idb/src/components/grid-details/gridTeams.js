import React, { Component } from 'react';
import './../../pages/global.css'

class GridTeams extends Component {
    render() {
        return (
            <div className="col">
                <div key={this.props.id}>
                    <div className="thumbnail">
                        <a href="">
                            <img className="img-fluid" src={this.props.value.logo_url} alt={this.props.value.name}/>
                        </a>
                    </div>
                    <div className="attributes">
                        <div>Name: {this.props.value.name}</div>
                        <div>Games: {this.props.value.games}</div>
                        <div>Roster: {this.props.roster}</div>
                        <div>Date founded: {this.props.value.date}</div>
                        <div>Championships: {this.props.value.championships}</div>
                        <div>Location: {this.props.value.location}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GridTeams;