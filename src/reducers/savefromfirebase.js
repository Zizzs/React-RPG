export default (state = {}, action) => {
    let newState;
    switch (action.type) {
    case 'SAVE_CHARACTER':
      const { character } = action;
      newState = Object.assign({}, state, character);
      return newState;
    default:
      return state;
    }
  };