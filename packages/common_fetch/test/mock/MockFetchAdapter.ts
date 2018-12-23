import AbstractFetchAdapter from "../../src/adapter/AbstractFetchAdapter";
import {FetchOptions, FetchResponse} from "../../src/FetchOptions";
import {WebFetchOptions} from "../../src/adapter/web/WebFetchOptions";
import {RequestMethod} from "../../src/constant/RequestMethod";


interface MocKFetchOptions extends FetchOptions {

}

export class MockFetchAdapter extends AbstractFetchAdapter<MocKFetchOptions> {

    private responseTime: number;


    constructor(responseTime: number = 2000) {
        super();
        this.responseTime = responseTime;
    }

    request = (options: MocKFetchOptions): Promise<FetchResponse> => {

        console.debug(this.buildRequest(options));
        return new Promise<FetchResponse>((resolve, reject) => {

            setTimeout(() => {
                const result = parseInt(Math.random() * 100 + "") % 6 === 0;
                console.debug("mock request result--> ", result);
                if (result) {
                    resolve({result} as any);
                } else {
                    reject({
                        result,
                        status: 200
                    });
                }


            }, this.responseTime);
        });
    };

    /**
     * 构建请求对象
     * @param {WebFetchOptions} options
     * @return {Request}
     */
    private buildRequest(options: WebFetchOptions): any {
        let {
            url,
            method,
            headers,
            data,
            mode
        } = options;


        const reqMethodElement = RequestMethod[method];

        //构建Request请求对象
        const reqOptions = {
            method: reqMethodElement,
            headers,
            body: data,
            mode
        };

        return reqOptions;
    }


}