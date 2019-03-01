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
                <p>Enlightenment Level: {props.state.character.enlightenment}</p>
            </div>
            <div>
                <p>Spark: {props.state.character.spark}</p>
            </div>
            <div>
                <p>Luminosity: {props.state.character.luminosity}</p>
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
