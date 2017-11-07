import React, { Component } from 'react';
import './navbar.css';

export class Pagination extends Component {
    render() {
        return (
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    <li><a className="page-link" href="#">1</a></li>
                    <li><a className="page-link" href="#">2</a></li>
                    <li><a className="page-link" href="#">3</a></li>
                    <li>
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}