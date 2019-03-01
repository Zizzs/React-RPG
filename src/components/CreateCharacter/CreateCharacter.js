import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';

import './CreateCharacter.css';

function CreateCharacter(props) {
    console.log(props);
    let _name = null;

    function handleCharacterCreation(event) {
        const {dispatch} = props;
        event.preventDefault();
        const action ={
            type: 'CREATE_CHARACTER',
            name: _name.value
        };
        dispatch(action);
        _name.value ='';
    }

    return (
      <div>
        <p id="characterCreationHeader">Character Creation</p>
        <form onSubmit={handleCharacterCreation}>
            <input
                type='text'
                id='name'
                placeholder='Enter Character Name Here'
                ref={(input) => {_name = input;}}/>
            <button type='submit'>Create Character</button>
        </form>
        <NavLink to="/main/HUB">Enter the HUB</NavLink>
      </div>
    );
}

export default connect()(CreateCharacter);
