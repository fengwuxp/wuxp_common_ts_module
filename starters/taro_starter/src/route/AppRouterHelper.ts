
import {TaroNavigatorAdapter} from "./TaroNavigatorAdapter";
import TaroJsHolder from "../TaroJsHolder";


/**
 * router helper
 */
export default class AppRouterHelper {


    private static navigator: TaroNavigatorAdapter = new TaroNavigatorAdapter(TaroJsHolder.TARO);

    public static push = AppRouterHelper.navigator.push;

    public static redirect = AppRouterHelper.navigator.redirect;


    public static goBack = AppRouterHelper.navigator.goBack;

    public static toIndex = () => AppRouterHelper.push({
        pathname: "/index/index"
    });
}