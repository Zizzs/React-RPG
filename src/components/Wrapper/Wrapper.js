import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import HUB from '../HUB/HUB';
import Zone from '../Zone/Zone';

import MainPanel from '../MainPanel/MainPanel';
import './Wrapper.css';

class Wrapper extends Component {
  render() {
    return (
      <div>
        <MainPanel />
        <Switch>
            <Route path="/main/HUB" component={HUB}/>
            <Route path="/main/Zone" component={Zone}/>
        </Switch>
      </div>
    );
  }
}

export default Wrapper;
