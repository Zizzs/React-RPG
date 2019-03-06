import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';

import './MainPanel.css';

class MainPanel extends Component {
    
    render() {
        console.log(this.props);
        return (
        <div id="mainPanel">
            <div id="statsPanel">
                <div>
                    <p>Character: {this.props.character.name}</p>
                </div>
                <div>
                    <p>Enlightenment Level: {this.props.character.enlightenment}</p>
                </div>
                <div>
                    <p>Spark: {this.props.character.spark}</p>
                </div>
                <div>
                    <p>Luminosity: {this.props.character.luminosity}</p>
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
}

const mapStateToProps = ({ character, auth }) => {
    character = Object.values(character)[0];
    return {
        character,
        auth
    }
  }

export default connect(mapStateToProps)(MainPanel);
