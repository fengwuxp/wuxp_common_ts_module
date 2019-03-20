/**
 *  排除打包的包
 * @author wxup
 * @create 2018-10-09 9:09
 **/

export  const externals = {
    "react": "React",
    "react-dom": "ReactDOM",
    "moment": "moment",
    "rxjs": "rxjs",
    // "react-router": "ReactRouter",
    // "react-router-dom": "ReactRouterDOM",
    // "redux": "Redux",
    "antd-mobile": "window['antd-mobile']"
};

