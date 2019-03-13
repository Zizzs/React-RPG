import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreator';
import createItem from '../../items/itemGeneration';
import { NavLink } from "react-router-dom" 

import './ZoneOneEvent.css';

class ZoneOneEvent extends Component {
    constructor(props) {
        super(props);
        this.determineEvent = this.determineEvent.bind(this);
        this.getItem = this.getItem.bind(this);
        this.getFragments = this.getFragments.bind(this);
        this.getSpark = this.getSpark.bind(this);
        this.getLuminosity = this.getLuminosity.bind(this);
        this.getEnergy = this.getEnergy.bind(this);
        this.state = {
            eventOne: {
                reward: "Default"
            },
            eventTwo: {
                reward: "Default"
            },
            eventCompleted: false
        }
    }


    determineEvent() {
        let firstEventNumber = Math.floor(Math.random() * 5);
        let secondEventNumber = Math.floor(Math.random() * 5);

        if(firstEventNumber === 0) {
            let event = this.state.eventOne;
            event.reward = "Fragments";
            this.setState({eventOne: event});
        } else if (firstEventNumber === 1) {
            let event = this.state.eventOne;
            event.reward = "Item";
            this.setState({eventOne: event});
        } else if (firstEventNumber === 2) {
            let event = this.state.eventOne;
            event.reward = "Energy";
            this.setState({eventOne: event});
        } else if (firstEventNumber === 3) {
            let event = this.state.eventOne;
            event.reward = "Spark";
            this.setState({eventOne: event});
        } else if (firstEventNumber === 4) {
            let event = this.state.eventOne;
            event.reward = "Luminosity";
            this.setState({eventOne: event});
        }

        if(secondEventNumber === 0) {
            let event = this.state.eventTwo;
            event.reward = "Fragments";
            this.setState({eventTwo: event});
        } else if (secondEventNumber === 1) {
            let event = this.state.eventTwo;
            event.reward = "Item";
            this.setState({eventTwo: event});
        } else if (secondEventNumber === 2) {
            let event = this.state.eventTwo;
            event.reward = "Energy";
            this.setState({eventTwo: event});
        } else if (secondEventNumber === 3) {
            let event = this.state.eventTwo;
            event.reward = "Spark";
            this.setState({eventTwo: event});
        } else if (secondEventNumber === 4) {
            let event = this.state.eventTwo;
            event.reward = "Luminosity";
            this.setState({eventTwo: event});
        }
    }

    getItem() {
        if(this.state.eventCompleted === false && this.props.character.eventOneCompleted === false) {
            let item = createItem(this.props.character.enlightenment);
            console.log(item);
            let character = this.props.character;
            if(character.items === undefined || character.items === false) {
                character.items = []
            }
            character.items.push(item);
            character.eventOneCompleted = true;
            this.setState({eventCompleted: true});
            let itemKid = document.createElement("p");
            let itemParent = document.getElementById("eventOutput");
            itemKid.innerHTML = `You have placed a ${item.name} in your inventory.`
            itemParent.appendChild(itemKid);
            const { saveCharacter, auth, characterId } = this.props;
            console.log("Saving Character");
            saveCharacter(character, auth.uid, characterId);
        }
    }

    getFragments() {
        if(this.state.eventCompleted === false && this.props.character.eventOneCompleted === false) {
            let fragments = Math.floor(Math.random() * this.props.character.enlightenment * 2500);
            let character = this.props.character;
            character.unboundFragments += fragments;
            character.eventOneCompleted = true;
            this.setState({eventCompleted: true});
            let fragmentKid = document.createElement("p");
            let fragmentParent = document.getElementById("eventOutput");
            fragmentKid.innerHTML = `You have found ${fragments} fragments! Bind them in the HUB.`
            fragmentParent.appendChild(fragmentKid);
            const { saveCharacter, auth, characterId } = this.props;
            console.log("Saving Character");
            saveCharacter(character, auth.uid, characterId);
        }
    }

    getSpark() {
        if(this.state.eventCompleted === false && this.props.character.eventOneCompleted === false) {
            let sparkRandom = Math.floor(Math.random() * 15);
            let character = this.props.character;
            character.spark += sparkRandom;
            character.eventOneCompleted = true;
            this.setState({eventCompleted: true});
            let sparkKid = document.createElement("p");
            let sparkParent = document.getElementById("eventOutput");
            sparkKid.innerHTML = `You have gained ${sparkRandom} spark!.`
            sparkParent.appendChild(sparkKid);
            const { saveCharacter, auth, characterId } = this.props;
            console.log("Saving Character");
            saveCharacter(character, auth.uid, characterId);
        }
    }

