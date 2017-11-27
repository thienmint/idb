import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';

class TournamentRow extends Component {
    render() {
        return (
            <div className="row align-items-start">
                <div>
                    <div className="search-title">
                        <Link to={`/tournaments/${this.props.value.id}`}>
                            <div> <span dangerouslySetInnerHTML={{ __html: this.props.value.slug}}/></div>
                        </Link>

                    </div>
                    <div>
                        Name: <span dangerouslySetInnerHTML={{ __html: this.props.value.name + " "}}/> |
                        Start Time: <span dangerouslySetInnerHTML={{ __html: this.props.value.begin_at + " "}}/> |
                        End Time: <span dangerouslySetInnerHTML={{ __html: this.props.value.end_at }}/> |
                        Game: <span dangerouslySetInnerHTML={{ __html: this.props.value.game }}/> |
                        Teams: <span dangerouslySetInnerHTML={{ __html: this.props.value.teams }}/>
                    </div>
                </div>}
            </div>
        );
    }
}

export default TournamentRow;