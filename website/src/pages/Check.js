import './Register.css'
import {React, useState, useEffect} from "react"
import ReactScrollableList from 'react-scrollable-list'

function Check() {
    const [name, setName] = useState("")
    const [file, setFile] = useState({'Original':0})
    const [display, setDisplay] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        fetch("https://uu5i744ru7.execute-api.us-east-1.amazonaws.com/Prod/spotify-cleaning-bucket/Monthly-Output.json", {
            method: "GET"
        }).then(res => res.json()).then(data => setFile(data))
    }, [])

    const checkHandler = (event) => {
        if (name === "") {
            setDisplay([])
            setShow(false)
            return;
        }
        if (!(name in file)) {
            alert("Name not found")
            setShow(false)
            setDisplay([])
            return;
        }
        let temp = []
        for (let i = 0; i < file[name].length; i++) {
            temp.push({id: file[name][i], content: file[name][i]})
        }
        setDisplay(temp)
        setShow(true)
    }

    const renderItem = (index, key) => {
        return <p>{display[index]}</p>;
    }

    return (
        <div className="homepage-container">
            <div className="homepage-header"> Enter name </div>
            <div className='input'>
                <input type='text' className='input-text' autoFocus={true} onChange={e => setName(e.target.value)}></input>
            </div>
            <br></br>
            <button className="home-button" type="button" onClick={checkHandler}>
                Check
            </button>
            <br></br>
            <br></br>
            <div className='homepage-header'>{show ? "Songs to Remove" : ""}</div>
            <div>{show ? (<ReactScrollableList
                    listItems={display}
                    heightOfItem={30}
                    maxItemsToRender={20}
                    style={{color:'#333'}} />) : ""}</div>
            {/* <ReactScrollableList
                    listItems={display}
                    heightOfItem={30}
                    maxItemsToRender={20}
                    style={{color:'#333'}} /> */}
            {/* <div className='homepage-text'>{show ? (display.length === 0 ? "Nothing to remove" : (
                
            )) : ""}</div> */}
        </div>
    );
}

export default Check;