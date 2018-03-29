export function defaultMapStateToProps(state) {
    return {};
}

export function defaultMapDispatchToProps(_dispatch) {
    return {dispatch: _dispatch};
}

export function combineReducers(reducers) {
    return reducers;
}

export function createStore(reducers, initialState = {}) {
    return {
        reducers,
        initialState,
    };
}
