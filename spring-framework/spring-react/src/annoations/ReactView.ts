import {ConditionType} from "typescript-spring-context/src/condition/Condition";


export interface ReactViewOptions {


    /**
     * 所有的页面文件默认放在views目录下
     * 默认依据文件夹名称+文件名称用 "/" 拼接而成
     */
    pathname?: string;

    /**
     * 页面的中文名称
     * 默认 null
     */
    name?: string;


    /**
     * 是否精确匹配路径（pathname）
     * default true
     */
    exact?: boolean;

    /**
     * 进入页面的条件，例如进行登陆检查、权限检查等
     * default true
     * @param context 应用上下文
     */
    condition?: ConditionType;
}


/**
 * 用来标记一个react 组件是一个视图
 * 通过 babel-plugin-spring来处理这个标记，生成对应的路由列表，并移除该装饰器
 * @scope only compiler
 * @target Class
 * @constructor
 */
export const ReactView = (options: ReactViewOptions) => {

    return (target) => target;
};