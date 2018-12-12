import AbstractFetchAdapter from "../../src/adapter/AbstractFetchAdapter";
import {FetchOptions, FetchResponse} from "../../src/FetchOptions";


interface MocKFetchOptions extends FetchOptions {

}

export class MockFetchAdapter extends AbstractFetchAdapter<MocKFetchOptions> {

    private responseTime: number;


    constructor(responseTime: number = 2000) {
        super();
        this.responseTime = responseTime;
    }

    request = (options: MocKFetchOptions): Promise<FetchResponse> => {

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


}