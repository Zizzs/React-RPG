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
        <div id="statsPanel">
            <div>
                <p>Character: {props.state.character.name}</p>
            </div>
            <div>
                <p>Level: {props.state.character.level}</p>
            </div>
            <div>
                <p>Strength: {props.state.character.strength}</p>
            </div>
            <div>
                <p>Agility: {props.state.character.agility}</p>
            </div>
            <div>
                <p>Intellect: {props.state.character.intellect}</p>
            </div>
        </div>
        <div>

        </div>
        <div>
            <div>
                
            </div>
        </div>
      </div>
    );
}

export default connect(mapStateToProps)(MainPanel);
