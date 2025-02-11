import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { Tools } from './tools';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigStore = () => {            //used in app.js
    const store = createStore(                //buit in function of redux
        combineReducers({
            tools: Tools,
        }),
        applyMiddleware(thunk, logger)        //check explanation
    );

    return store;
}