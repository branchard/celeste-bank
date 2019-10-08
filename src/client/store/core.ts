import {debounce} from 'lodash';

const ACTION_TYPES = {
    TYPE: 'type',
    START_FETCH: 'startFetch',
    FULFIL_FETCH: 'fulfilFetch'
};

const INITIAL_STATE = {
    searchValue: '',
    pendingSearch: false
};

let lastController: any;

const fetchApi = debounce((dispatch: any, searchValue: string) => {
    if(lastController){
        lastController.abort();
    }

    lastController = new AbortController();

    dispatch({
        type: ACTION_TYPES.START_FETCH
    });
    window.fetch(`http://localhost:3000/search?text=${searchValue}&per_page=20`, {signal: lastController.signal})
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: ACTION_TYPES.FULFIL_FETCH
            });
            lastController = undefined;
            console.log(json);
        });
}, 300);

export const actions = {
    type: (value: string) => (dispatch: any) => {
        dispatch({
            type: ACTION_TYPES.TYPE,
            value,
        });

        fetchApi(dispatch, value);
    }
};

export const reducer = (previousState = INITIAL_STATE, action: any) => {
    // console.log('modal reducer', previousState, action);
    switch (action.type) {
        case ACTION_TYPES.TYPE:
            return {
                ...previousState,
                searchValue: action.value
            };
        case ACTION_TYPES.START_FETCH:
            return {
                ...previousState,
                pendingSearch: true
            };
        case ACTION_TYPES.FULFIL_FETCH:
            return {
                ...previousState,
                pendingSearch: false
            };
        default:
            return previousState;
    }
};
