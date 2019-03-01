import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import CreateCharacter from '../CreateCharacter/CreateCharacter';
import Wrapper from '../Wrapper/Wrapper';


import './App.css';

function App(props) {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/createcharacter" component={CreateCharacter}/>
            <Route path="/main" component={Wrapper}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
}

export default connect()(App);
