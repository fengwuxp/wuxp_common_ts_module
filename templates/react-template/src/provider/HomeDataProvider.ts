import {WrapperDataProvider} from "fengwuxp_common_state/src/annotations/BrowserRouteEventDataProvider";
import {DataProvider} from "fengwuxp_common_state/src/provider/DataProvider";
import {HomeViewProps} from "../views/HomeView";
import {StateType} from "fengwuxp_common_state/src/provider/DataProvider";


@WrapperDataProvider({})
class HomeDataProvider implements DataProvider<HomeViewProps> {

    setState: <K extends keyof HomeViewProps>(state: StateType<HomeViewProps, K>) => void;


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
        return new Promise(resolve => {

            setTimeout(() => {
                resolve(1111);
            }, 3000);
        });
    };

    getSimpleObject = () => {
        return {
            a: "2",
            b: 3
        }
    }
}

const homeDataProvider = new HomeDataProvider();



export default homeDataProvider;