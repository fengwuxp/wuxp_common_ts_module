const webpack = require("webpack");
const path = require("path");
const webpackConfigurationGenerator = require("typescript-spring-webpack-4/lib/index").default;


const config = webpackConfigurationGenerator();

module.exports = config;

