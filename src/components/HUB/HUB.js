import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 

import './HUB.css';

class HUB extends Component {
  render() {
    return (
      <div>
        <p id="mainHubHeader">The HUB</p>
        <p><NavLink to="/main/Zone">To Zone</NavLink></p>
      </div>
    );
  }
}

export default HUB;
