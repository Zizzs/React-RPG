import React, { Component } from 'react';
import { signIn, signOut } from '../../actions/actionCreator';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom" 
import Clock from '../Clock/Clock';
import * as actions from '../../actions/actionCreator';
import './AuthButton.css';


class AuthButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoggedIn: false,
            hasCreatedACharacter: false,
            count: 0
        }
        this.signUserIn = this.signUserIn.bind(this);
        this.signUserOut = this.signUserOut.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
    }
    
    signUserIn() {
        this.props.signIn();
        this.setState({hasLoggedIn: true});
        setTimeout(() => this.checkUser(), 750);
    }

    checkLoggedIn() {
        console.log("Checking User");
        if (this.state.hasLoggedIn === false) {
            this.checkUser();
        }
    }

    checkUser() {
        console.log("Checked User");
        if(this.props.auth) {
            this.setState({hasLoggedIn: true});
        } else if (this.props.auth === false && this.state.hasLoggedIn === true){
            let promise = new Promise((resolve, reject) => {
                console.log("Attempting User Retrieval");
                this.props.fetchUser();
                console.log("Finished User Retrieval");
                this.setState({hasLoggedIn: true});
                setTimeout(() => {
                resolve();
                }, 500)
            });
            if(this.props.character != false)
            promise.then(() => {
                console.log("Attempting Character Retrieval");
                this.props.fetchCharacter(this.props.auth.uid);
                console.log("Finished Character Retrieval");
                this.setState({hasCreatedACharacter: true});
            });
        }
    }

    signUserOut() {
        this.props.signOut();
        this.setState({hasLoggedIn: false, hasCreatedACharacter: false});
    }

    componentWillMount() {
        if(this.state.hasLoggedIn === true) {
            let promise = new Promise((resolve, reject) => {
                console.log("Attempting User Retrieval");
                this.props.fetchUser();
                console.log("Finished User Retrieval");
                setTimeout(() => {
                resolve();
                }, 500)
            });
            promise.then(() => {
                console.log("Attempting Character Retrieval");
                this.props.fetchCharacter(this.props.auth.uid);
                console.log("Finished Character Retrieval");
            });
        } else {
            setTimeout(() => this.checkLoggedIn(), 500);
        }
    }
    render() {
        return (
        <div id="authButtonDiv">
            <div>
                <p>{this.state.hasLoggedIn === true && this.props.character === false && <NavLink className="mainLinks" to="/createcharacter">Create a Character</NavLink>}</p>
            </div>
            <div>
                <p>{this.state.hasLoggedIn === true && this.props.character != false && <NavLink className="mainLinks" to="/main/hub">Enter the HUB</NavLink>}</p>
            </div>
            <div>
                <button onClick={this.signUserIn}>Log In</button>
            </div>
            <div>
                <button onClick={this.signUserOut}>Log Out</button>
            </div>
            <div>
                <p>{this.props.auth && this.props.auth.email}</p>
            </div>
            <div>
                <Clock updateCount={this.updateCount}/>
            </div>
        </div>
        );
    }
}

function mapStateToProps({ auth, character }) {
    character = Object.values(character)[0];
    return { auth, character };
}

export default connect(mapStateToProps, actions)(AuthButton);