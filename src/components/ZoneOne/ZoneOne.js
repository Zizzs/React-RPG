import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreator';
import createItem from '../../items/itemGeneration';
import './ZoneOne.css';

class ZoneOne extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      combatRedirect: false,
      eventRedirect: false,
      zoneOneRoute: "/main/ZoneOne"
    };

    this.handleExploration = this.handleExploration.bind(this);
    this.findLoot = this.findLoot.bind(this);
    this.findEpicLoot = this.findEpicLoot.bind(this);
    this.generateItem = this.generateItem.bind(this);
  }
  


  handleExploration() {
      let randomNumber = Math.floor(Math.random() * 100);
      if(randomNumber <= 20) {
        this.setState({eventRedirect: true});
      } else if(randomNumber > 20 && randomNumber <= 80) {
        this.setState({combatRedirect: true});
      } else if(randomNumber > 80 && randomNumber <= 98) {
        this.findLoot();
      } else {
        this.findEpicLoot();
      }
  }

  renderCombatRedirect() {
    if(this.state.combatRedirect) {
      return <Redirect to='/main/ZoneOneCombat' />
    }
  }

  renderEventRedirect() {
    if(this.state.eventRedirect) {
      return <Redirect to='/main/ZoneOneEvent' />
    }
  }

  generateItem(enlightenment) {
    let item = createItem(enlightenment);
    let character = this.props.character;
    if(character.items === undefined || character.items === false) {
        character.items = []
    }
    character.items.push(item);
    console.log(character);
}

  findLoot() {
    // Text Output
    let lootDiv = document.getElementById("eventOutput");
    let itemLoot = 0;

    //Generate Loot
    let loot = Math.floor(Math.random() * (100 - 25 + 1) + 25);
    let randomNumber = Math.floor(Math.random() * 100);
    console.log(`You rolled a ${randomNumber} to find loot.`)
    if(randomNumber >= 66) {
      this.generateItem(this.props.character.enlightenment);
      itemLoot = 1;
    }

    // Give Loot to Character
    this.props.character.unboundFragments += loot;

    // Loot Text
    if(itemLoot === 0) {
      lootDiv.innerHTML = `Got ${loot} Fragments!`;
    } else if (itemLoot === 1) {
      lootDiv.innerHTML = `Got ${loot} Fragments and an item!`;
    }

    // Saving Character
    let character = this.props.character;
    const { saveCharacter, auth, characterId } = this.props;
    saveCharacter(character, auth.uid, characterId);
  }

  findEpicLoot() {
    let loot = Math.floor(Math.random() * (1000 - 500 + 1) + 500);
    this.props.character.unboundFragments += loot;
    let lootDiv = document.getElementById("eventOutput");
    lootDiv.innerHTML = `Got ${loot} Fragments! Nice!`;
    let character = this.props.character;
    const { saveCharacter, auth, characterId } = this.props;
    saveCharacter(character, auth.uid, characterId);
  }

  render () {
    return (
      <div id="zoneOneDiv">
        {this.renderCombatRedirect()}
        {this.renderEventRedirect()}
        <div>
          <p id="zoneOneHeader">The Shimmering Wasteland</p>
          <p id="zoneOneDescription">After exiting the portal, the light hits you. Large structures of crystals tower above you, as far as the eye can see. Forests, Mountains.... Creatures.... All made of a clear shimmering crystal.</p>
        </div>
        <div id="imageDiv">
            Image Goes Here
        </div>
        <div>
          <p onClick={this.handleExploration} id="zoneOneExplore">Explore The Crystal Forest</p>
        </div>
        <div id="eventOutput">

        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ character, auth }) => {
  let characterId = Object.keys(character)[0];
  character = Object.values(character)[0];

  return {
      character,
      characterId,
      auth
  }
}

export default connect(mapStateToProps, actions)(ZoneOne);
