import {isExclude} from "../utils/WebpackUtils";
import {genHappyPackLoaderString, getHappyPackPlugin} from "../utils/GetHappyPackPluginConfig";

const babel7Options = require("../../babel/babelrc7");


/**
 * babel-loader
 * @author wxup
 * @create 2018-09-25 9:37
 **/
const babelLoaderName = "babel-loader";
const babelLoader = {
    test: /\.js[x]?$/,
    exclude: isExclude,
    use: [
        {
            loader: babelLoaderName,
            options: babel7Options
        }
    ]
};

// export const happyPackBabelLoaderPlugin = getHappyPackPlugin(babelLoaderName, [
//     {
//         loader: babelLoaderName,
//         options: babel7Options
//     }
// ]);

export default babelLoader;
