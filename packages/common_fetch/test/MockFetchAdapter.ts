import AbstractFetchAdapter from "../src/adapter/AbstractFetchAdapter";
import {FetchOptions, FetchResponse} from "../src/FetchOptions";


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

                if (parseInt(Math.random() * 100 + "") % 2 == 0) {
                    resolve({data: 1} as any);
                } else {
                    reject({data: 0})
                }


            }, this.responseTime)
        });
    };


}