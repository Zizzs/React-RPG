import React, { Component } from 'react';
import './Help.css';

class Help extends Component {
    
    render() {
        return(
            <div>
                <div id="helpHeader">
                    <p>Game Instructions and Descriptions</p>
                </div>
                <div id="characterDiv">
                    <p id="characterDivHeader">Character Stats and Interactions:</p>
                    <p>Character stats are split between 3 main stats. Energy, Luminosity and Spark.</p>
                    <ul>
                        <li>Energy is your character's health. When it hits 0, you die and lose your unbound fragments. Can be healed in the HUB for a 1:1 fragment:energy ratio, only full heals are implemented.</li>
                        <li>Spark is your character's attack power. It helps you kill monsters quicker.</li>
                        <li>Luminosity is your character's defense value. It reduces the incoming damage of monster's attacks.</li>
                    </ul>
                    <p>Enlightenment is your character's overall power level. Not much is implemented for it currently, but it will be a main stat in the future. Item tiers are currently based off Enlightenment, allowing you to get better loot.</p>
                    <p>All stats can be leveled up in the HUB using Bound Fragments. You must <strong>bind</strong> your unbound fragments before you can buy upgrades, as the upgrades require bound fragments. </p>
                </div>
                <div id="progressionDiv">
                    <p id="itemsAndMonstersHeader">Items and Monsters:</p>
                    <p>The main way to progress your character is through equipping items in the inventory.</p>
                    <p>Items can be acquired in many different ways. The main way is through killing monsters and choosing the item option during events.</p>
                    <p>Each item currently has a random roll between 0 and an amount based off your enlightenment level, allowing for items to be VERY good or VERY bad.</p>
                    <p>If you find an item you really like, but dont want to equip it, you can buy a bank slot in the inventory screen and bank the item so you don't accidently fragment it.</p>
                    <p>Fragmenting items gives you bound fragments, which you can then use for stat upgrades.</p>
                </div>
                <div id="futureDiv">
                    <p id="futureHeader">Future Features:</p>
                    <p>I want to implement a monster tier system. This is currently implemented but it has no link to your character's level. I'm planning on tieing the character's enlightenment to the monster tiers, and the character's ability to enter specific zones and events.</p>
                    <p>A new item system that has more complex stats. % based stats, such as "% increased max Energy/Spark/Luminosity" or "%Attack Power". Mostly just ideas as this point, but I plan on expanding on the item generation system in general.</p>
                    <p>More zones, and more portals. Currenly only one zone is implemented. I plan on expanding the currently available Shimmering Wasteland Portal zone to contain multiple lesser zones that the character can explore.</p>
                </div>
                <div id="aboutMeDiv">
                    <p id="aboutMeHeader">About Me</p>
                    <p>My name is Alex Williams, and I'm primarily a Front End Web Developer. I come from a background in Archaeology and decided to get into Web Development. This project is my first major solo project, and it uses React, Redux, Firebase Realtime Database, and Firebase user authentication. </p>
                    <p>If you have any suggestions, find any bugs, or just want to discuss the project, please email me at Zizzs17@gmail.com, or connect/message me on LinkedIn. Feedback is appreciated!</p>
                    <p>LinkedIn Profile: <a href="https://www.linkedin.com/in/alexander-edward-williams/">Link</a></p>
                    <p>This Project's Github Repo: <a href="https://github.com/Zizzs/React-RPG">Link</a></p>
                    <p>Github: <a href="https://github.com/Zizzs/">Link</a></p>
                </div>
            </div>
        )
    }
}

export default Help;