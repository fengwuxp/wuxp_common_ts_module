import React, {Component, CSSProperties} from 'react';
import PropTypes from 'prop-types';
import PaginationDot, {PaginationDotProps} from './PaginationDot';
import {AxisType} from "react-swipeable-views";


const rootStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
};

const xPositionStyle = {
    bottom: 8,
    right: 8
};
const yPositionStyle = {
    top: "50%",
    right: 8,
    transform: "translateY(-50%)"
};

const yStyle: React.CSSProperties = {
    flexWrap: "wrap",
    width: 14
};


export interface PaginationProps {

    /**
     * 总数
     */
    dots: number;

    /**
     * chang 事件
     * @param {number} index
     */
    onChangeIndex: (index: number) => void;

    /**
     * 当前选中
     */
    index: number;

    /**
     * 样式
     */
    style?: React.CSSProperties

    /**
     * dot默认样式
     */
    dotStyle?: CSSProperties;

    /**
     * 激活样式
     */
    activeStyle?: CSSProperties


    //方向
    axis?: AxisType;
}

class Pagination extends Component<PaginationProps, any> {

    static propTypes = {
        dots: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        onChangeIndex: PropTypes.func.isRequired,
    };

    handleClick = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        this.props.onChangeIndex(index);
    };

    render() {
        const {index, dots, style, dotStyle, axis, activeStyle} = this.props;

        const children = [];

        for (let i = 0; i < dots; i += 1) {
            children.push(
                <PaginationDot key={i}
                               index={i}
                               active={i === index}
                               dotStyle={dotStyle}
                               activeStyle={activeStyle}
                               onClick={this.handleClick}/>,
            );
        }

        let paginationStyle: React.CSSProperties;
        const defaultStyle = style || rootStyle;
        if (axis === "y") {
            paginationStyle = {
                ...yPositionStyle,
                ...defaultStyle,
                ...yStyle
            };
            if (dotStyle && dotStyle.width) {
                paginationStyle.width = dotStyle.width;
            }
        } else {
            paginationStyle = {
                ...xPositionStyle,
                ...defaultStyle
            };
        }

        return <div style={paginationStyle}>{children}</div>;
    }
}


export default Pagination;
