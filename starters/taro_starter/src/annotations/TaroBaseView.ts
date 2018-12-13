import {RouteView} from "common_view/src/RouteView";
import * as Taro from "@tarojs/taro";
import {NavigatorAdapter} from "common_route/src/NavigatorAdapter";
import {TaroNavigatorAdapter} from "common_route/src/adapter/taro/TaroNavigatorAdapter";


export interface TaroBaseView<T = any> extends RouteView<T> {

    navigator: NavigatorAdapter;

}

/**
 * 由于Taro不支持 继承Taro.Component，使用装饰器
 * tarView
 * @constructor
 */
export function TaroView<T extends Taro.Component>(): any {

    /**
     * @param  {T} clazz
     */
    return (clazz: any): any => {

        return class extends clazz implements TaroBaseView {
            //     //导航器
            navigator: NavigatorAdapter = new TaroNavigatorAdapter();


            constructor(props: any, context: any) {
                super(props, context);
            }

            backView = () => this.navigator.goBack();

            pushView = (pathname: string, state: object) => this.navigator.push({pathname, state});

            redirectView = (pathname: string, state: object) => this.navigator.redirect({pathname, state});


        }
    }

}