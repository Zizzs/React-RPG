import React, { Component } from 'react';
import { NavLink } from "react-router-dom" 
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreator';
import createItem from '../../items/itemGeneration';
import './HUB.css';


class HUB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sparkPrice: 100,
            luminosityPrice: 100,
            energyPrice: 100,
        }
        this.handleText = this.handleText.bind(this);
        this.bindFragments = this.bindFragments.bind(this);
        this.restoreEnergy = this.restoreEnergy.bind(this);
        this.calculatePrices = this.calculatePrices.bind(this);
        this.buySpark = this.buySpark.bind(this);
        this.buyLuminosity = this.buyLuminosity.bind(this);
        this.buyEnergy = this.buyEnergy.bind(this);
        this.generateItem = this.generateItem.bind(this);
    }

    bindFragments() {
        this.calculatePrices();
        this.props.character.boundFragments += this.props.character.unboundFragments;
        this.props.character.unboundFragments = 0;
        let character = this.props.character;
        const { saveCharacter, auth, characterId } = this.props;
        saveCharacter(character, auth.uid, characterId);
    }

    restoreEnergy() {
        this.calculatePrices();
        let energyDifference = this.props.character.maxEnergy - this.props.character.energy;
        if(this.props.character.boundFragments >= energyDifference) {
            this.props.character.boundFragments -= energyDifference;
            this.props.character.energy = this.props.character.maxEnergy;
        }
        let character = this.props.character;
        const { saveCharacter, auth, characterId } = this.props;
        saveCharacter(character, auth.uid, characterId);
        this.calculatePrices();
    }

    buyEnergy() {
        this.calculatePrices();
        if(this.props.character.boundFragments >= this.state.energyPrice) {
            this.props.character.boundFragments -= this.state.energyPrice;
            this.props.character.maxEnergy += 25;
            this.props.character.energy = this.props.character.maxEnergy;
            let character = this.props.character;
            const { saveCharacter, auth, characterId } = this.props;
            saveCharacter(character, auth.uid, characterId);
            this.calculatePrices();
        }
    }

    generateItem() {
        let item = createItem(this.props.character.enlightenment);
        console.log(item);
        let character = this.props.character;
        if(character.items === undefined || character.items === false) {
            character.items = []
        }
        character.items.push(item);
        const { saveCharacter, auth, characterId } = this.props;
        saveCharacter(character, auth.uid, characterId);
        console.log(character);
    }

    buySpark() {
        this.calculatePrices();
        if(this.props.character.boundFragments >= this.state.sparkPrice) {
            this.props.character.boundFragments -= this.state.sparkPrice;
            this.props.character.spark += 1;
        }
        let character = this.props.character;
        const { saveCharacter, auth, characterId } = this.props;
        saveCharacter(character, auth.uid, characterId);
        this.calculatePrices();
    }

    buyLuminosity() {
        this.calculatePrices();
        if(this.props.character.boundFragments >= this.state.luminosityPrice) {
            this.props.character.boundFragments -= this.state.luminosityPrice;
            this.props.character.luminosity += 1;
        }
        let character = this.props.character;
        const { saveCharacter, auth, characterId } = this.props;
        saveCharacter(character, auth.uid, characterId);
        this.calculatePrices();
    }

    calculatePrices() {
        let currentSpark = this.props.character.spark;
        let currentLuminosity = this.props.character.luminosity;
        let currentEnergy = this.props.character.maxEnergy;
        let sparkPrice = currentSpark * 20 + 100;
        let luminosityPrice = currentLuminosity * 20 + 100;
        let energyPrice = currentEnergy * 20 + 100;
        console.log(sparkPrice, luminosityPrice, energyPrice);
        this.setState({sparkPrice: sparkPrice, luminosityPrice: luminosityPrice, energyPrice: energyPrice});
    }

    handleText(event) {
        const {dispatch} = this.props;
        event.preventDefault();
        //let characterKey = Object.keys(this.props.character);
        //let tempState = this.props.character[characterKey];
        const action = {
            type: 'PROGRESS_INTRO',
            state: this.props.character
        }
        dispatch(action);
    }

    componentDidMount() {
        setTimeout(() => {
            this.calculatePrices();
        }, 1000);
    }

    render() {
        return (
        <div id="mainHubDiv">
            <div id="zoneHeader">
                <p>Enter a Portal:</p>
            </div>
            <div>
                <div id="allZoneLinks">
                    <p>{this.props.character.introText > 5 && <NavLink className="hubLinks" to="/main/ZoneOne">Shimmering Wasteland</NavLink>}</p>
                    <p className="hubLinks">Another Zone</p>
                </div>
            </div>
            <div>
                <div>
                    <p id="mainHubHeader">The HUB</p>
                </div>
                <div id="imageDiv">
                    Image Goes Here
                </div>
                <div>
                    {this.props.character.introText===0 && 
                    <p className="introText">You open your eyes for the first time, the blue light blinds you momentarily. You find yourself standing on what appears to be a blue disk. In the center you see a shimmering blue tree. All around you are halos of light, in which you can make out details of what lies beyond.</p>}
                    {this.props.character.introText===0 && 
                    <p className="introText">A voice fills your consciousness. "Hello... young one..." </p>}
                    {this.props.character.introText===1 &&
                    <p className="introText">You look around to find the source of the voice.... The tree pulses...</p>}
                    {this.props.character.introText===2 &&
                    <p className="introText">"You... are one of many... children..." you hear as the tree pulses in unison with the voice.</p>}
                    {this.props.character.introText===2 &&
                    <p className="introText">"Children? Where am I?... What... am I?" you think to yourself.</p>}
                    {this.props.character.introText===3 &&
                    <p className="introText">The thundering voice rises in your head. "You are mine... I am yours... We are together as one.... I am the Tree of Light, and I am ...dying..."</p>}
                    {this.props.character.introText===4 &&
                    <p className="introText">"The.... last of my.... light.... has been used to.... create you. "</p>}
                    {this.props.character.introText===4 &&
                    <p className="introText">"Seek... for... the relics.... of my.... creators...."</p>}
                    {this.props.character.introText===4 &&
                    <p className="introText">"Bring..... them...... back..."</p>}
                    {this.props.character.introText===5 &&
                    <p className="introText">Around the tree, 3 pylons materialize out of the shimmering light surrounding the tree. You move towards the tree. Within the pylons, you can see an indentation within each, a spot for a relic.</p>}
                    {this.props.character.introText===5 &&
                    <p className="introText">The tree lightly pulses, but you hear nothing but a whisper... "Save..... us..."</p>}
                </div>
                {this.props.character.introText > 5 &&
                <div id="pylonDiv">
                    <div>
                        <p>Pylon Alpha</p>
                        {!this.props.character.pylonAlpha && <p className="pylonDescription">Dormant</p>}
                    </div>
                    <div>
                        <p>Pylon Beta</p>
                        {!this.props.character.pylonBeta && <p className="pylonDescription">Dormant</p>}
                    </div>
                    <div>
                        <p>Pylon Gamma</p>
                        {!this.props.character.pylonGamma && <p className="pylonDescription">Dormant</p>}
                    </div>
                </div>}
                {this.props.character.introText > 5 &&
                <div id="interactionsHeader">
                    <p>Heals/Upgrades:</p>
                </div>}
                {this.props.character.introText > 5 &&
                <div id="hubInteractions">
                    <div>
                        <button onClick={this.restoreEnergy}>Restore Energy (1 Fragment/ 1 Energy)</button>
                    </div>
                    <div>
                        <button onClick = {this.bindFragments}>Bind Unbound Fragments</button>
                    </div>
                    <div>
                        <button onClick={this.buySpark}>Increase Spark - {this.state.sparkPrice} Fragments</button>
                    </div>
                    <div>
                        <button onClick={this.buyLuminosity}>Increase Luminosity - {this.state.luminosityPrice} Fragments</button>
                    </div>
                    <div>
                        <button onClick={this.buyEnergy}>Increase Energy - {this.state.energyPrice} Fragments</button>
                    </div>
                    <div>
                        <button onClick={this.generateItem}>Generate Item</button>
                    </div>
                </div>
                }
                {this.props.character.introText > 5 &&
                <div id="itemsInteractions">
                    <p>Inventory, Items, and Market:</p>
                </div>
                }
                {this.props.character.introText > 5 &&
                <div>
                    <NavLink className="hubLinks" to="/main/Inventory">View Inventory</NavLink>
                </div>
                }
                {this.props.character.introText <=5 && 
                <div>
                    <form onSubmit={this.handleText}>
                        <button>Next</button>
                    </form>
                </div>}
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

export default connect(mapStateToProps, actions)(HUB);
