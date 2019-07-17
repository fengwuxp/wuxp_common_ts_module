import { Component } from "@tarojs/taro";
/**
 * 抽象的页面视图
 */
export default abstract class AbstractView<P, S> extends Component<P, S> {
    protected push: (params: import("fengwuxp_common_route/src/NavigatorAdapter").NavigatorDescriptorObject) => Promise<void>;
    protected redirect: (params: import("fengwuxp_common_route/src/NavigatorAdapter").NavigatorDescriptorObject) => Promise<void>;
    protected goBack: (num?: number) => Promise<void>;
    protected toIndex: () => Promise<void>;
}
