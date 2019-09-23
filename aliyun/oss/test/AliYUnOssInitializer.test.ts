import * as log4js from "log4js";
import OakALiYunOssInitializer, {OakALiYunOssInitializerOptions} from "../src";
import {ALiYunOssInitializer} from "../src/faactory/ALiYunOssInitializer";
import AliOssClient from "ali-oss";

const logger = log4js.getLogger();
logger.level = 'debug';


describe("function test", () => {

    let oakALiYunOssInitializer: ALiYunOssInitializer<OakALiYunOssInitializerOptions> = new OakALiYunOssInitializer();

    test("test", () => {

        oakALiYunOssInitializer.initFactory({
            getConfigUrl: () => {
                //接口调用
                return Promise.resolve()
            },
            // getStsTokenUrl: () => {
            //     //接口调用
            //     return Promise.resolve()
            // }
            getStsTokenUrl: ""
        }).then((factory) => {
            const client = factory.factory();

            client.multipartUpload("", null, {})
                .then(({res, name, bucket}) => {
                    logger.log("上传成功");
                }).catch((e) => {
                logger.log("上传失败", e);
            })

        })
    })
});
