import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 

import './ZoneOneCombat.css';

export default function ZoneOneCombat(props) {
    console.log(props);
    return (
        <div>
            <p>ZoneOneCombat!</p>
            <p><NavLink to='/main/ZoneOne'>Back</NavLink></p>
        </div>
    );
}

