import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';

class GridSearchTeams extends Component {

    render() {
        return (
            <div className="row ">
                <div key={this.props.id}>

                    <div className="search-title">
                        <Link to={`/teams/${this.props.value.id}`}>
                            <div> <text dangerouslySetInnerHTML={{ __html: this.props.value.name}}/></div>
                        </Link>
                    </div>
                    <div>
                            Acronym: <text dangerouslySetInnerHTML={{ __html: this.props.value.acronym + " "}}/>
                            Current Players: <text dangerouslySetInnerHTML={{ __html: this.props.value.current_players + " "}}/>
                            Current Game: <text dangerouslySetInnerHTML={{ __html: this.props.value.current_game}}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default GridSearchTeams;