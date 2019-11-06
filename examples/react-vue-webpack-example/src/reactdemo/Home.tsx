import React from "react";
import "./styles";
import * as styles from "./styles.module.less";
import "./css-variable";
import {history} from "./AppRouterHelper"

export const Home = (props) => {

    return <div className="home_container">
        <p className={styles.home_text}>这是一个react的demo</p>
        <a href="javascript;">css 变量</a>
        <p href="javascript;"
           onClick={() => {
               history.push({
                   pathname: "/login"
               })
           }}>to login</p>
    </div>
};
