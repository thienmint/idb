import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import './global.css'

class Page404 extends Component {
    render() {
        return (
            <div>
                <Navbar/>
              	<h1 className="page-title-top">404 page</h1>
              	<hr/>
                <div className = "detail-rows"> The item you have requested has not been found. </div>
            </div>
        );
    }
}

export default Page404;