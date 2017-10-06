import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './about.css'

class AboutTools extends Component {
    render() {
        return (
            <div className="col center">
                <h1 className="name">Other Information</h1>
                <div className="details">
                <div><b>Number of Commits:</b> 515</div>
                <div><b>Number of Issues:</b> 520</div>
                <div><b>Number of Unit Tests:</b> 525</div>
                <br/>
                <div><a href="http://docs.bealerj2260.apiary.io/#"> Apiary API </a></div>
                <div><a href="https://github.com/bealerj2260/idb"> Github Repo </a></div>
                <div><a href="https://trello.com/b/kwxUEWxn/website-development"> Trello </a></div>
                <br/>
                <p><b> Data Sources</b></p>
                <div><a href="https://api.pandascore.co/rest"> Pandascore API</a></div>
                <div><a href="https://api.challonge.com/v1"> Challonge API</a></div>
                <br/>
                <div>We utilized the python modules requests and json to extract data from our chosen external APIs,
                PandaScore and IGDB respectfully. For the player, tournament, and team models, we used the PandaScore's
                API, while for the game model, we used IGDB's API. For each model, we used the REST Get function to
                retrieve a JSON string, converted it into a python JSON object, and then parsed through the JSON to
                retrieve values. Once we had the respective values, we inserted them as records into each of their
                respective tables in our database.</div>
                <br/>
                <b>Tools</b>
                <br/>
                <div><b>BootStrap</b> was used to find templates for our frontend.</div>
                <div><b>Apiary</b> was used to document our APIs.</div>
                <div><b>Github</b> was used for version control.</div>
                <div><b>Flask</b> is our mirco web framework that we used for back-end routing.</div>
                <div><b>Google Cloud Platform</b> was used to hold our website.</div>
                <div><b>Slack</b> was used for group communication.</div>
                <div><b>Trello</b> was used for issue tracking.</div>
                <div><b>PlanItPoker</b> was used to help estimate tasks.</div>
                <br/>
                    <a className="nav-link tech-report" href="https://utexas.box.com/s/4i6sws9tbudzfpzjzmn9p3h97pcrphm7">Technical Report</a>
                </div>
            </div>
        );
    }
}

export default AboutTools;
