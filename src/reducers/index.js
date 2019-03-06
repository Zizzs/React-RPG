import { combineReducers } from 'redux';
//import characterReducer from './character-reducer';
import auth from './auth';
import character from './character';

export default combineReducers({
    character,
    auth
  });