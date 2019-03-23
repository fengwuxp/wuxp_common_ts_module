import webpackConfig from "./webpack.base.config";
import {uglifyJsPlugin} from "../../plugins/UglifyJsPluginConfig";

const prodConfig = {
    ...webpackConfig
};

prodConfig.plugins.push(uglifyJsPlugin);
prodConfig.mode = "production";
prodConfig.devtool = false;




export default prodConfig;
