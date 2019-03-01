import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';

import './MainPanel.css';

const mapStateToProps = state => {
    return {
      state: state
    };
};

function MainPanel(props) {
    console.log(props.state);
    return (
      <div id="mainPanel">
        <p>This is the Main Panel</p>
        <p>Character: {props.state.character.name}</p>
        <p><NavLink to="/main/HUB">Back to HUB</NavLink></p>
      </div>
    );
}

export default connect(mapStateToProps)(MainPanel);
