import * as React from "react";
import {ScrollBar, ScrollBarProps, ScrollBarState} from "./ScrollBar";


interface DefaultScrollBarProps extends ScrollBarProps{

}

interface DefaultScrollBarState extends ScrollBarState{

}

/**
 * 默认的滚动条
 * @author wxup
 * @create 2018-09-10 22:07
 **/
export default class DefaultScrollBar extends React.Component<DefaultScrollBarProps, DefaultScrollBarState>
    implements ScrollBar<DefaultScrollBarProps,DefaultScrollBarState> {


}
