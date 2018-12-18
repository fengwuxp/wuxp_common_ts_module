/**
 * url 参数解析器
 */
export interface URLArgumentsResolve {


    argumentsToString: (...args) => string;

    parseArguments: (url:string,...args) => string;
}