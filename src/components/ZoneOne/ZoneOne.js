import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

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
  }
  


  handleExploration() {
      let randomNumber = Math.floor(Math.random() * 100);
      if(randomNumber <= 15) {
        this.setState({eventRedirect: true});
      } else if(randomNumber > 15 && randomNumber <= 90) {
        this.setState({combatRedirect: true});
      } else if(randomNumber > 90 && randomNumber <= 98) {
        console.log(`Find Loot`);
      } else {
        console.log(`Find Epic Loot`);
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
      </div>
    );
  }
}


export default ZoneOne;
