import ProxyFactory from "../src/ProxyFactory";
import {ProxyScope} from "../src/proxy/ProxyScope";
import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';

describe("test proxy factory", () => {

    const target = {

        prop: 1,


        a1(name) {
            logger.debug("--al-->", name, this && this.prop);
            return 'a1'
        },
        a2(...args) {
            logger.debug("--a2-->", ...args, this);
            return 'a2'
        }

    };


    test("test proxy all", () => {
        const proxy = ProxyFactory.newProxyInstance(target,
            (object: any, propertyKey: PropertyKey, receiver: any) => {
                logger.debug("proxy key", propertyKey,);
                return object[propertyKey];

            }, null, ProxyScope.ALL);
        logger.debug("proxy.prop", proxy.prop);
        logger.debug("proxy.a1", proxy.a1("李四"))
    });

    test("test proxy only method", () => {

        const proxy = ProxyFactory.newProxyInstance(target,
            (object: any, propertyKey: PropertyKey, receiver: any) => {
                logger.debug("proxy", propertyKey,);
                return (...args) => {
                    return object[propertyKey](...args);
                }
            }, null,
            ProxyScope.METHOD,
            (object, propertyKey: string) => {

                return propertyKey === "a2";
            });
        proxy.a1("张三");
        proxy.a2("张三", "李四");

    });

    test("test proxy enhance", () => {
        const proxy: any = ProxyFactory.newProxyInstanceEnhance(target,
            (object: any, propertyKey: PropertyKey, receiver: any) => {
                logger.debug("proxy", propertyKey,);
                return (...args) => {
                    return object[propertyKey];
                }
            }, (object: any, propertyKey: PropertyKey, receiver: any) => {

                return (...args) => {
                    logger.debug("enhance", ...args);
                }
            });

        proxy.a3("234", 2, 4);
    });

    test("test proxy only property", () => {
        const proxy = ProxyFactory.newProxyInstance(target,
            (object: any, propertyKey: PropertyKey, receiver: any) => {
                logger.debug("proxy", propertyKey,);
                return function (...args) {
                    return object[propertyKey];
                }
            }, null, ProxyScope.PROPERTY);
    });

    test("test proxy only set method", () => {
        const proxy = ProxyFactory.newProxyInstance(target,
            (object: any, propertyKey: PropertyKey, receiver: any) => {
                logger.debug("proxy", propertyKey,);
                return function (...args) {
                    return object[propertyKey];
                }
            }, (object: any, propertyKey: PropertyKey, value, receiver: any) => {
                logger.debug("设置属性->", propertyKey, value);
                object[propertyKey] = value;
                return true;

            }, ProxyScope.ONLY_SET);
    });
});