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
                const result = parseInt(Math.random() * 100 + "") % 4 === 0;
                console.debug("mock request result--> ", result);
                if (result) {
                    resolve({data: 1} as any);
                } else {
                    reject({
                        data: 0,
                        status: 200
                    });
                }


            }, 2 * 1000);
        });
    };


}