import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';

class GameRow extends Component {
    render() {
        return (
            <div className="row align-items-start">
                <div>
                    <div className="search-title">
                        <Link to={`/games/${this.props.value.id}`}>
                            <div><span dangerouslySetInnerHTML={{ __html: this.props.value.name}}/></div>
                        </Link>
                    </div>
                    <div>
                        Release Date:<span dangerouslySetInnerHTML={{ __html: this.props.value.release_date + " "}}/> |
                        Current Players: <span dangerouslySetInnerHTML={{ __html: this.props.value.sample_players + " "}}/> |
                        Current Teams: <span dangerouslySetInnerHTML={{ __html: this.props.value.sample_teams + " "}}/> |
                        Summary: <span dangerouslySetInnerHTML={{ __html: this.props.value.summary }}/> |
                    </div>
                </div>
            </div>
        );
    }
}

export default GameRow;