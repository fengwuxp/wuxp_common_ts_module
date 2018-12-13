// import * as Taro from "@tarojs/taro";
// import {BaseAppView} from "common_view/src/BaseAppView";
// import {NavigatorAdapter} from "common_route/src/NavigatorAdapter";
// import {TaroNavigatorAdapter} from "common_route/src/adapter/taro/TaroNavigatorAdapter";
//
//
// /**
//  * 抽象一个基础的视图
//  * Taro 不支持 坑...
//  */
// export default abstract class TaroBaseView<P, S> extends Taro.Component<P, S> implements BaseAppView<any, any> {
//
//
//     //导航器
//     protected navigator: NavigatorAdapter = new TaroNavigatorAdapter();
//
//
//     constructor(props: P, context: any) {
//         super(props, context);
//     }
//
//     backView = () => this.navigator.goBack();
//
//     pushView = (pathname: string, state: object) => this.navigator.push({pathname, state});
//
//     redirectView = (pathname: string, state: object) => this.navigator.redirect({pathname, state});
//
//
//
//
// }