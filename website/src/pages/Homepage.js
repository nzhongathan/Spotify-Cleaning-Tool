import './Homepage.css'
import {Link} from 'react-router-dom'
import React from "react"

function Homepage() {
    return (
        <div className="homepage-container">
            <div className="homepage-header"> Spotify Playlist Cleaner </div>
            <div className="homepage-text">Enter your data in and check back on Monday of every week for updates!</div>
            <Link to="/Info">
                <button className="home-button">
                    Click here to start!
                </button>
            </Link>
            <br></br>
            <br></br>
            <Link to="/Check">
                <button className="home-button">
                    Already Registered?
                </button>
            </Link>
        </div>
    );
}

export default Homepage;