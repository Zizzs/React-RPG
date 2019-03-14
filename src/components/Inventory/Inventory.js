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
        this.fragmentItem = this.fragmentItem.bind(this);
        this.buyBankSlots = this.buyBankSlots.bind(this);
        this.bankItem = this.bankItem.bind(this);
        this.unbankItem = this.unbankItem.bind(this);
    }

    unequipItem() {
        if (this.props.character.hasEquippedItem != false) {
            this.props.character.spark -= this.props.character.equippedItem.spark;
            this.props.character.luminosity -= this.props.character.equippedItem.luminosity;
            this.props.character.maxEnergy -= this.props.character.equippedItem.energy;
            if(this.props.character.energy > this.props.character.maxEnergy) {
                this.props.character.energy = this.props.character.maxEnergy;
            }
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
            this.props.character.maxEnergy += item.energy;
            if (this.props.character.energy < this.props.character.maxEnergy) {
                this.props.character.energy = this.props.character.maxEnergy;
            }
            this.props.character.hasEquippedItem = true;
            //Saving Character
            let character = this.props.character;
            const { saveCharacter, auth, characterId } = this.props;
            console.log("Saving Character");
            saveCharacter(character, auth.uid, characterId);
        }
    }

    buyBankSlots() {
        //Calculate Bank Slot Cost
        let bankCosts = [500, 5000, 25000, 50000, 100000, 250000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000];
        let nextCost = bankCosts[this.props.character.bankSlots];
        //Add Bank Slot and Remove Fragments
        this.props.character.bankSlots += 1;
        this.props.character.boundFragments -= nextCost;
        //Saving Character
        let character = this.props.character;
        const { saveCharacter, auth, characterId } = this.props;
        console.log("Saving Character");
        saveCharacter(character, auth.uid, characterId);
    }

    bankItem(item) {
        if(this.props.character.bankSlots > 0 && this.props.character.bankItems === undefined || this.props.character.bankItems === false || this.props.character.bankItems.length < this.props.character.bankSlots) {
            console.log("Banking Item");
            let index = this.props.character.items.indexOf(item);
            if (index > -1) {
                console.log("Removing Item from Inventory");
                this.props.character.items.splice(index, 1);
            }
            if (this.props.character.equippedItem.id === item.id) {
                console.log("Unequipping Item");
                this.unequipItem();
            }
            if (this.props.character.bankItems === false || this.props.character.bankItems === undefined) {
                console.log("Initializing Bank");
                this.props.character.bankItems = [];
            }
            console.log("Adding Item to Bank");
            this.props.character.bankItems.push(item);
            //Saving Character
            let character = this.props.character;
            const { saveCharacter, auth, characterId } = this.props;
            console.log("Saving Character");
            saveCharacter(character, auth.uid, characterId);
        }
    }

    unbankItem(item) {
        if (this.props.character.items === undefined || this.props.character.items === false) {
            console.log("Initializing Inventory");
            this.props.character.items = [];
        }
        let index = this.props.character.bankItems.indexOf(item);
        if (index > -1) {
            console.log("Removing Item from Bank");
            this.props.character.bankItems.splice(index, 1);
        }
        //Add Item to Character
        console.log("Pushing Item to Inventory");
        this.props.character.items.push(item);
        //Saving Character
        let character = this.props.character;
        const { saveCharacter, auth, characterId } = this.props;
        console.log("Saving Character");
        saveCharacter(character, auth.uid, characterId);
    }

    fragmentItem(item) {
        if(item.id != this.props.character.equippedItem.id) {
            //Get Index of Item in Array
            let index = this.props.character.items.indexOf(item);
            //Total Fragment Amount of item based off stats
            let totalFragments = item.spark + item.luminosity + item.energy;
            //Add fragments to character's bound fragments
            this.props.character.boundFragments += totalFragments;
            //Remove item
            if (index > -1) {
                this.props.character.items.splice(index, 1);
            }
            if (this.props.character.equippedItem.id === item.id) {
                this.unequipItem();
            }
            //Saving Character
            let character = this.props.character;
            const { saveCharacter, auth, characterId } = this.props;
            console.log("Saving Character");
            saveCharacter(character, auth.uid, characterId);
        }
    }

    
    render() {
        let itemExists;
        let bankExists;
        if (this.props.character.items === false || this.props.character.items === undefined) {
            itemExists = false;
        } else {
            itemExists = true;
        }
        if (this.props.character.bankItems === false || this.props.character.bankItems === undefined) {
            bankExists = false;
        } else {
            bankExists = true;
        }

        if(itemExists === true && bankExists === false) {
            let characterItems = this.props.character.items;
            const listItems = characterItems.map((item) =>
                <div key={item.id} className="itemBox">
                    <p>Name: {item.name}</p>
                    <p>Energy: {item.energy}</p>
                    <p>Spark: {item.spark}</p>
                    <p>Luminosity: {item.luminosity}</p>
                    <button onClick={() => this.equipItem(item)}>Equip</button>
                    {this.props.character.equippedItem != item && <button onClick={() => this.fragmentItem(item)}>Fragment Item</button>}
                    <button onClick={() => this.bankItem(item)}>Bank Item</button>
                </div>
            );
            let bankCosts = [500, 5000, 25000, 50000, 100000, 250000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000];
            let nextCost = bankCosts[this.props.character.bankSlots];
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
                    <div>
                        <p className="itemHeaders">Banked Items ({this.props.character.bankSlots} Slots):</p>
                    </div>
                    <div id="bankSlotButton">
                        <button onClick={this.buyBankSlots}>Buy Bank Slots(Cost: {nextCost})</button>
                    </div>
                    <div>
                        <p className="itemHeaders">You have no Banked Items, and {this.props.character.bankSlots} slots for items.</p>
                    </div>
                </div>
            );
        } else if (itemExists === true && bankExists === true) {
            let characterItems = this.props.character.items;
            const listItems = characterItems.map((item) =>
                <div key={item.id} className="itemBox">
                    <p>Name: {item.name}</p>
                    <p>Energy: {item.energy}</p>
                    <p>Spark: {item.spark}</p>
                    <p>Luminosity: {item.luminosity}</p>
                    <button onClick={() => this.equipItem(item)}>Equip</button>
                    {this.props.character.equippedItem != item && <button onClick={() => this.fragmentItem(item)}>Fragment Item</button>}
                    <button onClick={() => this.bankItem(item)}>Bank Item</button>
                </div>
            );
            let bankItems = this.props.character.bankItems;
            const listBankItems = bankItems.map((item) =>
                <div key={item.id} className="itemBox">
                    <p>Name: {item.name}</p>
                    <p>Energy: {item.energy}</p>
                    <p>Spark: {item.spark}</p>
                    <p>Luminosity: {item.luminosity}</p>
                    <button onClick={() => this.unbankItem(item)}>Remove From Bank</button>
                </div>
            );
            let bankCosts = [500, 5000, 25000, 50000, 100000, 250000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000];
            let nextCost = bankCosts[this.props.character.bankSlots];
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
                    <div>
                        <p className="itemHeaders">Banked Items ({this.props.character.bankSlots} Slots):</p>
                    </div>
                    <div id="bankSlotButton">
                        <button onClick={this.buyBankSlots}>Buy Bank Slots(Cost: {nextCost})</button>
                    </div>
                    <div id="itemsList">
                        {listBankItems}
                    </div>
                </div>
            );
        } else if(itemExists === false && bankExists === true) {
            let bankItems = this.props.character.bankItems;
            const listBankItems = bankItems.map((item) =>
                <div key={item.id} className="itemBox">
                    <p>Name: {item.name}</p>
                    <p>Energy: {item.energy}</p>
                    <p>Spark: {item.spark}</p>
                    <p>Luminosity: {item.luminosity}</p>
                    <button onClick={() => this.unbankItem(item)}>Remove From Bank</button>
                </div>
            );
            let bankCosts = [500, 5000, 25000, 50000, 100000, 250000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000];
            let nextCost = bankCosts[this.props.character.bankSlots];
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
                    <div id="noItems">
                        <p>You have no items</p>
                    </div>
                    <div>
                        <p className="itemHeaders">Banked Items ({this.props.character.bankSlots} Slots):</p>
                    </div>
                    <div id="bankSlotButton">
                        <button onClick={this.buyBankSlots}>Buy Bank Slots(Cost: {nextCost})</button>
                    </div>
                    <div id="itemsList">
                        {listBankItems}
                    </div>
                </div>
            );
        } else {
            let bankCosts = [500, 5000, 25000, 50000, 100000, 250000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000];
            let nextCost = bankCosts[this.props.character.bankSlots];
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
                    <div id="noItems">
                        <p>You have no items</p>
                    </div>
                    <div>
                        <p className="itemHeaders">Banked Items ({this.props.character.bankSlots} Slots):</p>
                    </div>
                    <div id="bankSlotButton">
                        <button onClick={this.buyBankSlots}>Buy Bank Slots(Cost: {nextCost})</button>
                    </div>
                    <div>
                        <p className="itemHeaders">You have no Banked Items, and {this.props.character.bankSlots} slots for items.</p>
                    </div>
                </div>
            )
        }
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