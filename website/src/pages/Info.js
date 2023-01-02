import './Info.css'
import {Link} from 'react-router-dom'
import clientCode  from "../pictures/clientCodes.jpg";
import url from "../pictures/url.jpg"
import React from "react"

function Homepage() {
    return (
        <div className="homepage-container">
            <div className="homepage-header"> Getting Started </div>
            <div className="homepage-subheader">Client Id and Client Secret</div>
            <div className="homepage-textt">Found in your Spotify Developer Account</div>
            <br></br>
            <div className="homepage-subheader">Refresh Token</div>
            <div className="homepage-textt">Type the following into your web browser and replace the necessary parts</div>
            <div className="homepage-url">https://accounts.spotify.com/authorize?response_type=code&client_id=$CLIENT_ID&scope=user-read-recently-played playlist-read-private&redirect_uri=$REDIRECT_URI</div>
            <div className="homepage-textt">Copy the code from the URL you were redirected to and open your terminal and run this command (Linux) </div>
            <div className="homepage-url">curl -d client_id=$CLIENT_ID -d client_secret=$CLIENT_SECRET -d grant_type=authorization_code -d code=$CODE -d redirect_uri=$REDIRECT_URI https://accounts.spotify.com/api/token</div>
            <br></br>
            <div className="homepage-subheader">Playlist Id</div>
            <div className="homepage-textt">Find the link of the playlist and it will be there</div>
            <div className="homepage-url">https://open.spotify.com/playlist/PLAYLIST_ID</div>
            <br></br>
            <Link to="/Register">
                <button className="home-button">
                    Ready?
                </button>
            </Link>
        </div>
    );
}

export default Homepage;