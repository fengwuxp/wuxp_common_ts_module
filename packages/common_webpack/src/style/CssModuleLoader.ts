import {genHappyPackLoaderString, getHappyPackPlugin} from "../utils/GetHappyPackPluginConfig";

export const cssModuleLoader = genHappyPackLoaderString("css");


export const happyPackCssLoaderPlugin = getHappyPackPlugin("css", [
    ({resource}) => ({
        ident: "css-loader",
        loader: 'css-loader',
        options: {
            minimize: true,
            importLoaders: 2,
            //判断是否需要css module
            modules: /\.module\.css/.test(resource),
            localIdentName: '[name]__[local]___[hash:base64:5]',
            ident: "css-loader"
        }
    })
],2);


