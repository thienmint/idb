import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';

class TeamRow extends Component {
    render() {
        return (
            <div className="row align-items-start">
                <div>
                    <div className="search-title">
                        <Link to={`/teams/${this.props.value.id}`}>
                            <div> <span dangerouslySetInnerHTML={{ __html: this.props.value.name}}/></div>
                        </Link>
                    </div>
                    <div>
                        Acronym: <span dangerouslySetInnerHTML={{ __html: this.props.value.acronym + " "}}/> |
                        Current Players: <span dangerouslySetInnerHTML={{ __html: this.props.value.current_players + " "}}/> |
                        Current Game: <span dangerouslySetInnerHTML={{ __html: this.props.value.current_game}}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default TeamRow;