import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    connect,
    createStore,
    Provider,
} from './stateManager';
import {combineReducers} from './stateManager/functions';

function reducer(state, action) {
    if (action.type == 'SET_COLOR') {
        return {
            ...state,
            color: action.value,
        };
    }
    return state;
}

let store = createStore(combineReducers({default: reducer}), {default: {color: 'green'}});

class Test extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.dispatch({
                    type: 'SET_COLOR',
                    value: 'white',
                });
            }}>
                <View style={{
                    backgroundColor: this.props.color,
                    width: 100,
                    height: 100,
                }}/>
            </TouchableOpacity>
        );
    }
}

const ConnectedTest = connect((state) => ({color: state.default.color}))(Test);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <ConnectedTest/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
});

AppRegistry.registerComponent('reduxPresentation', () => App);
