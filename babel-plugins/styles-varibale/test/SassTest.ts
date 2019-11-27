import * as log4js from "log4js";
import * as fs from "fs";
import * as path from "path";
import sass from "node-sass";
import sassLoader from "sass-loader";

const _importsToResolve = require("sass-loader/dist/importsToResolve");

const logger = log4js.getLogger();
logger.level = 'debug';

/**
 * @see https://github.com/atroo/less-to-json-loader
 */
describe("test  less js", () => {


    test("test less js parse", async () => {

        // sassOptions.importer.push((0, _webpackImporter.default)(this.resourcePath, resolve, addNormalizedDependency));

        // const stylePath = path.join(__dirname, "./scss/theme.scss");
        // const data = await new Promise(resolve => {
        //     _webpackImporter.default(stylePath, resolve, [])
        // });
        // logger.debug(data);
        const stylePath = path.join(__dirname, "./scss/theme.scss");
        const scssStyles = fs.readFileSync(stylePath, "UTF-8");

        const scssCodes = [];

        sass.render({
            data: scssStyles,
            indentedSyntax: Boolean(true),
            outputStyle: 'compact',
            importer: [
                (url, prev, done) => {
                    const paths = ["scss", "sass"].map((extname) => {
                        return path.join(__dirname, "./scss/", `${url}.${extname}`)
                    });
                    console.log(paths);
                    const files = paths.filter((filepath) => {
                        return fs.existsSync(filepath);
                    }).map((filepath) => {
                        return fs.readFileSync(filepath, "UTF-8")
                    });
                    let code = files[0];
                    scssCodes.push(code);
                    // done(code);

                }
            ]
        }, (error, result) => {
            const cssResult = result.css.toString();
            logger.debug("------->", cssResult)
        })


    }, 10 * 1000)

});
