import React, { Component } from 'react';
import { signIn, signOut } from '../../actions/actionCreator';
import { connect } from 'react-redux';


class AuthButton extends Component {
    render() {
        return (
        <div >
            <button onClick={this.props.signIn}>Log In</button>
            <button onClick={this.props.signOut}>Log Out</button>
        </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, { signIn, signOut })(AuthButton);