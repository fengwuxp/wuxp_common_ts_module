import * as ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
import {cssModuleLoader} from "./CssModuleLoader";
import {GetWebpackBaseConfigOptions} from "../GetWebpackBaseConfigOptions";
import PostCssLoader from "./PostCssLoader";
import {getThemeConfig} from "./ThemeConfig";
import {genHappyPackLoaderString, getHappyPackPlugin} from "../utils/GetHappyPackPluginConfig";


export const lessLoader={
    test: /\.less$/,
    use: ExtractTextWebpackPlugin.extract({
        fallback: "style-loader",
        use: [
            cssModuleLoader,
            PostCssLoader,
            genHappyPackLoaderString("less")
        ]
    })
};

export const getHappyLessLoaderPlugin = (options?: GetWebpackBaseConfigOptions) => {
    let isPackage, theme;

    if (options == null) {
        options = {};
    }

    isPackage = options.packagePath !== undefined && options.packagePath !== null;
    theme = getThemeConfig(isPackage ? options.packagePath : options.themePath, isPackage);
    return getHappyPackPlugin("less", [
        {
            loader: 'less-loader',
            options: {
                sourceMap: true,
                javascriptEnabled: true,
                modifyVars: theme,
                ident: "css-loader"
            }
        }
    ],2);
};


