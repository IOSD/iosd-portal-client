import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

// IMPORTING REDUCERS----
import {indexReducer} from '../reducers/main.reducer'
// -----------------------

const store = createStore(
    indexReducer,
    applyMiddleware(logger)
);

export {store};