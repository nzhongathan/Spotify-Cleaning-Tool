import './Homepage.css'
import {Link} from 'react-router-dom'
import React from "react"

function Homepage() {
    return (
        <div className="homepage-container">
            <div className="homepage-header"> Thanks! </div>
            <Link to="/">
                <button className="home-button">
                    Restart?
                </button>
            </Link>
        </div>
    );
}

export default Homepage;