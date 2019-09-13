import React, {useState} from "react";


/**
 * 函数式view
 * @param props
 * @constructor
 */
const FunctionView: React.FunctionComponent<{}> = (props) => {

    const [text, changeText] = useState(0);


    return <div onClick={() => {
        changeText(text + 1);
    }}>function view {text}</div>;
};

export default FunctionView;
