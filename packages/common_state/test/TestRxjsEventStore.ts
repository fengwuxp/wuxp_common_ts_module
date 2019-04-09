import * as log4js from "log4js";
import StoreFactory from "../src/store/StoreFactory";
import {EventProvider} from "../src/annotations/BrowserEventProvider";
import {SubscriptionEventType} from "../src/enums/SubscriptionEventType";
import {DataProvider} from "../src/provider/DataProvider";
import {BrowserEventReceiver} from "../src/annotations/BrowserEventReceiver";

const logger = log4js.getLogger();
logger.level = 'debug';

@EventProvider({
    eventType: SubscriptionEventType.CUSTOMIZED_EVENT,
    eventName: "home"
})
const getIndex = (index: number) => {

    return index;
};

interface SimpleState {

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

    queryMember = () => {

        return Promise.resolve({
            name: "张三"
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


    outStateToConsole = () => {

        logger.debug("-->");
    }

}


describe("test rxjs event store", () => {


    const store = StoreFactory.factory();


    const simpleEventReceiver:SimpleEventReceiver = new SimpleEventReceiver();

    const simpleDataProvider = new SimpleDataProvider();

    test("data provider test", async () => {
        const index = getIndex(2);
        logger.debug(index);

        simpleEventReceiver.outStateToConsole();

        simpleDataProvider.loadOrderList();

        simpleEventReceiver.outStateToConsole();
    }, 2 * 1000)

});