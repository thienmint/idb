import React, { Component } from 'react';
import Navbar from './../components/nav/navbar';
import AboutDetail from '../components/about/about-detail';
import AboutTeam from '../components/about/about-team';
import AboutTools from '../components/about/about-tools';

class About extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <AboutDetail/>
                <hr/>
                <AboutTeam/>
                <AboutTools/>
            </div>
        );
    }
}

export default About;
