import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';


const testFn=(name:string,age:number)=>{
   //  logger.debug(arguments[Symbol.iterator].name);
   //
   // // logger.debug( arguments.callee.name);
   //
   //  const a=arguments;
   //  const argument = arguments[0];
   //  logger.debug( argument);
};

const testFn2=()=>{
    // var arguments1:IArguments = arguments;


};


describe("function test", () => {


    test("fn",()=>{

        let routingUrl = "@testApiModule/{member}/{queryId}";

        if (!/\{\w*\}/.test(routingUrl)) {
            return;
        }

        let searchValue = /\{(.+?)\}/g;
        let matchArray = routingUrl.match(searchValue);

        logger.debug(matchArray);

        logger.debug(matchArray[1]);
        const map = {
            "member": "124",
            "queryId": "abc"
        };

        routingUrl = routingUrl.replace(searchValue, function ($1, $2, $3, $4, $5, $6) {
            // logger.debug($1, $2, $3, $4, $5, $6);
            logger.debug("map[$2]", map[$2]);
            let s = `${map[$2]}`;
            delete map[$2];
            return s;
        });
        logger.debug(map)
        logger.debug(routingUrl)

    });

    test("test", () => {

        let routingUrl = "@testApiModule/test/query";

        let searchValue = /^@(.+?)\//;
        let matchArray = routingUrl.match(searchValue);

        logger.debug(matchArray);

        logger.debug(matchArray[1]);

        const map = {
            "testApiModule": "https://test.api.com/api"
        };

        routingUrl = routingUrl.replace(searchValue, function ($1, $2, $3, $4, $5, $6) {
            logger.debug($1, $2, $3, $4, $5, $6);
            logger.debug("map[$2]", map[$2]);
            return `${map[$2] || "default"}/`;
        });
        logger.debug(routingUrl)

    })
});