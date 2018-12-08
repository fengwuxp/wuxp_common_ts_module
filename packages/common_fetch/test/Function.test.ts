import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';


describe("function test", () => {

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