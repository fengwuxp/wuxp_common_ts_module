import AbstractArgumentsResolver from "common_fetch/src/resolve/arguments/AbstractArgumentsResolver"
import {FetchOptions} from "common_fetch/src/fetch/FetchOptions";


export default class CustomArgumentsResolver extends AbstractArgumentsResolver<FetchOptions> {


    constructor() {
        super();
        // AbstractArgumentsResolver.enabledDecorator = enabledDecorator;
    }

    buildOptions = (options: FetchOptions, data: object): FetchOptions => {

        //TODO 加入鉴权参数


        return {
            ...options,
            ...data
        };
    }


}