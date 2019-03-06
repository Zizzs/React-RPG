import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreator';
import './CreateCharacter.css';

class CreateCharacter extends Component {
    
    componentWillMount() {
        this.props.fetchUser();
    }
    
    handleCharacterCreation = event => {
        event.preventDefault();
        const character = {
            createdCharacter: true,
            pylonAlpha: false,
            pylonBeta: false,
            pylonGamma: false,
            character: {
                name: event.target[0].value,
                enlightenment: 1,
                spark: 1,
                luminosity: 1,
                items: []
            }
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
            <p>After Creation, Enter the HUB</p>
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
