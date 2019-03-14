import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreator';
import createItem from '../../items/itemGeneration';
import './ZoneOneCombat.css';

class ZoneOneCombat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monsters: [
                {
                    name: "Crystalized Rat",
                    energy: 5,
                    spark: 5,
                    luminosity: 1,
                    fragments: 50,
                    tier: 1
                },
                {
                    name: "Glimmer Bandit",
                    energy: 40,
                    spark: 15,
                    luminosity: 5,
                    fragments: 250,
                    tier: 1
                },
                {
                    name: "Lesser Diamond Elemental",
                    energy: 100,
                    spark: 20,
                    luminosity: 35,
                    fragments: 750,
                    tier: 2
                },
                {
                    name: "Young Crystal Ent",
                    energy: 250,
                    spark: 50,
                    luminosity: 75,
                    fragments: 2000,
                    tier: 2
                },
                {
                    name: "Juvenile Crystal Ent",
                    energy: 500,
                    spark: 100,
                    luminosity: 125,
                    fragments: 5000,
                    tier: 3
                },
                {
                    name: "Glimmer Bandit Hunter",
                    energy: 750,
                    spark: 200,
                    luminosity: 200,
                    fragments: 10000,
                    tier: 3
                }
            ],
            currentMonster: 0,
            hasCharacterInfo: false,
        }
        this.performCombat = this.performCombat.bind(this);
        this.determineMonsters = this.determineMonsters.bind(this);
        this.updateScroll = this.updateScroll.bind(this);
    }

    determineMonsters() {
        let monsterRange = this.state.monsters.length;
        let currentTempMonster = Math.floor(Math.random() * monsterRange);
        console.log(currentTempMonster);
        this.setState({currentMonster: currentTempMonster});
    }

    // let theKid = document.createElement("p");
    // console.log(this.props);
    // theKid.innerHTML = `You feel the tree pulse. (Save)`;
    // let theParent = document.getElementById('textLogDiv');
    // theParent.appendChild(theKid);

    updateScroll() {
        let element = document.getElementById("eventOutput");
        element.scrollTop = element.scrollHeight;
    }

    performCombat() {
        let theKid = document.createElement("p");
        let theParent = document.getElementById("eventOutput");
        console.log(`Enemy Energy: ${this.state.monsters[this.state.currentMonster].energy}`);
        if(this.state.monsters[this.state.currentMonster].energy > 0) {
            //Character Attack
            let tempMonsters = this.state.monsters;
            let monster = this.state.monsters[this.state.currentMonster];

            //Character Damage
            if (this.props.character.energy > 0) {
                console.log("Character Attacking");

                //Random Character Damage based off Spark
                let characterDamage = Math.floor(Math.random() * this.props.character.spark);
                console.log(characterDamage);
                console.log(this.props.character.spark);

                //Calculating damage vs enemy defense
                let enemyDefense = Math.floor(Math.random() * this.state.monsters[this.state.currentMonster].luminosity);
                let updatedDamage = characterDamage - enemyDefense;
                if (updatedDamage < 0) {
                    updatedDamage = 0;
                };

                //Outputting the combat log
                let charCombatKid = document.createElement("p");
                let charCombatParent = document.getElementById("eventOutput");
                charCombatKid.innerHTML = `You attacked for ${characterDamage}, the monster defense was ${enemyDefense}, final damage was ${updatedDamage}!`;
                charCombatParent.appendChild(charCombatKid);
                console.log(`You attacked for ${characterDamage}, the monster defense was ${enemyDefense}, final damage was ${updatedDamage}!`);

                //Updating Enemy Health
                let updatedEnemyHealth = this.state.monsters[this.state.currentMonster].energy - updatedDamage;
                monster.energy = updatedEnemyHealth;
            }

            //Setting Monster State
            tempMonsters[this.state.currentMonster] = monster;
            this.setState({monsters: tempMonsters});
            console.log(this.state.monsters[this.state.currentMonster].energy);

            // Monster Attack
            if (this.state.monsters[this.state.currentMonster].energy > 0) {
                console.log("Monster Attacking");

                //Monster Damage and Character Defense Calculations
                let monsterDamage = Math.floor(Math.random() * this.state.monsters[this.state.currentMonster].spark);
                let characterDefense = Math.floor(Math.random() * this.props.character.luminosity);
                let updatedDamage = monsterDamage - characterDefense;
                if (updatedDamage < 0) {
                    updatedDamage = 0;
                };

                //Outputting Text
                theKid.innerHTML = `The ${this.state.monsters[this.state.currentMonster].name} attacked for ${monsterDamage}, your defense was ${characterDefense}, final damage was ${updatedDamage}!`;
                theParent.appendChild(theKid);
                console.log(`The ${this.state.monsters[this.state.currentMonster].name} attacked for ${monsterDamage}, your defense was ${characterDefense}, final damage was ${updatedDamage}!`);
                if (updatedDamage > this.props.character.energy) {
                    this.props.character.energy = 0;
                }
                
                //Updating Character Health(Energy);
                this.props.character.energy -= updatedDamage;
                console.log(`Character Energy Left: ${this.props.character.energy}`);

                //Saving Character
                let character = this.props.character;
                const { saveCharacter, auth, characterId } = this.props;
                console.log("Saving Combat");
                saveCharacter(character, auth.uid, characterId);
            }
            
        
            if (this.state.monsters[this.state.currentMonster].energy <= 0) {
                //Rewards
                let rewardsKid = document.createElement("p");
                let rewardsParent = document.getElementById("eventOutput");
                let monsterDefeatedKid = document.createElement("p");

                //Stating the monster was defeated prior to printing out rewards.
                monsterDefeatedKid.innerHTML = `${this.state.monsters[this.state.currentMonster].name} has been defeated!`
                rewardsParent.appendChild(monsterDefeatedKid);

                //Rewards Generation
                let fragments = this.state.monsters[this.state.currentMonster].fragments;
                let rewards = Math.floor(Math.random() * (fragments - (fragments/2) + 1) + (fragments/2));
                let randomNumber = Math.floor(Math.random() * 100);
                let itemKidRegular = document.createElement("p");
                let itemKidEpic = document.createElement("p");
                let itemParent = document.getElementById("eventOutput");

                //Item generation
                if(randomNumber >= 66) {
                    let item = createItem(this.state.monsters[this.state.currentMonster].tier);
                    itemKidRegular.innerHTML = `You have recieved a regular quality ${item.name}`;
                    itemParent.appendChild(itemKidRegular);
                    this.props.character.items.push(item);
                } else if(randomNumber >= 95) {
                    let item = createItem(this.state.monsters[this.state.currentMonster].tier + 1);
                    itemKidEpic.innerHTML = `You have recieved an epic quality ${item.name}`;
                    itemParent.appendChild(itemKidEpic);
                    this.props.character.items.push(item);
                }

                //Rewards Combat Text
    

                rewardsKid.innerHTML = `Recieved ${rewards} fragments.`;
                rewardsParent.appendChild(rewardsKid);
                console.log(`Recieved ${rewards} fragments.`);

                //Giving Items to Character
                this.props.character.unboundFragments += rewards;

                //Saving Character
                let character = this.props.character;
                const { saveCharacter, auth, characterId } = this.props;
                console.log("Saving Combat");
                saveCharacter(character, auth.uid, characterId);
            }

            //If Character Dies
            if (this.props.character.energy <= 0) {
                let deathKid = document.createElement("p");
                let deathParent = document.getElementById("eventOutput");
                deathKid.innerHTML = `You have died and lost all your unbound fragments.`
                deathParent.appendChild(deathKid);

                //Set energy and unbound fragments to zero
                this.props.character.energy = 0;
                this.props.character.unboundFragments = 0;

                //Saving Character
                let character = this.props.character;
                const { saveCharacter, auth, characterId } = this.props;
                console.log("Saving Combat");
                saveCharacter(character, auth.uid, characterId);
            }
        }
        this.updateScroll();
    }

    componentWillMount() {
        this.determineMonsters(); 
    }

    render() {
        return (
            <div>
                <div id="combatText">
                    <p>A {this.state.monsters[this.state.currentMonster].name} appears!</p>
                    <p>Energy: {this.state.monsters[this.state.currentMonster].energy} | Spark: {this.state.monsters[this.state.currentMonster].spark} | Held Fragments: {this.state.monsters[this.state.currentMonster].fragments}</p>
                    <div id="fightOrBack"><p onClick={this.performCombat}>Fight!</p>  <NavLink to='/main/ZoneOne'>Back</NavLink></div>
                </div>
                <div id="eventOutput">

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

export default connect(mapStateToProps, actions)(ZoneOneCombat);

