import template from "art-template";

import * as log4js from "log4js";
import * as path from "path";
import * as fs from "fs";

const logger = log4js.getLogger();
logger.level = 'debug';

describe('art template test', () => {

    template.defaults.loader = (filename: string, options) => {
        const templateFilePath = path.resolve(__dirname, filename);
        const text = fs.readFileSync(templateFilePath, "utf-8");
        return text;
    };



    test("test code generator", () => {
        const paths = "../../resources/react/ReactRouterConfigCodeTemplate.art";

        const result = template(paths, {
            routes: [
                {
                    name: "测试页面1",
                    pathname: "/test",
                    exact: true,
                    component: "../../test/TestView",
                    routes:[
                        {
                            name: "测试子页面",
                            pathname: "/test",
                            exact: true,
                            component: "../../test/TestSubView",
                        }
                    ]
                },
                {
                    name: "首页",
                    pathname: "/home",
                    exact: true,
                    component: "../../home/HomeView",

                }
            ]
        });


        fs.writeFile(path.resolve(__dirname,"./ReactRouterConfig.ts"),
            result,
            {flag: "w+"},
            (e) => {
                logger.debug(e)
            });

        logger.debug("result", result)
    });

});