    getLuminosity() {
        if(this.state.eventCompleted === false && this.props.character.eventOneCompleted === false) {
            let luminosityRandom = Math.floor(Math.random() * 15);
            let character = this.props.character;
            character.luminosity += luminosityRandom;
            character.eventOneCompleted = true;
            this.setState({eventCompleted: true});
            let luminosityKid = document.createElement("p");
            let luminosityParent = document.getElementById("eventOutput");
            luminosityKid.innerHTML = `You have gained ${luminosityRandom} luminosity!.`
            luminosityParent.appendChild(luminosityKid);
            const { saveCharacter, auth, characterId } = this.props;
            console.log("Saving Character");
            saveCharacter(character, auth.uid, characterId);
        }
    }

    getEnergy() {
        if(this.state.eventCompleted === false && this.props.character.eventOneCompleted === false) {
            let energyRandom = Math.floor(Math.random() * 30);
            let character = this.props.character;
            character.energy += energyRandom;
            character.eventOneCompleted = true;
            this.setState({eventCompleted: true});
            let energyKid = document.createElement("p");
            let energyParent = document.getElementById("eventOutput");
            energyKid.innerHTML = `You have gained ${energyRandom} energy!.`
            energyParent.appendChild(energyKid);
            const { saveCharacter, auth, characterId } = this.props;
            console.log("Saving Character");
            saveCharacter(character, auth.uid, characterId);
        }
    }

    componentWillMount() {
        this.determineEvent();
    }
    
    render() {
        return (
            <div>
                <p id="zoneOneEventHeader">Event! Choose one.... wisely!</p>
                <div id="showEventsBox">
                    {this.state.eventOne.reward === "Fragments" && 
                    <div className = "eventBox">
                        <p>You come across a stash of Fragments near a crystal stump.</p>
                        <button onClick={() => this.getFragments()}>Pick Up Fragments</button>
                    </div>}
                    {this.state.eventOne.reward === "Item" && 
                    <div className = "eventBox">
                        <p>You see an item perched up in a small crystal tree.</p>
                        <button onClick={() => this.getItem()}>Grab Item</button>
                    </div>}
                    {this.state.eventOne.reward === "Energy" && 
                    <div className = "eventBox">
                        <p>You see a orb of energy in the distance.</p>
                        <button onClick={() => this.getEnergy()}>Absorb Energy</button>
                    </div>}
                    {this.state.eventOne.reward === "Spark" && 
                    <div className = "eventBox">
                        <p>A crystal crackles with lightning, do you touch it?</p>
                        <button onClick={() => this.getSpark()}>Gain Spark</button>
                    </div>}
                    {this.state.eventOne.reward === "Luminosity" && 
                    <div className = "eventBox">
                        <p>You see a shaft of light, maybe it'll increase your luminosity?</p>
                        <button onClick={() => this.getLuminosity()}>Increase Luminosity</button>
                    </div>}

                    {this.state.eventTwo.reward === "Fragments" && 
                    <div className = "eventBox">
                        <p>You come across a stash of Fragments among shattered diamonds.</p>
                        <button onClick={() => this.getFragments()}>Pick Up Fragments</button>
                    </div>}
                    {this.state.eventTwo.reward === "Item" && 
                    <div className = "eventBox">
                        <p>You see an item laying on the ground!</p>
                        <button onClick={() => this.getItem()}>Grab Item</button>
                    </div>}
                    {this.state.eventTwo.reward === "Energy" && 
                    <div className = "eventBox">
                        <p>You see a orb of energy in the distance.</p>
                        <button onClick={() => this.getEnergy()}>Absorb Energy</button>
                    </div>}
                    {this.state.eventTwo.reward === "Spark" && 
                    <div className = "eventBox">
                        <p>A crystal crackles with lightning, do you touch it?</p>
                        <button onClick={() => this.getSpark()}>Gain Spark</button>
                    </div>}
                    {this.state.eventTwo.reward === "Luminosity" && 
                    <div className = "eventBox">
                        <p>You see a shaft of light, maybe it'll increase your luminosity?</p>
                        <button onClick={() => this.getLuminosity()}>Increase Luminosity</button>
                    </div>}
                </div>
                <div id="eventOutput">

                </div>
                <p><NavLink to='/main/ZoneOne'>Back</NavLink></p>
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

export default connect(mapStateToProps, actions)(ZoneOneEvent);

