import {debounce} from 'lodash';

const ACTION_TYPES = {
    TYPE: 'type',
    START_FETCH: 'startFetch',
    FULFIL_FETCH: 'fulfilFetch',
    ERROR_FETCH: 'errorFetch'
};


const INITIAL_STATE = {
    searchValue: '',
    pendingSearch: false,
    // @ts-ignore
    photos: [],
    currentPage: 1
};

let lastController: any;

const fetchApi = debounce((dispatch: any, searchValue: string, pageNumber: number) => {
    if (lastController) {
        lastController.abort();
    }

    lastController = new AbortController();

    dispatch({
        type: ACTION_TYPES.START_FETCH
    });
    window.fetch(`http://localhost:3000/search?text=${searchValue}&per_page=20&page=${pageNumber}&extras=url_o,o_dims`, {signal: lastController.signal})
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: ACTION_TYPES.FULFIL_FETCH,
                photos: json.photos.photo,
                currentPage: pageNumber
            });
        }).catch(e => {
        dispatch({
            type: ACTION_TYPES.ERROR_FETCH
        });
    }).finally(() => {
        lastController = undefined;
    });
}, 300);

export const actions = {
    type: (value: string) => (dispatch: any) => {
        let queries: any = {
            search: value
        };
        let url = '/';

        for (let queryIndex of Object.keys(queries)) {
            if (queries[queryIndex]) {
                if (url === '/') {
                    url += '?';
                }

                url += `${queryIndex}=${queries[queryIndex]}`;
            }
        }
        history.pushState(undefined, undefined, url);

        dispatch({
            type: ACTION_TYPES.TYPE,
            value,
        });

        if (value !== '') {
            fetchApi(dispatch, value, 1);
        } else if (lastController) {
            lastController.abort();
        }

    },
    fetchNextPage: (currentPage: number, value: string) => (dispatch: any) => {
        fetchApi(dispatch, value, currentPage + 1);
    },
    initRoute: () => (dispatch: any) => {
        let url = new URL(window.location.href);
        let value = url.searchParams.get("search");

        if(value === '' || value === undefined || value === null){
            return;
        }

        dispatch({
            type: ACTION_TYPES.TYPE,
            value,
        });

        if (value !== '') {
            fetchApi(dispatch, value, 1);
        } else if (lastController) {
            lastController.abort();
        }
    }
};

export const reducer = (previousState = INITIAL_STATE, action: any) => {
    // console.log('modal reducer', previousState, action);
    // if (action.type === '@@INIT') {
    //     return previousState;
    // }
    switch (action.type) {
        case ACTION_TYPES.TYPE:
            return {
                ...previousState,
                searchValue: action.value,
                // @ts-ignore
                photos: []
            };
        case ACTION_TYPES.START_FETCH:
            return {
                ...previousState,
                pendingSearch: true
            };
        case ACTION_TYPES.FULFIL_FETCH:
            return {
                ...previousState,
                pendingSearch: false,
                photos: [...previousState.photos, action.photos],
                currentPage: action.currentPage
            };
        case ACTION_TYPES.ERROR_FETCH:
            return {
                ...previousState,
                pendingSearch: false
            };
        default:
            return previousState;
    }
};
