
import {WeexModule} from "weex";


/**
 * 阿里AI
 */
export interface AliAIModule extends WeexModule {

    /**
     * 活体认证
     * @param verifyToken
     * @param params
     * @param success
     * @param failure
     */
    faceVerify: (verifyToken:string,params:any, success:Function, failure:Function) => void;
}