import {isExclude} from "../hepler/WebpackLoaderHelper";


const babel7Options = require("../../../common/babel/babelrc7");


/**
 * babel-loader
 * @author wxup
 * @create 2018-09-25 9:37
 **/
const babelLoaderName = "babel-loader";

export const babel7Loader = {
    test: /\.js[x]?$/,
    exclude: isExclude,
    use: [
        {
            loader: babelLoaderName,
            options: babel7Options
        }
    ]
};

