export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'CREATE_CHARACTER':
      const { name } = action;
      let newState = Object.assign({}, state, {
        character: {
          name: name,
          level: 1,
          strength: 1,
          agility: 1,
          intellect: 1,
          items: []
        }
      });
      return newState;
    default:
      return state;
    }
  };

const INITIAL_STATE = {
    character: {
        name: null,
        level: 1,
        strength: 1,
        agility: 1,
        intellect: 1,
        items: []
    }
}