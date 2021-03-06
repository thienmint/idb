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
                            <img src={Rachel} className="img-fluid circle" alt=""/>
                        </div>
                        <div className="details">
                            <p>Currently a software engineering intern at Blackbaud. She will be graduating in Winter 2017 with
                                a B.S.A. in Computer Science before joining the Blackbaud team full-time in January. </p>
                            <b>Responsibilities:</b>
                            <p>Frontend</p>
                            <div><b>Number of Commits:</b> 153</div>
                            <div><b>Number of Issues:</b> 31</div>
                            <div><b>Number of Unit Tests:</b> 0</div>
                        </div>
                    </div>
                    <div className="col">
                        <h1 className="name">Persia Ghaffari</h1>
                        <div className="thumbnail">
                            <img src={Persia} className="img-fluid circle" alt=""/>
                        </div>
                        <div className="details">
                            <p> Has a job in the gaming industry and programmed for hidden achievement where her team
                                won Best Overall Game at the Intel Game Developers Showcase. She also hosts Super Smash Bro tournments on Friday.
                                She will be graduating in Winter of 2017 with a B.S.A in Computer Science. </p>
                            <b>Responsibilities:</b>
                            <p>Scrum Stuff, Backend</p>
                            <div><b>Number of Commits:</b> 75</div>
                            <div><b>Number of Issues:</b> 36</div>
                            <div><b>Number of Unit Tests:</b> 45</div>
                        </div>
                    </div>
                    <div className="col">
                        <h1 className="name">Kevin Zhang</h1>
                        <div className="thumbnail">
                            <img src={Kevin} className="img-fluid circle" alt=""/>
                        </div>
                        <div className="details">
                            <p>Kevin Zhang likes to spend his free time working on personal projects and practicing technical interviews.
                               He is extremely passionate about graphics. He will be graduating in Spring 2019. </p>
                            <b>Responsibilities:</b>
                            <p>Database, Backend</p>
                            <div><b>Number of Commits:</b> 32</div>
                            <div><b>Number of Issues:</b> 28</div>
                            <div><b>Number of Unit Tests:</b> 0</div>
                        </div>
                    </div>
                </div>
                <div className="row align-self-start team-members">
                    <div className="col">
                        <h1 className="name">Thien Q Vo</h1>
                        <div className="thumbnail">
                            <img src={Thien} className="img-fluid circle" alt=""/>
                        </div>
                        <div className="details">
                            <p>Thien is a passionate and ambitious developer.
                                When he's not playing video games or cooking, he would spend hours making small utility apps.
                                He will be graduating in May, 2017.
                            </p>
                            <b>Responsibilities:</b>
                            <p>Database, Platform, Backend</p>
                            <div><b>Number of Commits:</b> 200</div>
                            <div><b>Number of Issues:</b> 23</div>
                            <div><b>Number of Unit Tests:</b> 0</div>
                        </div>
                    </div>
                    <div className="col">
                        <h1 className="name">Eric Liu</h1>
                        <div className="thumbnail">
                            <img src={Eric} className="img-fluid circle" alt=""/>
                        </div>
                        <div className="details">
                            <p>Eric Liu will be graduating in spring of 2019.</p>
                            <b>Responsibilities:</b>
                            <p>Frontend</p>
                            <div><b>Number of Commits:</b> 88</div>
                            <div><b>Number of Issues:</b> 33</div>
                            <div><b>Number of Unit Tests:</b> 10</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutTeam;
