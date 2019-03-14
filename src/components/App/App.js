import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import Help from '../Help/Help';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import CreateCharacter from '../CreateCharacter/CreateCharacter';
import Wrapper from '../Wrapper/Wrapper';


import './App.css';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/createcharacter" component={CreateCharacter}/>
            <Route path="/main" component={Wrapper}/>
            <Route path="/help" component={Help}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
    }
}

export default connect()(App);
