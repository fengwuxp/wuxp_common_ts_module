import {standardizedWeexModuleToPromise} from "fengwuxp_common_weex/src/sdk/standardization/StandardizationHelper";
import {WeexStandardizedModule} from "fengwuxp_common_weex/src/sdk/standardization/WeexStandardizedModule";

/**
 * 标准化ali相关的能力
 * 文档地址：https://help.aliyun.com/document_detail/61362.html#FVBioOnly
 */
export interface WeexStandardizeAliModule extends WeexStandardizedModule {


    /**
     * 人脸验证
     * @param options
     */
    readonly faceVerify: (options: FaceVerifyOptions) => Promise<void>;
}

interface FaceVerifyOptions {

    /**
     * 调用客户端sdk验证
     */
    token: string;
}

const weexStandardizeAliModule: WeexStandardizeAliModule = standardizedWeexModuleToPromise<WeexStandardizeAliModule>({
    module: weex.requireModule("aliAI"),
    transformParamMap: {
        faceVerify: (options: FaceVerifyOptions) => {
            return [
                options.token,
                {}
            ];
        }

    },
    transformCallbackMap: {},


});

export default weexStandardizeAliModule