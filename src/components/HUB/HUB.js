import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';

import './HUB.css';

const mapStateToProps = state => {
    return {
      state: state
    };
};

function HUB(props) {
    
    function handleText(event) {
        const {dispatch} = props;
        event.preventDefault();
        const action = {
            type: 'PROGRESS_INTRO'
        }
        dispatch(action);
    }

    return (
      <div>
          <div>
            <p><NavLink className="hubLinks" to="/main/Zone">To Zone</NavLink></p>
          </div>
          <div>
            <div>
                <p id="mainHubHeader">The HUB</p>
            </div>
            <div id="imageDiv">
                Image Goes Here
            </div>
            <div>
                {props.state.introText===0 && 
                <p className="introText">You open your eyes for the first time, the blue light blinds you momentarily. You find yourself standing on what appears to be a blue disk. In the center you see a shimmering blue tree. All around you are halos of light, in which you can make out details of what lies beyond.</p>}
                {props.state.introText===0 && 
                <p className="introText">A voice fills your consciousness. "Hello... young one..." </p>}
                {props.state.introText===1 &&
                <p className="introText">You look around to find the source of the voice.... The tree pulses...</p>}
                {props.state.introText===2 &&
                <p className="introText">"You... are one of many... children..." you hear as the tree pulses in unison with the voice.</p>}
                {props.state.introText===2 &&
                <p className="introText">"Children? Where am I?... What... am I?" you think to yourself.</p>}
                {props.state.introText===3 &&
                <p className="introText">The thundering voice rises in your head. "You are mine... I am yours... We are together as one.... I am the Tree of Light, and I am ...dying..."</p>}
                {props.state.introText===4 &&
                <p className="introText">"The.... last of my.... light.... has been used to.... create you. "</p>}
                {props.state.introText===4 &&
                <p className="introText">"Seek... for... the relics.... of my.... creators...."</p>}
                {props.state.introText===4 &&
                <p className="introText">"Bring..... them...... back..."</p>}
                {props.state.introText===5 &&
                <p className="introText">Around the tree, 3 pylons materialize out of the shimmering light surrounding the tree. You move towards the tree. Within the pylons, you can see an indentation within each, a spot for a relic.</p>}
                {props.state.introText===5 &&
                <p className="introText">The tree lightly pulses, but you hear nothing but a whisper... "Save..... us..."</p>}
            </div>
            {props.state.introText > 5 &&
            <div id="pylonDiv">
                <div>
                    <p>Pylon Alpha</p>
                </div>
                <div>
                    <p>Pylon Beta</p>
                </div>
                <div>
                    <p>Pylon Gamma</p>
                </div>
            </div>}
            {props.state.introText <=5 && 
            <div>
                <form onSubmit={handleText}>
                    <button>Next</button>
                </form>
            </div>}
          </div>
      </div>
    );
}

export default connect(mapStateToProps)(HUB);
