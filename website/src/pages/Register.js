import './Register.css'
import {Link} from 'react-router-dom'
import {React, useState} from "react"

function Homepage() {
    const [name, setName] = useState("")
    const [clientId, setClientId] = useState("")
    const [clientSecret, setClientSecret] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [playlistId, setPlaylistId] = useState("")

    const submitHandler = (event) => {
        if (name === "" || clientId === "" || clientSecret === "" || refreshToken === "" || playlistId === "" || name.includes("_")) {
            alert("Invalid field(s)")
            return;
        }
        fetch("https://uu5i744ru7.execute-api.us-east-1.amazonaws.com/Prod/spotify-cleaning-bucket/" + name + ".json", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                    'Name': name,
                    'App Token': btoa(clientId + ":" + clientSecret),
                    'Refresh Token': refreshToken,
                    'Playlist Id': playlistId,
                    'Songs': {}
                })
        })
    }

    return (
        <div className="homepage-container">
            <div className="homepage-header"> Input your info </div>
            <div className='input'>
                <div className="homepage-text">Name:</div>   
                <input type='text' className='input-text' autoFocus={true} onChange={e => setName(e.target.value)}></input>
            </div>
            <div className='input'>
                <div className="homepage-text">Client Id:</div>   
                <input type='text' className='input-text' autoFocus={true} onChange={e => setClientId(e.target.value)}></input>
            </div>
            <div className='input'>
                <div className="homepage-text">Client Secret:</div>   
                <input type='text' className='input-text' autoFocus={true} onChange={e => setClientSecret(e.target.value)}></input>
            </div>
            <div className='input'>
                <div className="homepage-text">Refresh Token:</div>   
                <input type='text' className='input-text' autoFocus={true} onChange={e => setRefreshToken(e.target.value)}></input>
            </div>
            <div className='input'>
                <div className="homepage-text">Playlist Id:</div>   
                <input type='text' className='input-text' autoFocus={true} onChange={e => setPlaylistId(e.target.value)}></input>
            </div>
            <Link to="/End">
                <button className="home-button" type="button" onClick={submitHandler}>
                    Good?
                </button>
            </Link>
        </div>
    );
}

export default Homepage;