/**
 * webpack 打包配置
 * @type {[string,string]}
 */
const INCLUDE_PATH = [];  //需要从node_modules引入的自己的源码模块

//开发环境请求域名
const DEV_API_ADDRESS = "";//"cp.oaknt.com";


//正式环境请求域名
const PROD_API_ADDRESS = "";

//测试h5部署目录
const TEST_H5_WEB_CONTEXT = "";

//正式h5部署目录
const PROD_H5_WEB_CONTEXT = "";

//不需要打成js文件的配置
const NATIVE_EXCLUDE_FILES = [];

module.exports = {
    INCLUDE_PATH,
    DEV_API_ADDRESS,
    PROD_API_ADDRESS,
    NATIVE_EXCLUDE_FILES,
    TEST_H5_WEB_CONTEXT,
    PROD_H5_WEB_CONTEXT

};
