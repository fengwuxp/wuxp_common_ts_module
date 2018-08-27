import React, {Component} from 'react';
import PropTypes from 'prop-types';

const DefaultOnSSR = () => null;

// interface NoSSRProps {
//     children: React.ReactNode
// }

class NoSSR extends Component<any, any> {

    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    state = {
        mounted: false,
    };

    componentDidMount() {
        this.setState({mounted: true}); // eslint-disable-line react/no-did-mount-set-state
    }

    render() {
        return this.state.mounted ? this.props.children : <DefaultOnSSR/>;
    }
}

export default NoSSR;
