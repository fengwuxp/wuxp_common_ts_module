import {ALiYunOssInitializerOptions, OssClientOptionalOptions} from "./faactory/ALiYunOssInitializer";
import OakALiYunOssInitializer from "./index";


const ossVersion = "6.1.1";

//自动引入oss
// const ossScript = document.createElement("script");
// ossScript.src = `http://gosspublic.alicdn.com/aliyun-oss-sdk-${ossVersion}.min.js`;
// const body = document.getElementsByTagName("body").item(0);
// body.appendChild(ossScript);


module.exports = new OakALiYunOssInitializer();






