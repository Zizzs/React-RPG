import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div id='mainDiv'>
        <div>
          <p><NavLink className="mainLinks" to="/">Home</NavLink></p>
        </div>
        <div>
          <p><NavLink className="mainLinks" to="/createcharacter">Create a Character</NavLink></p>
        </div>
      </div>
    );
  }
}

export default NavBar;
