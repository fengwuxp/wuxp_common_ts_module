import React, {Component, CSSProperties} from 'react';
import PropTypes from 'prop-types';

const styles = {
    root: {
        height: 14,
        width: 14,
        cursor: 'pointer',
        border: 0,
        background: 'none',
        padding: 0,
    },
    dot: {
        backgroundColor: '#e4e6e7',
        height: 8,
        width: 8,
        borderRadius: "50%",
        margin: 3,
    },
    active: {
        backgroundColor: '#319fd6',
    },
};

export interface PaginationDotProps {


    key?: number | string;

    /**
     * 当前选中序号
     */
    index: number;

    /**
     * 是否激活
     */
    active: boolean;

    /**
     * 点击事件
     * @param {React.MouseEvent<HTMLAnchorElement>} event
     * @param {number} index
     */
    onClick: (event: React.MouseEvent<HTMLAnchorElement>, index: number) => void;

    /**
     * dot默认样式
     */
    dotStyle?: CSSProperties;

    /**
     * 激活样式
     */
    activeStyle?: CSSProperties
}

class PaginationDot extends Component<PaginationDotProps, any> {

    static propTypes = {
        active: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    handleClick = event => {
        this.props.onClick(event, this.props.index);
    };

    render() {
        const {active, dotStyle, activeStyle} = this.props;

        let styleDot = dotStyle || styles.dot;

        if (active) {
            styleDot = Object.assign({}, styleDot, activeStyle || styles.active);
        }

        return (
            <button style={styles.root} onClick={this.handleClick}>
                <div style={styleDot}/>
            </button>
        );
    }
}


export default PaginationDot;
