import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreator';
import './CreateCharacter.css';
import { NavLink } from "react-router-dom" 

class CreateCharacter extends Component {
    
    componentWillMount() {
        this.props.fetchUser();
        console.log(this.props);
    }
    
    handleCharacterCreation = event => {
        event.preventDefault();
        const character = {
            introText: 0,
            createdCharacter: true,
            pylonAlpha: false,
            pylonBeta: false,
            pylonGamma: false,
            name: event.target[0].value,
            enlightenment: 1,
            spark: 5,
            luminosity: 5,
            energy: 50,
            boundFragments: 0,
            unboundFragments: 0,
            maxEnergy: 50,
            items: false,
            equippedItem: {name: "", spark: 0, energy: 0, luminosity: 0},
            hasEquippedItem: false,
            bankItems: false,
            bankSlots: 0,
            
        }
        const { createCharacter, auth } = this.props;
        createCharacter(character, auth.uid);
    }
    render() {
        return (
        <div>
            <p id="characterCreationHeader">Character Creation</p>
            <form onSubmit={this.handleCharacterCreation}>
                <input
                    type='text'
                    id='name'
                    placeholder='Enter Character Name Here'
                    />
                <button type='submit'>Create Character</button>
            </form>
            <p><NavLink to="/main/hub">Enter the HUB</NavLink></p>
        </div>
        );
    }
}

const mapStateToProps = ({ character, auth }) => {
    return {
        character,
        auth
    }
}

export default connect(mapStateToProps, actions)(CreateCharacter);
