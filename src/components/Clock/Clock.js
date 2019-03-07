import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';

import './Clock.css';

class Clock extends Component {
    constructor() {
        super()
        this.state={
            time: new Date()
        }
    }

    currentTime() {
        this.setState({
            time: new Date()
        });
    }

    componentWillMount() {
        setInterval(() => 
            this.currentTime(), 1000
        )
    }

    render() {
        console.log(this.state.time.valueOf()/60000);
        return (
        <div>
            {this.state.time.toLocaleTimeString()}
        </div>
        );
    }
}

export default Clock;
