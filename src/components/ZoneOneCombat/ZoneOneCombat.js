import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreator';
import './ZoneOneCombat.css';

class ZoneOneCombat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monsters: [
                {
                    name: "Crystalized Rat",
                    energy: 5,
                    spark: 2,
                    luminosity: 1,
                    fragments: 5
                },
            ],
            currentMonster: 0,
            hasCharacterInfo: false,
        }
        this.performCombat = this.performCombat.bind(this);
    }

    performCombat() {
        if(this.state.monsters[this.state.currentMonster].energy > 0) {
            while(this.props.character.energy > 0 && this.state.monsters[this.state.currentMonster].energy > 0) {
                //Character Attack
                let tempMonsters = this.state.monsters;
                let monster = this.state.monsters[this.state.currentMonster];

                //Character Damage
                if (this.props.character.energy > 0) {
                    console.log("Character Attacking");
                    let characterDamage = Math.floor(Math.random() * this.props.character.spark);
                    console.log(characterDamage);
                    console.log(this.props.character.spark);
                    let updatedEnemyHealth = this.state.monsters[this.state.currentMonster].energy - characterDamage;
                    monster.energy = updatedEnemyHealth;
                }

                //Setting Monster State
                tempMonsters[this.state.currentMonster] = monster;
                this.setState({monsters: tempMonsters});
                console.log(this.state.monsters[this.state.currentMonster].energy);

                // Monster Attack
                if (this.state.monsters[this.state.currentMonster].energy > 0) {
                    console.log("Monster Attacking");
                    let monsterDamage = Math.floor(Math.random() * this.state.monsters[this.state.currentMonster].spark);
                    this.props.character.energy -= monsterDamage;
                }
            }
            if (this.state.monsters[this.state.currentMonster].energy <= 0) {
                //Rewards
                console.log("Rewards Get");
                this.props.character.unboundFragments += this.state.monsters[this.state.currentMonster].fragments;
                let character = this.props.character;
                const { saveCharacter, auth, characterId } = this.props;
                saveCharacter(character, auth.uid, characterId);
            }
        }
    }

    componentWillMount() {
        if (this.state.hasCharacterInfo === false) {
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
            setTimeout(() => {
                let tempNum = Math.floor(Math.random() * this.props.character.enlightenment);
                this.setState({currentMonster: tempNum});
                console.log(tempNum);
            }, 1000);
            this.setState({hasCharacterInfo: true});
        }
    }

    render() {
        return (
            <div id="combatText">
                <p>A {this.state.monsters[this.state.currentMonster].name} appears!</p>
                <p>Energy: {this.state.monsters[this.state.currentMonster].energy} | Spark: {this.state.monsters[this.state.currentMonster].spark} | Held Fragments: {this.state.monsters[this.state.currentMonster].fragments}</p>
                <div id="fightOrBack"><p onClick={this.performCombat}>Fight!</p>  <NavLink to='/main/ZoneOne'>Back</NavLink></div>
                {this.state.monsters[this.state.currentMonster].energy <= 0 && <p>The monster has been defeated.</p>}
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

export default connect(mapStateToProps, actions)(ZoneOneCombat);

