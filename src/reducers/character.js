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
                  boundFragments: state[characterKey].boundFragments,
                  unboundFragments: state[characterKey].unboundFragments
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
    luminosity: 1,
    name: "Random Jimbo Error Man",
    pylonAlpha: false,
    pylonBeta: false,
    pylonGamma: false,
    spark: 1,
    energy: 50,
    boundFragments: 0,
    unboundFragments: 0,
}