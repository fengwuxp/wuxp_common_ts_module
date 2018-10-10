import React, {MouseEventHandler, PureComponent} from 'react';
import PropTypes from 'prop-types';


export interface IconProps<T = string> {

    name: T;

    family?: string;

    size?: number;

    color?: string;

    children?: React.ReactNode;

    style?: React.CSSProperties;

    classNames?: string;

    onClick?: MouseEventHandler<any>;
}

export interface GlyphMap {
    [key: string]: number
}

/**
 * @param glyphMap
 * @param fontFamily
 * @return {Icon}
 */
export default function createIconSet<T = string>(glyphMap: GlyphMap, fontFamily: string) {

    let fontReference = fontFamily;

    const IconNamePropType = PropTypes.oneOf(Object.keys(glyphMap));

    class Icon extends PureComponent<IconProps, any> {

        static propTypes = {
            name: IconNamePropType,
            size: PropTypes.number,
            color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            children: PropTypes.node,
            style: PropTypes.any, // eslint-disable-line react/forbid-prop-types
        };

        static defaultProps = {
            size: "inherit",
            allowFontScaling: false,
            color: "currentColor",
            fontWeight: 'normal',
            fontStyle: 'normal'
        };

        render() {
            const {name, size, color, style, classNames} = this.props;

            let glyph = name ? glyphMap[name as any] || '?' : '';

            if (typeof glyph === "number") {
                glyph = String.fromCharCode(glyph);
            }
            const styleOverrides: React.CSSProperties = {
                fontFamily: fontReference,
                fontSize: size,
                color,
                ...style
            };

            return (
                <i style={styleOverrides}
                   className={classNames}
                   onClick={(event) => {
                       if (typeof this.props.onClick === "function") {
                           this.props.onClick(event);
                       }
                   }}>
                    {glyph}
                    {this.props.children}
                </i>
            );
        }
    }


    return Icon;
}
