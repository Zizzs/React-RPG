import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreator';
import './Inventory.css';

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.equipItem = this.equipItem.bind(this);
        this.unequipItem = this.unequipItem.bind(this);
    }

    unequipItem() {
        if (this.props.character.hasEquippedItem != false) {
            this.props.character.spark -= this.props.character.equippedItem.spark;
            this.props.character.luminosity -= this.props.character.equippedItem.luminosity;
            this.props.character.energy -= this.props.character.equippedItem.energy;
            this.props.character.hasEquippedItem = false;
            this.props.character.equippedItem = {name: "No item", spark: 0, luminosity: 0, energy: 0};

            let character = this.props.character;
            const { saveCharacter, auth, characterId } = this.props;
            console.log("Saving Combat");
            saveCharacter(character, auth.uid, characterId);
        }
    }

    equipItem(item) {
        if (this.props.character.hasEquippedItem != true) {
            //Equipping Item
            this.props.character.equippedItem = item;
            this.props.character.spark += item.spark;
            this.props.character.luminosity += item.luminosity;
            this.props.character.energy += item.energy;
            this.props.character.hasEquippedItem = true;
            //Saving Character
            let character = this.props.character;
            const { saveCharacter, auth, characterId } = this.props;
            console.log("Saving Combat");
            saveCharacter(character, auth.uid, characterId);
        }
    }

    render() {
        const characterItems = this.props.character.items;
        const listItems = characterItems.map((item) =>
            <div className="itemBox">
                <p>Name: {item.name}</p>
                <p>Energy: {item.energy}</p>
                <p>Spark: {item.spark}</p>
                <p>Luminosity: {item.luminosity}</p>
                <button onClick={() => this.equipItem(item)}>Equip</button>
            </div>
        );
        return (
        <div>
            <div>
                <p className="itemHeaders">Equipped Item:</p>
            </div>
            <div id="equippedItem">
                <p>Name: {this.props.character.equippedItem.name}</p>
                <p>Energy: {this.props.character.equippedItem.energy}</p>
                <p>Spark: {this.props.character.equippedItem.spark}</p>
                <p>Luminosity: {this.props.character.equippedItem.luminosity}</p>
                <button onClick={this.unequipItem}>Unequip</button>
            </div>
            <div>
                <p className="itemHeaders">Inventory:</p>
            </div>
            <div id="itemsList">
                    {listItems}
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

export default connect(mapStateToProps, actions)(Inventory);