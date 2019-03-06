export default (state = "loading", action) => {
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
              }
            });
            console.log(newState);
            return newState;
        default:
            return state;
    }
};