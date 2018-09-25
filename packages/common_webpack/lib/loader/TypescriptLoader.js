"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebpackUtils_1 = require("../utils/WebpackUtils");
/**
 * awesome-typescript-loader
 * @author wxup
 * @create 2018-09-25 9:39
 **/
var awesomeTypescriptLoader = {
    test: /\.ts[x]?$/,
    exclude: WebpackUtils_1.isExclude,
    use: [
        {
            loader: "babel-loader",
            options: {
                "presets": [
                    [
                        "@babel/preset-env",
                        {
                            "targets": "last 2 versions, ie 11",
                            "modules": false
                        }
                    ]
                ]
            }
        },
        { loader: "awesome-typescript-loader" }
    ]
};
exports.default = awesomeTypescriptLoader;
