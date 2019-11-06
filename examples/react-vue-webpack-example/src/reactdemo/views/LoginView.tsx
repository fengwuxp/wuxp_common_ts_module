import React from "react";
import {history} from "../AppRouterHelper"

export default () => {


    return <div>
        login view

        <a href="javascript:;" onClick={() => {
            history.push({
                pathname: "register"
            })
            return false
        }}>to rgister</a>
    </div>
};
