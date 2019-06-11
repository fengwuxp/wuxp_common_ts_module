import * as webpack from "webpack";

export interface WebpackConfigurationGeneratorOptions {

}


export type WebpackConfigurationGenerator = (options: WebpackConfigurationGeneratorOptions) => webpack.Configuration;