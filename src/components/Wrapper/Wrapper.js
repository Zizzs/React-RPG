import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreator';

import HUB from '../HUB/HUB';
import ZoneOne from '../ZoneOne/ZoneOne';
import MainPanel from '../MainPanel/MainPanel';
import ZoneOneCombat from '../ZoneOneCombat/ZoneOneCombat';
import ZoneOneEvent from '../ZoneOneEvent/ZoneOneEvent';

import './Wrapper.css';

class Wrapper extends Component {

  componentWillMount() {
    this.props.fetchUser();
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
        </Switch>
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
export default connect(mapStateToProps, actions)(Wrapper);