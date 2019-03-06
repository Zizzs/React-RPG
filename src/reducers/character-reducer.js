// export default (state = INITIAL_STATE, action) => {
//     let newState;
//     switch (action.type) {
//     case 'CREATE_CHARACTER':
//       const { name } = action;
//       newState = Object.assign({}, state, {
//         createdCharacter: true,
//         pylonAlpha: false,
//         pylonBeta: false,
//         pylonGamma: false,
//         character: {
//           name: name,
//           enlightenment: 1,
//           spark: 1,
//           luminosity: 1,
//           items: []
//         }
//       });
//       return newState;
//     case 'PROGRESS_INTRO':
//       let introText = state.introText + 1;
//       newState = Object.assign({}, state, {
//         introText: introText,
//       });
//       return newState;
//     default:
//       return state;
//     }
//   };

// const INITIAL_STATE = {
//     introText: 0,
//     createdCharacter: false,
//     pylonAlpha: false,
//     pylonBeta: false,
//     pylonGamma: false,
//     character: {
//         name: null,
//         enlightenment: 1,
//         spark: 1,
//         luminosity: 1,
//         items: []
//     }
// }
