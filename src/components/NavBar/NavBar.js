import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';

import './NavBar.css';

const mapStateToProps = state => {
  return {
    state: state
  };
};

function NavBar(props) {
    return (
      <div id='mainDiv'>
        <div>
          <p><NavLink className="mainLinks" to="/">Home</NavLink></p>
        </div>
        <div>
          {!props.state.createdCharacter && <p><NavLink className="mainLinks" to="/createcharacter">Create a Character</NavLink></p>}
          {props.state.createdCharacter && <p><NavLink className="mainLinks" to="/main/hub">Enter the HUB</NavLink></p>}
        </div>
      </div>
    );
}

export default connect(mapStateToProps)(NavBar);
