import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { Cases } from './caseStudies';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigStore = () => {            //used in app.js
    const store = createStore(                //buit in function of redux
        combineReducers({
            cases: Cases,
        }),
        applyMiddleware(thunk, logger)        //check explanation
    );

    return store;
}