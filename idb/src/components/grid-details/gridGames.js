import React, { Component } from 'react';
import './../../pages/global.css'
import { Link } from 'react-router-dom';
import NotFound from './../../static/images/image-not-found.png'

class GridGames extends Component {
    render() {
        return (
            <div className="col">
                <div key={this.props.id}>
                    <div className="thumbnail">
                        <Link to={`/games/${this.props.value.id}`}>
                            {this.props.value.screenshots &&
                            <img className="img-fluid" src={this.props.value.screenshots[0]} alt={this.props.value.name}/>
                            }
                            {!this.props.value.screenshots &&
                            <img className="img-fluid" src={NotFound} alt={this.props.value.name}/>
                            }
                        </Link>
                    </div>
                    <div className="attributes">
                        <div>Name: {this.props.value.name}</div>
                        <div>Summary: {this.props.value.summary}</div>
                        <div>Release Date: {this.props.release_date}</div>
                        <div>Websites: <Link to={this.props.value.website[0]}>{this.props.value.website[0]}</Link></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GridGames;