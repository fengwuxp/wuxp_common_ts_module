import {Topic} from "./topic/Topic";


/**
 * topic manager
 */
export interface TopicManager {


    /**
     * 获取一个topic
     * @param topicName
     */
    getTopic: <T = any>(topicName: string) => Topic<T>;

    /**
     * 移除一个topic
     * @param topicName
     */
    removeTopic: (topicName: string) => void;
}