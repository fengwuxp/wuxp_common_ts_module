import {WrapperDataProvider} from "common_state/src/annotations/BrowserRouteEventDataProvider";
import {DataProvider} from "common_state/src/provider/DataProvider";
import {HomeViewProps} from "../views/HomeView";


@WrapperDataProvider({})
export default class HomeDataProvider implements DataProvider<HomeViewProps> {

    defaultState = <K extends keyof HomeViewProps>() => {
        return {
            name: "李四",
            total: 11,
            simpleObject: {}
        }
    };

    getName = () => {
        return "张三"
    };

    getTotal = () => {
        return 12;
    };

    getSimpleObject = () => {
        return {
            a: "2",
            b: 3
        }
    }
}