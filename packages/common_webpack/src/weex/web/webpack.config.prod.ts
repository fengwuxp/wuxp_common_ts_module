import webpackConfig from "./webpack.base.config";
import {uglifyJsPlugin} from "../../plugins/UglifyJsPluginConfig";

webpackConfig.plugins.push(uglifyJsPlugin);
webpackConfig.mode = "production";

export default webpackConfig;
