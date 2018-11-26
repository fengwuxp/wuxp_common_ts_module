import {isExclude} from "../utils/WebpackUtils";
import babel7Options from "../../babel/babelrc7";

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
            // options: {
            //     presets: [
            //         [
            //             "@babel/preset-env"
            //         ]
            //     ]
            // }
        }
    ]
};

export default babelLoader
