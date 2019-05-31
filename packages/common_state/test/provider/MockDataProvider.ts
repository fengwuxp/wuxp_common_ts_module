import {AbstractDataProvider, DataProvider, StateType} from "../../src/provider/DataProvider";
import {Payload} from "../../src/Payload";
import DataProviderFactory from "../../src/provider/DataProviderFactory";
import {WrapperDataProvider} from "../../src/annotations/BrowserRouteEventDataProvider";


@WrapperDataProvider({})
export default class MockDataProvider extends AbstractDataProvider {


    constructor() {
        super();
    }

    defaultState = <K extends keyof S>(): (StateType<S, K> | Promise<StateType<S, K>>) => {
        return null;
    };


    getProps = () => {

    }
}

// const mockDataProvider = DataProviderFactory.factory<MockDataProvider>(MockDataProvider);
const mockDataProvider: MockDataProvider = new MockDataProvider();

