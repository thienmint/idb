import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';
import NotFound from './../../static/images/image-not-found.png'

class GridSearchTournaments extends Component {

    render() {

        return (
            <div className="row ">
                <div key={this.props.id}>

                    <div className="search-title">
                        <Link to={`/tournaments/${this.props.value.id}`}>
                        <div> {this.props.value.slug}</div>

                        </Link>

                    </div>
                    <div>
                            Name: {this.props.value.name + " "} 
                            Start Time: {this.props.value.begin_at+ " "}
                            End Time: {this.props.value.end_at+" "}
                    </div>
                </div>
            </div>
        );
    }
}

export default GridSearchTournaments;