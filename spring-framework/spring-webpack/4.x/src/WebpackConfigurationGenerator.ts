import * as webpack from "webpack";
import {SpringWebpackConfiguration} from "typescript-spring-context/src/configuration/webpack/SpringWebpackConfiguration";

export interface WebpackConfigurationGeneratorOptions extends SpringWebpackConfiguration {


}


export type WebpackConfigurationGenerator = (options: WebpackConfigurationGeneratorOptions) => webpack.Configuration;