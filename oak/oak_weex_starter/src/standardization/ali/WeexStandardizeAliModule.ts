import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";

/**
 * 标准哈ali相关的能力
 */
export interface WeexStandardizeAliModule {

    /**
     * 人脸验证
     * @param options
     */
    faceVerify: (options: FaceVerifyOptions) => Promise<void>;
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