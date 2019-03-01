import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import characterReducer from './reducers/character-reducer';
import { Provider } from 'react-redux';

const store = createStore(characterReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);


serviceWorker.unregister();