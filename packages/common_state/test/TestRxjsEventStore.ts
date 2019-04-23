import * as log4js from "log4js";
import StoreFactory from "../src/store/StoreFactory";
import {EventProvider, WrapperMethodToProvider} from "../src/annotations/BrowserEventProvider";
import {SubscriptionEventType} from "../src/enums/SubscriptionEventType";
import {DataProvider} from "../src/provider/DataProvider";
import {BrowserEventReceiver} from "../src/annotations/BrowserEventReceiver";

const logger = log4js.getLogger();
logger.level = 'debug';


const getIndex = (index: number) => {

    return index;
};

// type IndexProviderMethod = (index: number) => Promise<number>;

const _getIndexProvider= WrapperMethodToProvider<number,number>({
    eventType: SubscriptionEventType.CUSTOMIZED_EVENT,
    eventName: "member"
})(getIndex);

interface SimpleState {

    index: number,

    member: {
        name: string;
        age: number;
    }

    orderList: Array<{
        id: number;
        sn: string;
    }>
}

@EventProvider({
    eventType: SubscriptionEventType.CUSTOMIZED_EVENT,
    eventName: "member"
})
class SimpleDataProvider implements DataProvider<SimpleState> {

    defaultState = <SimpleState>(): SimpleState => {

        return {
            index: 0,
            member: null,
            orderList: []
        } as SimpleState;
    };


    queryMember = (): Promise<{
        name: string;
        age: number;
    }> => {

        return Promise.resolve({
            name: "张三",
            age: 1
        });
    };

    loadOrderList = () => {

        return Promise.resolve([
            {id: 1, sn: "2"},
            {id: 3, sn: "444"},
        ]);
    }

}

@BrowserEventReceiver({
    eventType: SubscriptionEventType.CUSTOMIZED_EVENT,
    eventName: "member"
})
class SimpleEventReceiver {

    private state: SimpleState = null;

    constructor(state: SimpleState) {
        this.state = state;
        logger.debug("state", this.state);
    }

}


describe("test rxjs event store", () => {


    const store = StoreFactory.factory();

    // const simpleEventReceiver: SimpleEventReceiver = (SimpleEventReceiver as any)();


    const simpleDataProvider = new SimpleDataProvider();

    test("data provider test", async () => {
        const index = await _getIndexProvider(2);
         logger.debug(index);

        simpleDataProvider.loadOrderList();
        simpleDataProvider.queryMember();


    }, 2 * 1000)

});