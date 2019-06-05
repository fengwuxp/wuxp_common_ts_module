export interface ReactViewOptions {

    pathname: string;

    name?: string;


    /**
     * default true
     */
    exact?: boolean;

    /**
     * 进入页面的条件，例如进行权限检查
     * default true
     * @param context 应用上下文
     */
    condition?: (context) => boolean | string | boolean;
}


/**
 * 用来标记一个react 组件是一个视图
 * 通过 babel-plugin-spring来处理这个标记，生成对应的路由列表
 * @scope only compiler
 * @constructor
 */
export const ReactView = (options: ReactViewOptions) => {


};