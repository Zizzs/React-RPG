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
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;