import * as Taro from "@tarojs/taro";
import {BaseAppView} from "common_view/src/BaseAppView";
import {NavigatorAdapter} from "common_route/src/NavigatorAdapter";
import {TaroNavigatorAdapter} from "common_route/src/adapter/taro/TaroNavigatorAdapter";


/**
 * 抽象一个基础的视图
 */
export default abstract class TaroBaseView<P, S, VP> extends Taro.Component<P, S> implements BaseAppView<any, VP> {

    //页面可以接收的参数
    viewPrams: VP;

    //导航器
    protected navigator: NavigatorAdapter = new TaroNavigatorAdapter();


    abstract renderBody?: () => any;


    backView = () => this.navigator.goBack();

    pushView = (pathname: string, state: object) => this.navigator.push({pathname, state});

    redirectView = (pathname: string, state: object) => this.navigator.redirect({pathname, state});


    componentWillMount(): void {

        //初始化路由参数

        this.viewPrams = this.$router.params
    }


}