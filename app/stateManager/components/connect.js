import React from 'react';
import {
    defaultMapDispatchToProps,
    defaultMapStateToProps,
} from '../functions';
import Provider from './provider';

const connect = (
    mapStateToProps = defaultMapStateToProps,
    mapDispatchToProps = defaultMapDispatchToProps,
) => (Child) => {
    class Connect extends React.Component {
        onDispatch(newState) {
            this.forceUpdate();
        }

        componentDidMount() {
            this.id = Provider.registerComponent(this);
        }

        componentWillUnmount() {
            Provider.removeComponent(this);
        }

        getProps() {
            return {...this.props, ...mapStateToProps(Provider.getState()), ...mapDispatchToProps(Provider.dispatch)};
        }

        render() {
            return <Child {...this.getProps()} />;
        }
    }

    return Connect;
};

export default connect;
