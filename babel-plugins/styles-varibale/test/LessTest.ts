import * as log4js from "log4js";
import * as fs from "fs";
import * as path from "path";
import less from "less";

const logger = log4js.getLogger();
logger.level = 'debug';

/**
 * @see https://github.com/atroo/less-to-json-loader
 */
describe("test  less js", () => {


    test("test less js parse", () => {

        const stylePath = path.join(__dirname, "./less/theme.less");
        const lessStyles = fs.readFileSync(stylePath, "UTF-8");

        let camelCase = false;
        let prefix = null;
        let lessVars = {};
        less.parse(lessStyles, {
            paths: [
                path.join(__dirname,"./")
                // path.join(__dirname, "../node_modules/fengwuxp_common_style/src/common/antd/mobile/themes/"),
                // path.join(__dirname, "../../../packages/common_style/src/common/antd/mobile/themes/default/")
            ],
            ext: ".less"
        }, function (err, root, imports, options) {
            if (err) {
                logger.error("------->", err);
                return;
            }
            try {
                var evalEnv = new less.contexts.Eval(options);
                var evaldRoot = root.eval(evalEnv);
                var ruleset = evaldRoot.rules;
                ruleset.forEach(function (rule) {
                    if (rule.variable === true) {
                        var name;
                        if (camelCase === false) {
                            name = rule.name.substr(1);
                        } else {
                            name = rule.name;//convertToCamelcase(rule.name.substr(1));
                        }

                        if (!prefix || name.substr(0, prefix.length) !== prefix) {
                            var value = rule.value;
                            lessVars[name] = value.toCSS(options);
                        }
                    }
                });
            } catch (err) {
                logger.error("e2", err);
            }
            // 生成变量
            console.log("lessVars ", lessVars);
        });
    })

});
