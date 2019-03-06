/**
 * 简单的 dom 操作
 * @link {https://weex.apache.org/zh/docs/api/weex-variable.html#document}
 */
import {isWeb} from "../constant/WeexEnv";

interface AppendElementOptions {

    /**
     * 要添加的组件
     */
    component: any;

    /**
     * 组件的props
     */
    props?: any;

    /**
     * 监听的事件
     */
    on?: Record<string, Function>;
}

/**
 *组件实例持有者
 */
interface ComponentHolder {

    /**
     * 组件的引用
     */
    readonly  ref: any;

    /**
     * 移除组件实例
     */
    readonly remove: () => void;
}

/**
 * 添加组件元素到页面中
 * @param options
 * @return 组件示例持有者
 */
export const appendElementToView = (options: AppendElementOptions): ComponentHolder => {

    const {component, props, on} = options;

    // @ts-ignore
    const VueComponent = Vue.extend(component);

    //实例化组件
    const instance = new VueComponent().$mount();

    //给组件赋值
    for (const key in props) {
        instance[key] = props[key];
    }
    if (on != null) {
        for (const method in on) {
            instance.$listeners[method] = on[method];
        }
    }

    addNode(instance);
    return {
        ref: instance,
        remove: () => removeNode(instance)
    };
};

/**
 * 添加节点
 * @param instance
 */
const addNode = (instance) => {
    if (isWeb) {
        document.body.appendChild(instance.$el);
    } else {
        weex.document.body.appendChild(instance.$el);
    }
};

/**
 * 移除节点
 * @param instance
 */
const removeNode = (instance) => {
    if (isWeb) {
        document.body.removeChild(instance.$el);
    } else {
        weex.document.body.removeChild(instance.$el);
    }
};