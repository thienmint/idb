import React, { Component } from 'react';
import './../../pages/global.css'
import NotFound from './../../static/images/image-not-found.png'

class GridTournaments extends Component {
    render() {
        return (
            <div className="col">
                <div key={this.props.id}>
                    <div className="thumbnail">
                        <a href="">
                            <img className="img-fluid" src={NotFound} alt={this.props.value.slug}/>
                        </a>
                    </div>
                    <div className="attributes">
                        <div>Name: {this.props.value.name}</div>
                        <div>Slug: {this.props.value.slug}</div>
                        <div>Game: {this.props.value.game.name}</div>
                        <div>Teams: {Object.keys(this.props.value.teams).length}</div>
                        <div>Start Date: {this.props.value.begin_at}</div>
                        <div>End Date: {this.props.value.end_at}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GridTournaments;