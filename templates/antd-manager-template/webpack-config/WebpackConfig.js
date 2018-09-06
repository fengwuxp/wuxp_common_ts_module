const path = require("path");


const DEPLOYMENT_DIRECTORY = "";//path.join(__dirname, "../../h5-app/h5/src/main/webapp/WEB-INF/views");

/**
 * 项目跟目录
 * @type {string}
 */
const PROJECT_DIR = path.join(__dirname, "../");

module.exports={
    DEPLOYMENT_DIRECTORY,
    PROJECT_DIR
};

