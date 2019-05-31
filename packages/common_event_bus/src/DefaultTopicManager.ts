import {TopicManager} from "./TopicManager";
import {Topic} from "./topic/Topic";
import RxjsTopic from "./topic/RxjsTopic";


class DefaultTopicManager implements TopicManager {


    protected topicMap: Map<string, Topic> = new Map<string, Topic>();


    getTopic = <T = any>(topicName: string) => {
        if (this.topicMap.has(topicName)) {
            return this.topicMap.get(topicName);
        }

        const rxjsTopic = new RxjsTopic<T>(topicName);

        this.topicMap.set(topicName, rxjsTopic);
        return rxjsTopic;
    };

    removeTopic = (topicName: string) => {
        if (this.topicMap.has(topicName)) {
            const topic = this.topicMap.get(topicName);
            //关闭 topic
            topic.close();
            this.topicMap.delete(topicName);
        }

    };
}


export default new DefaultTopicManager();