import * as React from "react";
import Spin from "../spin";


// const containerStyle: React.CSSProperties = {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(55,55,55,.2)",
//     zIndex: 99999
// };

/**
 * 加载中
 */
export default class Loading extends React.Component<any, any> {
    render() {
        // return <div style={containerStyle}>
        //     <Spin spinning={true}/>
        // </div>

        return <Spin spinning={true}/>;
    }
}

