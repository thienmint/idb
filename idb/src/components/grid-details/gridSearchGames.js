import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';

class GridSearchGames extends Component {

    render() {

        return (
            <div className="row ">
                <div key={this.props.id}>

                    <div className="search-title">
                        <Link to={`/games/${this.props.value.id}`}>
                        <div><text dangerouslySetInnerHTML={{ __html: this.props.value.name}}/></div>

                        </Link>

                    </div>
                    <div>
                            Release Date: {this.props.value.release_date + " "} 
                            Sample Players: <text dangerouslySetInnerHTML={{ __html: this.props.value.sample_players + " "}}/>
                            Sample Teams: <text dangerouslySetInnerHTML={{ __html: this.props.value.sample_teams + " "}}/>
                            Summary: <text dangerouslySetInnerHTML={{ __html: this.props.value.summary }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default GridSearchGames;