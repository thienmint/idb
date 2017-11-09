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
                        <div> <text dangerouslySetInnerHTML={{ __html: this.props.value.slug}}/></div>

                        </Link>

                    </div>
                    <div>
                            Name: <text dangerouslySetInnerHTML={{ __html: this.props.value.name + " "}}/>
                            Start Time: <text dangerouslySetInnerHTML={{ __html: this.props.value.begin_at + " "}}/>
                            End Time: <text dangerouslySetInnerHTML={{ __html: this.props.value.end_at }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default GridSearchTournaments;