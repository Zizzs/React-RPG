import React, { Component } from 'react';
import { signIn, signOut } from '../../actions/actionCreator';
import { connect } from 'react-redux';
import './AuthButton.css';


class AuthButton extends Component {
    render() {
        return (
        <div id="authButtonDiv">
            <div>
                <button onClick={this.props.signIn}>Log In</button>
            </div>
            <div>
                <button onClick={this.props.signOut}>Log Out</button>
            </div>
            <div>
                <p>{this.props.auth && this.props.auth.email}</p>
            </div>
        </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, { signIn, signOut })(AuthButton);