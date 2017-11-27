import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';

class GameRow extends Component {
    render() {
            console.log(this.props.value);
        return (
            <div className="row align-items-start">
                <div>
                    <div className="search-title">
                        <Link to={`/games/${this.props.value.id}`}>
                            <div><text dangerouslySetInnerHTML={{ __html: this.props.value.name}}/></div>
                        </Link>
                    </div>
                    <div>
                        Release Date:<text dangerouslySetInnerHTML={{ __html: this.props.value.release_date + " "}}/>
                        Current Players: <text dangerouslySetInnerHTML={{ __html: this.props.value.sample_players + " "}}/>
                        Current Teams: <text dangerouslySetInnerHTML={{ __html: this.props.value.sample_teams + " "}}/>
                        Summary: <text dangerouslySetInnerHTML={{ __html: this.props.value.summary }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameRow;