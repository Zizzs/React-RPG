import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 

import './ZoneOneEvent.css';

export default function ZoneOneEvent(props) {
    console.log(props);
    return (
        <div>
            <p>ZoneOneEvent!</p>
            <p><NavLink to='/main/ZoneOne'>Back</NavLink></p>
        </div>
    );
}

