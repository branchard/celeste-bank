import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import {reducer as coreReducer} from './core';

const composeEnhancer = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#name
        name: 'linkPicker'
    }) : compose;

export default createStore(combineReducers({
    core: coreReducer
}), composeEnhancer(applyMiddleware(thunk)));
