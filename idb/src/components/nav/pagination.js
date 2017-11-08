import React, { Component } from 'react';
import './navbar.css';

export class Pagination extends Component {

    render() {
        return (
            <nav>
                <ul className="pagination">
                    <PaginationBoxes
                        numberOfPages={this.props.numberOfPages}
                        onClick={this.props.onClick}/>
                </ul>
            </nav>
        );
    }
}

class PaginationBoxes extends Component {

    render() {
        let pages = [];
        for (let i = 0; i < this.props.numberOfPages; i++) {
            pages.push(
                <li key={i}><a className="page-link" onClick={this.props.onClick.bind(this, i)} >{i+1}</a></li>
            )
        }
        return <div>
            {pages}
        </div>
    }
}