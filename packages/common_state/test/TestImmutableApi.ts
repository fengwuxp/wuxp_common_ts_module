import {Collection,Map, fromJS,isKeyed} from "immutable";
import * as log4js from "log4js";


const logger = log4js.getLogger();
logger.level = 'debug';

describe("test immutable", () => {


    test("test map",()=>{

        const map:Map<string,any>= Map<string,any>();
        map.set("a",2);
        logger.debug(map.keys())
        logger.debug(map.get("a",1));

    });


    test("test fromJs", () => {

        const reviver = (key, value, path) => {
            logger.debug("key=",key||"1234");
            logger.debug("value=",value);
            logger.debug("path=",path);
            return isKeyed(value) ? value.toOrderedMap() : value.toList()
        };
        const object = fromJS({
            a: "123",
            b: {
                k: "2",
                z: 3
            }
        });

        // logger.debug(object)

        logger.debug(object.get("a"));
        logger.debug(object.b);
        // object.set("c",1);
        object.set("d",2);
        logger.debug(object.get("d"));
        object.set("d",{h:2});
        logger.debug(object.get("d"));
    })

});