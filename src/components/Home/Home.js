import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <p id="rpgHeader">Welcome to RPG Game</p>
        <div id="changeLog">
          <p>ChangeLog:</p>
          <ul>
            <li>Created new Navbar</li>
            <li>Set up Routing</li>
            <li>Created Home, CreateCharacter, HUB, and Navbar Components</li>
            <li>Created Main Panel, Wrapper, and Zone Components</li>
            <li>Added Create a Character functionality and Main Panel stats</li>
            <li>Added intro story in the HUB. Character must progress through the story before the Zones and Pylons are able to be accessed</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;