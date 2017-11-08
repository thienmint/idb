import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';
import NotFound from './../../static/images/image-not-found.png'

class GridSearch extends Component {
    render() {
        return (
            <div className="col">
                <div key={this.props.id}>

                    <div className="attributes">
                        <div> {this.props.value.name}</div>
                       
                    </div>
                </div>
            </div>
        );
    }
}

export default GridSearch;