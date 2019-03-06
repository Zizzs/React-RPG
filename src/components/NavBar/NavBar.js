import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';
import AuthButton from '../AuthButton/AuthButton';
import * as actions from '../../actions/actionCreator';
import './NavBar.css';


class NavBar extends Component {
  // componentWillMount() {
  //   let promise = new Promise((resolve, reject) => {
  //     console.log("Attempting User Retrieval");
  //     this.props.fetchUser();
  //     console.log("Finished User Retrieval");
  //     setTimeout(() => {
  //       resolve();
  //     }, 1000)
  //   });
  //   promise.then(() => {
  //     console.log("Attempting Character Retrieval");
  //     if(this.props. != false) {
  //       this.props.fetchCharacter(this.props.auth.uid);
  //       console.log("Finished Character Retrieval");
  //     }
  //   });
  // }

  render() {
    return (
      <div id='mainDiv'>
        <div>
          <p><NavLink className="mainLinks" to="/">Home</NavLink></p>
        </div>
        <div>
          <p><NavLink className="mainLinks" to="/createcharacter">Create a Character</NavLink></p>
        </div>
        <div>
          <p><NavLink className="mainLinks" to="/main/hub">Enter the HUB</NavLink></p>
        </div>
        <div>
          <AuthButton />
        </div>
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

export default connect(mapStateToProps, actions)(NavBar);
