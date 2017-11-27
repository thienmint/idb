import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';

class PlayerRow extends Component {
    render() {
        return (
            <div className="row align-items-start">
                <div>
                    <div className="search-title">
                        <Link to={`/players/${this.props.value.id}`}>
                            <div><span dangerouslySetInnerHTML={{ __html: this.props.value.tag}}/> </div>

                        </Link>
                    </div>
                    <div>
                        First Name: <span dangerouslySetInnerHTML={{ __html: this.props.value.first_name + " "}}/> |
                        Last Name: <span dangerouslySetInnerHTML={{ __html: this.props.value.last_name + " "}}/> |
                        Role: <span dangerouslySetInnerHTML={{ __html: this.props.value.role + " "}}/> |
                        Hometown: <span dangerouslySetInnerHTML={{ __html: this.props.value.hometown + " "}}/> |
                        Current Game: <span dangerouslySetInnerHTML={{ __html: this.props.value.current_game + " "}}/> |
                        Current Team: <span dangerouslySetInnerHTML={{ __html: this.props.value.current_team }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlayerRow;