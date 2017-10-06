import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './about.css';
import '../../pages/global.css'

import Rachel from './../../static/images/Rachel-Head-Shot.jpg'
import Persia from './../../static/images/Persia-Head-Shot.jpg'
import Eric from './../../static/images/Eric-Head-Shot.jpg'
import Kevin from './../../static/images/Kevin-Head-Shot.jpg'
import Thien from './../../static/images/Thien-Head-Shot.jpg'

class AboutTeam extends Component {
    render() {
        return (
            <div className="container team-members">
                <div className="row align-self-top">
                    <div className="col">
                        <h1 className="name">Rachel Beale</h1>
                        <div className="thumbnail">
                            <img src={Rachel} className="img-fluid circle"/>
                        </div>
                        <div className="details">
                            <p>Currently a software engineering intern at Blackbaud. She will be graduating in Winter 2017 with
                                a B.S.A. in Computer Science before joining the Blackbaud team full-time in January. </p>
                            <b>Responsibilities:</b>
                            <p>Frontend</p>
                            <div><b>Number of Commits:</b> 106</div>
                            <div><b>Number of Issues:</b> 107</div>
                            <div><b>Number of Unit Tests:</b> 108</div>
                        </div>
                    </div>
                    <div className="col">
                        <h1 className="name">Persia Ghaffari</h1>
                        <div className="thumbnail">
                            <img src={Persia} className="img-fluid circle"/>
                        </div>
                        <div className="details">
                            <p>Is looking to get a job in the gaming industry and programmed for hidden achievement where her team
                                won Best Overall Game at the Intel Game Developers Showcase. She also hosts Super Smash Bro tournments on Friday.
                                She will be graduating in Winter of 2017 with a B.S.A in Computer Science. </p>
                            <b>Responsibilities:</b>
                            <p>Scrum Stuff, Backend</p>
                            <div><b>Number of Commits:</b> 109</div>
                            <div><b>Number of Issues:</b> 110</div>
                            <div><b>Number of Unit Tests:</b> 111</div>
                        </div>
                    </div>
                    <div className="col">
                        <h1 className="name">Kevin Zhang</h1>
                        <div className="thumbnail">
                            <img src={Kevin} className="img-fluid circle"/>
                        </div>
                        <div className="details">
                            <p>Kevin Zhang likes to spend his free time working on personal projects and practicing technical interviews.
                                He is efficient in Swift and has developed iOS app(s). He will be graduating in Spring 2019. </p>
                            <b>Responsibilities:</b>
                            <p>Database, Backend</p>
                            <div><b>Number of Commits:</b> 112</div>
                            <div><b>Number of Issues:</b> 113</div>
                            <div><b>Number of Unit Tests:</b> 114</div>
                        </div>
                    </div>
                </div>
                <div className="row align-self-start team-members">
                    <div className="col">
                        <h1 className="name">Thien Q Vo</h1>
                        <div className="thumbnail">
                            <img src={Thien} className="img-fluid circle"/>
                        </div>
                        <div className="details">
                            <p>Thien is an avid gamer who also like to spend time doing coding challenges on HackerRank.
                                He will be graduating in 2017-2018.</p>
                            <b>Responsibilities:</b>
                            <p>Database, Platform</p>
                            <div><b>Number of Commits:</b> 115</div>
                            <div><b>Number of Issues:</b> 116</div>
                            <div><b>Number of Unit Tests:</b> 117</div>
                        </div>
                    </div>
                    <div className="col">
                        <h1 className="name">Eric Liu</h1>
                        <div className="thumbnail">
                            <img src={Eric} className="img-fluid circle"/>
                        </div>
                        <div className="details">
                            <p>Eric Liu will be graduating in spring of 2019.</p>
                            <b>Responsibilities:</b>
                            <p>Frontend</p>
                            <div><b>Number of Commits:</b> 118</div>
                            <div><b>Number of Issues:</b> 119</div>
                            <div><b>Number of Unit Tests:</b> 120</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutTeam;
