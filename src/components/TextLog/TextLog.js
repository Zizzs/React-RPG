import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreator';
import './TextLog.css';

class TextLog extends Component {
    constructor() {
        super()
        this.state={
            time: new Date(),
            count: 0
        }
    }

    currentTime() {
        this.setState({
            time: new Date()
        });
    }

    updateScroll() {
        let element = document.getElementById("textLogDiv");
        element.scrollTop = element.scrollHeight;
    }
    
    autoSave() {
        //let newCount = this.state.count + 1;
        //this.setState({count: newCount})
        let theKid = document.createElement("p");
        console.log(this.props);
        theKid.innerHTML = `You feel the tree pulse. (Save)`;
        let theParent = document.getElementById('textLogDiv');
        theParent.appendChild(theKid);
        let character = this.props.character;
        const { saveCharacter, auth, characterId } = this.props;
        saveCharacter(character, auth.uid, characterId);
    }

    componentWillMount() {
        setInterval(() => 
            {this.currentTime();
            this.autoSave();
            this.updateScroll();}, 300000
        )
    }

    render() {
        return (
        <div id="mainTextLogDiv">
           <div id="textLogDiv">
            
           </div>
        </div>
        );
    }
}

const mapStateToProps = ({ character, auth }) => {
    let characterId = Object.keys(character)[0];
    character = Object.values(character)[0];

    return {
        character,
        characterId,
        auth
    }
  }

export default connect(mapStateToProps, actions)(TextLog);