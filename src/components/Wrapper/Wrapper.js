import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreator';

import HUB from '../HUB/HUB';
import ZoneOne from '../ZoneOne/ZoneOne';
import MainPanel from '../MainPanel/MainPanel';
import ZoneOneCombat from '../ZoneOneCombat/ZoneOneCombat';
import ZoneOneEvent from '../ZoneOneEvent/ZoneOneEvent';
import TextLog from '../TextLog/TextLog';
import Inventory from '../Inventory/Inventory';

import { createStore } from 'redux'; 
import './Wrapper.css';

class Wrapper extends Component {

  componentWillMount() {
    new Promise((resolve, reject) => {
      console.log("Attempting User Retrieval");
      this.props.fetchUser();
      console.log("Finished User Retrieval");
      setTimeout(() => resolve(this.props.auth.uid), 500);
    }).then((result) => {
      console.log("Attempting Character Retrieval");
      this.props.fetchCharacter(result);
      console.log("Finished Character Retrieval");
    });

  }

  render() {
    return (
      <div>
        <MainPanel />
        <Switch>
            <Route path="/main/HUB" component={HUB}/>
            <Route path="/main/ZoneOne" component={ZoneOne}/>
            <Route path="/main/ZoneOneCombat" component={ZoneOneCombat}/>
            <Route path="/main/ZoneOneEvent" component={ZoneOneEvent}/>
            <Route path="/main/Inventory" component={Inventory}/>
        </Switch>
        <TextLog />
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

export default connect(mapStateToProps, actions)(Wrapper);