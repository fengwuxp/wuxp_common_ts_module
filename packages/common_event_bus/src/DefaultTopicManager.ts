import {TopicManager} from "./TopicManager";
import {Topic} from "./topic/Topic";
import RxjsTopic from "./topic/RxjsTopic";


class DefaultTopicManager implements TopicManager {


    protected topicMap: Map<string, Topic> = new Map<string, Topic>();


    getTopic = <T = any>(topicName: string) => {
        if (this.topicMap.has(topicName)) {
            return this.topicMap.get(topicName);
        }

        return new RxjsTopic<T>(topicName);
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