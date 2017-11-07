import React, { Component } from 'react';
import './navbar.css';

export class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            numberOfPages: 3,
        }
    }

    render() {
        let pages = [];
        for (let i = 0; i < this.state.numberOfPages; i++) {
            pages.push(
                <li><a className="page-link" onClick={this.props.onClick(i)} key={i}>{i+1}</a></li>
            )
        }
        console.log(pages);
        return (
            <nav>
                <ul className="pagination">
                    {pages}
                </ul>
            </nav>
        );
    }
}