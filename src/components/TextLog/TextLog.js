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
    
    autoSave() {
        let newCount = this.state.count + 1;
        this.setState({count: newCount})
        let theKid = document.createElement("p");
        theKid.innerHTML = `You feel the tree pulse. (Save)`;
        let theParent = document.getElementById('textLogDiv');
        theParent.appendChild(theKid);
    }

    componentWillMount() {
        setInterval(() => 
            {this.currentTime();
            this.autoSave();
            this.updateScroll();}, 60000
        )
    }

    render() {
        return (
        <div id="mainTextLogDiv">
           <div id="textLogDiv">
            
           </div>
        </div>
        );
    }
}

export default TextLog;