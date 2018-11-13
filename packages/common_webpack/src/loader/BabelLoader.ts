import {isExclude} from "../utils/WebpackUtils";

/**
 * babel-loader
 * @author wxup
 * @create 2018-09-25 9:37
 **/

const babelLoader= {
    test: /\.js[x]?$/,
    exclude: isExclude,
    use: [
        {
            loader: "babel-loader",
            // options: {
            //     "presets": [
            //         [
            //             "@babel/preset-env",
            //             {
            //                 "targets": "last 2 versions, ie 11",
            //                 "modules": false
            //             }
            //         ]
            //     ]
            // }
        }
    ]
};

export  default babelLoader
