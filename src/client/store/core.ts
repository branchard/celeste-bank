import {debounce} from 'lodash';

const ACTION_TYPES = {
    TYPE: 'type',
    START_FETCH: 'startFetch',
    FULFIL_FETCH: 'fulfilFetch',
    ERROR_FETCH: 'errorFetch',
    SELECT_LICENSE: 'selectLicense',
    SELECT_SAFE_SEARCH: 'selectSafeSearch',
};


const INITIAL_STATE = {
    searchValue: '',
    pendingSearch: false,
    // @ts-ignore
    photos: [],
    currentPage: 1,
    selectedLicense: '',
    selectedSafeSearch: 1 // 1 = safe, 2 = moderate, 3 = restricted
};

let lastController: any;

const fetchApi = debounce(({dispatch, searchValue, selectedLicense, selectedSafeSearch, pageNumber}) => {
    if (lastController) {
        lastController.abort();
    }

    lastController = new AbortController();

    dispatch({
        type: ACTION_TYPES.START_FETCH
    });
    window.fetch(`http://localhost:3000/search?text=${searchValue}${selectedLicense !== undefined && selectedLicense !== '' ? `&license=${selectedLicense}` : ''}&per_page=20&page=${pageNumber}&extras=url_o,o_dims`, {signal: lastController.signal})
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
    type: (value: string) => (dispatch: any, getState: any) => {
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
            fetchApi({dispatch, searchValue: value, selectedLicense: getState().selectedLicense, pageNumber: 1});
        } else if (lastController) {
            lastController.abort();
        }

    },
    fetchNextPage: (currentPage: number, value: string) => (dispatch: any, getState: any) => {
        console.log('fetchNextPage', currentPage);
        fetchApi({dispatch, searchValue: value, selectedLicense: getState().selectedLicense, pageNumber: currentPage + 1});
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
            fetchApi({dispatch, searchValue: value, pageNumber: 1});
        } else if (lastController) {
            lastController.abort();
        }
    },
    selectLicense: (value: string) => (dispatch: any, getState: any) => {
        dispatch({
            type: ACTION_TYPES.SELECT_LICENSE,
            value,
        });

        fetchApi({dispatch, searchValue: getState().searchValue, selectedLicense: value, pageNumber: 1});
    },
    selectedSafeSearch: (value: number) => ({
        type: ACTION_TYPES.SELECT_SAFE_SEARCH,
        value
    })
};

export const reducer = (previousState = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.TYPE:
            return {
                ...previousState,
                searchValue: action.value,
                pendingSearch: action.value.length > 0,
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
        case  ACTION_TYPES.SELECT_LICENSE:
            return {
                ...previousState,
                selectedLicense: action.value
            };
        default:
            return previousState;
    }
};
