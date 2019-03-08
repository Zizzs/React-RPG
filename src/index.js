import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import characterReducer from './reducers/character-reducer';
import combineReducers from './reducers/index';
import { Provider } from 'react-redux';


const store = createStore(
    combineReducers,
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);


serviceWorker.unregister();