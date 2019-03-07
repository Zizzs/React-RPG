import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';

import './TextLog.css';

class TextLog extends Component {
    constructor() {
        super()
        this.state={
            time: new Date(),
            count: 0
        }
    }

    currentTime() {
        this.setState({
            time: new Date()
        });
    }

    updateScroll() {
        let element = document.getElementById("textLogDiv");
        element.scrollTop = element.scrollHeight;
    }
    
    postToText() {
        let newCount = this.state.count + 1;
        this.setState({count: newCount})
        let theKid = document.createElement("p");
        theKid.innerHTML = `Pulse at ${this.state.count}`;
        let theParent = document.getElementById('prependThis');
        theParent.insertBefore(theKid, theParent.lastChild);
    }

    componentWillMount() {
        setInterval(() => 
            {this.currentTime();
            this.postToText();
            this.updateScroll();}, 1000
        )
    }

    render() {
        return (
        <div id="mainTextLogDiv">
           <div id="textLogDiv">
            <p id="prependThis">.</p>
           </div>
        </div>
        );
    }
}

export default TextLog;