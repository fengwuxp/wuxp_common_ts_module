import {EventReceiverRouteView, EventReceiverRouteViewOptions} from "./EventReceiverRouteView";
import {EventReceiver} from "../receiver/EventReceiver";
import {pushEventReceiver} from "../receiver/EventRecelverRegistrationCenter";
import {SubscriptionEventType} from "../enums/SubscriptionEventType";
import {EventReceiverOptions} from "../annotations/BrowserEventReceiver";

const defaultOptions: EventReceiverOptions = {

    eventType: SubscriptionEventType.ROUTE,

};


/**
 * react route view
 * @param options
 * @constructor
 */
export const ReactRouteView: EventReceiverRouteView = (options: EventReceiverRouteViewOptions) => {


    const _options = {
        ...defaultOptions,
        ...options
    };

    /**
     * decorator
     * @param  {T} ReactComponent                        装饰的属性所属的类的原型，注意，不是实例后的类。如果装饰的是 T 的某个属性，这个 target 的值就是 T.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function (ReactComponent: any, name: string, descriptor: PropertyDescriptor): any {


        let eventProps = {};

        const receiver = (newProps) => eventProps = newProps;

        const wrapperComponent: EventReceiver = (props) => {

            return <ReactComponent {...props} {...eventProps}/>;
        };

        pushEventReceiver(_options, receiver);


        return wrapperComponent;
    }
};