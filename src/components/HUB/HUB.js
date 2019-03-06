import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';

import './HUB.css';


class HUB extends Component {
    constructor(props) {
        super(props);

        this.handleText = this.handleText.bind(this);
    }
    handleText(event) {
        const {dispatch} = this.props;
        event.preventDefault();
        let characterKey = Object.keys(this.props.character);
        //let tempState = this.props.character[characterKey];
        const action = {
            type: 'PROGRESS_INTRO',
            state: this.props.character
        }
        dispatch(action);
    }

    render() {
        console.log(this.props);
        return (
        <div>
            <div>
                {this.props.character.introText > 5 && <p><NavLink className="hubLinks" to="/main/ZoneOne">Shimmering Wasteland</NavLink></p>}
            </div>
            <div>
                <div>
                    <p id="mainHubHeader">The HUB</p>
                </div>
                <div id="imageDiv">
                    Image Goes Here
                </div>
                <div>
                    {this.props.character.introText===0 && 
                    <p className="introText">You open your eyes for the first time, the blue light blinds you momentarily. You find yourself standing on what appears to be a blue disk. In the center you see a shimmering blue tree. All around you are halos of light, in which you can make out details of what lies beyond.</p>}
                    {this.props.character.introText===0 && 
                    <p className="introText">A voice fills your consciousness. "Hello... young one..." </p>}
                    {this.props.character.introText===1 &&
                    <p className="introText">You look around to find the source of the voice.... The tree pulses...</p>}
                    {this.props.character.introText===2 &&
                    <p className="introText">"You... are one of many... children..." you hear as the tree pulses in unison with the voice.</p>}
                    {this.props.character.introText===2 &&
                    <p className="introText">"Children? Where am I?... What... am I?" you think to yourself.</p>}
                    {this.props.character.introText===3 &&
                    <p className="introText">The thundering voice rises in your head. "You are mine... I am yours... We are together as one.... I am the Tree of Light, and I am ...dying..."</p>}
                    {this.props.character.introText===4 &&
                    <p className="introText">"The.... last of my.... light.... has been used to.... create you. "</p>}
                    {this.props.character.introText===4 &&
                    <p className="introText">"Seek... for... the relics.... of my.... creators...."</p>}
                    {this.props.character.introText===4 &&
                    <p className="introText">"Bring..... them...... back..."</p>}
                    {this.props.character.introText===5 &&
                    <p className="introText">Around the tree, 3 pylons materialize out of the shimmering light surrounding the tree. You move towards the tree. Within the pylons, you can see an indentation within each, a spot for a relic.</p>}
                    {this.props.character.introText===5 &&
                    <p className="introText">The tree lightly pulses, but you hear nothing but a whisper... "Save..... us..."</p>}
                </div>
                {this.props.character.introText > 5 &&
                <div id="pylonDiv">
                    <div>
                        <p>Pylon Alpha</p>
                        {!this.props.character.pylonAlpha && <p className="pylonDescription">Dormant</p>}
                    </div>
                    <div>
                        <p>Pylon Beta</p>
                        {!this.props.character.pylonBeta && <p className="pylonDescription">Dormant</p>}
                    </div>
                    <div>
                        <p>Pylon Gamma</p>
                        {!this.props.character.pylonGamma && <p className="pylonDescription">Dormant</p>}
                    </div>
                </div>}
                {this.props.character.introText <=5 && 
                <div>
                    <form onSubmit={this.handleText}>
                        <button>Next</button>
                    </form>
                </div>}
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

export default connect(mapStateToProps)(HUB);
