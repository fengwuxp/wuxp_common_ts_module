import {DataProvider, StateType} from "../../src/provider/DataProvider";
import {Payload} from "../../src/Payload";
import DataProviderFactory from "../../src/provider/DataProviderFactory";
import {WrapperDataProvider} from "../../src/annotations/BrowserRouteEventDataProvider";


export default class MockDataProvider implements DataProvider<any> {


    constructor() {

    }

    getProps = () => {

    }
}

const mockDataProvider = DataProviderFactory.factory<MockDataProvider>(MockDataProvider);


