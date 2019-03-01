export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'CREATE_CHARACTER':
      const { name } = action;
      let newState = Object.assign({}, state, {
        createdCharacter: true,
        character: {
          name: name,
          enlightenment: 1,
          spark: 1,
          luminosity: 1,
          items: []
        }
      });
      return newState;
    default:
      return state;
    }
  };

const INITIAL_STATE = {
    createdCharacter: false,
    character: {
        name: null,
        enlightenment: 1,
        spark: 1,
        luminosity: 1,
        items: []
    }
}