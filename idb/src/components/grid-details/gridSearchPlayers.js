import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';

class GridSearchPlayers extends Component {

    render() {
        return (
            <div className="row ">
                <div key={this.props.id}>

                    <div className="search-title">
                        <Link to={`/players/${this.props.value.id}`}>
                           <div><text dangerouslySetInnerHTML={{ __html: this.props.value.tag}}/> </div>

                        </Link>
                    </div>
                    <div>
                            First Name: <text dangerouslySetInnerHTML={{ __html: this.props.value.first_name + " "}}/>
                            Last Name: <text dangerouslySetInnerHTML={{ __html: this.props.value.last_name + " "}}/>
                            Role: <text dangerouslySetInnerHTML={{ __html: this.props.value.role + " "}}/>
                            Hometown: <text dangerouslySetInnerHTML={{ __html: this.props.value.hometown + " "}}/>
                            Current Game: <text dangerouslySetInnerHTML={{ __html: this.props.value.current_game + " "}}/>
                            Current Team: <text dangerouslySetInnerHTML={{ __html: this.props.value.current_team }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default GridSearchPlayers;