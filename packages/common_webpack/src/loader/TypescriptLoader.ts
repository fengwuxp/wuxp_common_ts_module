import {isExclude} from "../utils/WebpackUtils";

/**
 * awesome-typescript-loader
 * @author wxup
 * @create 2018-09-25 9:39
 **/

const awesomeTypescriptLoader = {
    test: /\.ts[x]?$/,
    exclude: isExclude,
    use: [
        {
            loader: "babel-loader",
            options: {
                "presets": [
                    [
                        "@babel/preset-env",
                        {
                            "targets": "last 2 versions, ie 11",
                            "modules": false
                        }
                    ]
                ]
            }
        },
        {loader: "awesome-typescript-loader"}
    ]
};


export default awesomeTypescriptLoader;
