import PropTypes from 'prop-types';
import React from 'react';

export default class Provider extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
    };

    static registerComponent(Connect) {
        ++Provider._lastId;
        Provider._connected[Provider._lastId] = Connect;
        return Provider._lastId;
    };

    static removeComponent(Connect) {
        delete Provider[Connect.id];
    };

    static dispatch(action) {
        if (Provider._ProvidersCount == 0) {
            throw 'Нет ни одного компонента "Provider"';
        }
        for (let reducer in Provider._store.reducers) {
            if (Provider._store.reducers.hasOwnProperty(reducer)) {
                Provider._store.state[reducer] =
                    Provider._store.reducers[reducer](Provider._store.state[reducer], action);
            }
        }
        for (let listener in Provider._connected) {
            if (Provider._connected.hasOwnProperty(listener)) {
                Provider._connected[listener].onDispatch(Provider._store.state);
            }
        }
    };

    static getState() {
        return Provider._store.state;
    };

    static _connected = {};
    static _lastId = -1;
    static _ProvidersCount = 0;
    static _store = {};

    constructor(props) {
        super(props);
        if (!props.store) {
            throw 'Компоненту "Provider" необходимо передать "store"';
        }
        if (Provider._ProvidersCount != 0) {
            throw 'Можно использовать только один компонент "Provider"';
        }
        ++Provider._ProvidersCount;
        Provider._store = {
            reducers: props.store.reducers,
            state: props.store.initialState,
        };
    }

    render() {
        return this.props.children;
    }
}
