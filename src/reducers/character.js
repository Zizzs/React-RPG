export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_CHARACTER":
            return action.payload;
        case 'PROGRESS_INTRO':
            let characterKey = Object.keys(state);
            //let tempState = state[characterKey];
            // console.log(tempState);
            let newIntroText = state[characterKey].introText + 1;
            console.log(newIntroText);
            let newState = Object.assign({}, state, {
              [characterKey]: {
                  createdCharacter: state[characterKey].createdCharacter,
                  enlightenment: state[characterKey].enlightenment,
                  introText: newIntroText,
                  luminosity: state[characterKey].luminosity,
                  name: state[characterKey].name,
                  pylonAlpha: state[characterKey].pylonAlpha,
                  pylonBeta: state[characterKey].pylonBeta,
                  pylonGamma: state[characterKey].pylonGamma,
                  spark: state[characterKey].spark,
                  energy: state[characterKey].energy,
                  maxEnergy: state[characterKey].maxEnergy,
                  boundFragments: state[characterKey].boundFragments,
                  unboundFragments: state[characterKey].unboundFragments,
                  items: state[characterKey].items,
                  equippedItem: state[characterKey].equippedItem,
                  hasEquippedItem: state[characterKey].hasEquippedItem
              }
            });
            console.log(newState);
            return newState;
        default:
            return state;
    }
};

const INITIAL_STATE = {
    createdCharacter: false,
    enlightenment: 1,
    introText: 0,
    luminosity: 5,
    name: "Random Jimbo Error Man",
    pylonAlpha: false,
    pylonBeta: false,
    pylonGamma: false,
    spark: 5,
    energy: 50,
    maxEnergy: 50,
    boundFragments: 0,
    unboundFragments: 0,
    items: false,
    equippedItem: {name: "", spark: 0, energy: 0, luminosity: 0},
    hasEquippedItem: false,
}