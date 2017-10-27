import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './about.css'

class AboutDetail extends Component {
    render() {
        return (
            <div>
                <h1 className="page-title">About</h1>
                <hr/>
                <div>
                    <div className="container description">
                        <p>This site is used to gather information about the ESports scene for all existing games as well as the
                            relevant players and teams that exist for each game. With the main goal of the site is to allow the average
                            player and the average viewer as well as the professional players to find out information about people who
                            specialize in the game as well as their achievements in said game along with what teams that they play for
                            and that exist within a game. It will mostly be used by players who want to learn more about the professional
                            scene of a certain game.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutDetail;
