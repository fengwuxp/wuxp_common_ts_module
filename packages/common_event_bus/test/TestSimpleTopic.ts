import * as log4js from "log4js";
import {Topic} from "../src/topic/Topic";
import SimpleTopic from "../src/topic/SimpleTopic";
import RxjsTopic from "../src/topic/RxjsTopic";
import DefaultTopicManager from "../src/DefaultTopicManager";

const logger = log4js.getLogger();
logger.level = 'debug';


describe("test", () => {


    test("topic simple", async () => {

        const topic: Topic = new SimpleTopic();

        const subscriptionHolder = topic.subscribe((data) => {
            logger.debug(data)
        });

        topic.subscribe((data) => {
            logger.debug("---->", data);
        });

        const publisher = topic.getPublisher();

        publisher.publish(1);
        publisher.publish(2);
        subscriptionHolder.unsubscribe();
        publisher.publish(3);

        topic.close();
        topic.close();
        try {
            publisher.publish(3);
        } catch (e) {
            logger.error(e)
        }
    }, 3 * 1000);


    test("topic rxjs", async () => {

        const topic: Topic<number> = new RxjsTopic<number>();

        const subscriptionHolder = topic.subscribe((data) => {
            logger.debug(data)
        });

        topic.subscribe((data) => {
            logger.debug("--rxjs-->", data);
        }, () => {
            logger.debug("--rxjs--> complete");
        });

        const publisher = topic.getPublisher();

        publisher.publish(1);
        publisher.publish(2);
        subscriptionHolder.unsubscribe();
        publisher.publish(3);

        topic.close();
        topic.close();
        try {
            publisher.publish(3);
        } catch (e) {
            logger.error(e)
        }
    }, 3 * 1000);


    test("topic manager", async () => {

        const topic: Topic<number> = DefaultTopicManager.getTopic("");

        const subscriptionHolder = topic.subscribe((data) => {
            logger.debug(data)
        });

        topic.subscribe((data) => {
            logger.debug("--rxjs-->", data);
        }, () => {
            logger.debug("--rxjs--> complete");
        });

        const publisher = topic.getPublisher();

        publisher.publish(1);
        publisher.publish(2);
        subscriptionHolder.unsubscribe();
        publisher.publish(3);

        topic.close();
        topic.close();
        try {
            publisher.publish(3);
        } catch (e) {
            logger.error(e)
        }
    }, 3 * 1000);

});
