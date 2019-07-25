import {ViewMapping, ViewMappingOptions} from "fengwuxp-spring-router/src/annotations/ViewMapping";


export interface ReactViewOptions extends ViewMappingOptions {

    /**
     * 父页面
     * 默认 null
     */
    parent?: any
}


/**
 * 用来标记一个react 组件是一个视图
 * 通过 babel-plugin-spring来处理这个标记，生成对应的路由列表，并移除该装饰器
 * @scope only compiler
 * @target Class
 * @constructor
 */
export const ReactViewMapping: ViewMapping<ReactViewOptions> = (options: ReactViewOptions) => {

    return (target) => target;
};