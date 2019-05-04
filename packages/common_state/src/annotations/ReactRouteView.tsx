import TopicManager from "common_event_bus/src/DefaultTopicManager";
import {ApplicationTopicType} from "../enums/ApplicationTopicType";
import {useState, useEffect} from "react";
import {Payload} from "../Payload";

export interface ReactRouteViewOptions {

    /**
     * 路由名称
     */
    pathname?: string;
}


/**
 * react route view
 * @param options
 * @constructor
 */
export const ReactRouteView = (options: ReactRouteViewOptions) => {


    /**
     * decorator
     * @param  {T} ReactComponent                        装饰的属性所属的类的原型，注意，不是实例后的类。如果装饰的是 T 的某个属性，这个 target 的值就是 T.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function (ReactComponent: any, name: string, descriptor: PropertyDescriptor): any {


        const WrapperComponent = (props) => {

            const {eventProps, updateEventProps} = useState({});

            useEffect(() => {
                const topic = TopicManager.getTopic(ApplicationTopicType.ROUTE);
                const pathname = location.pathname;
                console.log(`订阅路由主题 pathname = ${pathname}`);
                const subscriptionHolder = topic.subscribe((data: Payload) => {

                    if (data.type === pathname) {
                        updateEventProps(data.value)
                    }
                });

                return () => {
                    console.log(`取消订阅路由主题 pathname =${pathname}`);
                    subscriptionHolder.unsubscribe();
                }
            });

            return <ReactComponent {...props} {...eventProps}/>;
        };

        return WrapperComponent;
    }
};