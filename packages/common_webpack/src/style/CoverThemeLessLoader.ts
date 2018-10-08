import * as ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
import {cssModuleLoader} from "./CssModuleUtils";
import {GetWebpackBaseConfigOptions} from "../GetWebpackBaseConfigOptions";
import PostCssLoader from "./PostCssLoader";
import {getThemeConfig} from "./ThemeConfig";


function getLessLoader(options?: GetWebpackBaseConfigOptions) {
    let isPackage, theme;

    if (options == null) {
        options = {};
    }

    isPackage = options.packagePath !== undefined && options.packagePath !== null;
    theme = getThemeConfig(isPackage ? options.packagePath : options.themePath, isPackage);

    return {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
            fallback: "style-loader",
            use: [
                cssModuleLoader,
                PostCssLoader,
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                        javascriptEnabled: true,
                        modifyVars: theme,
                        ident: "css-loader"
                    }
                }
            ]
        })
    }
}

export default getLessLoader;
