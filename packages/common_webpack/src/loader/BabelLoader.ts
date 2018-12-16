import {isExclude} from "../utils/WebpackUtils";
const babel7Options = require("../../babel/babelrc7");

/**
 * babel-loader
 * @author wxup
 * @create 2018-09-25 9:37
 **/

const babelLoader = {
    test: /\.js[x]?$/,
    exclude: isExclude,
    use: [
        {
            loader: "babel-loader",
            options: babel7Options
        }
    ]
};

export default babelLoader
