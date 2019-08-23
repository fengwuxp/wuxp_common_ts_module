import AbstractFetchAdapter from "../AbstractFetchAdapter";
import {FetchOptions, FetchResponse} from "../../FetchOptions";


export type MockDataType = (options: FetchOptions) => Promise<any> | any;

/**
 * mock fetch adapter
 */
export default class MockFetchAdapter extends AbstractFetchAdapter<FetchOptions> {

    protected mockDataSource: Record<string, MockDataType> = {};

    //是否启用参数匹配
    // protected enabledParamsPattern: boolean = false;

    constructor(mockDataSource: Record<string, any>) {
        super();
        this.mockDataSource = mockDataSource || {};
    }

    request = (options: FetchOptions): Promise<FetchResponse> => {

        const {url} = options;
        const key = url.split("?")[0];
        const result: MockDataType = this.mockDataSource[key];
        if (result == null) {
            const response: Response = {
                status: 404,
                statusText: "Not Found",
                ok: false,
                url,
                redirected: null,
                headers: null
            } as any;
            return Promise.reject(this.resolveResponse.resolve(response));
        }

        if (typeof result === "function") {
            return result(options);
        }

        return Promise.resolve(result);
    };

    /**
     * 设置模拟数据
     * @param url
     * @param data
     */
    setMockData = (url: string, data: MockDataType) => {
        this.mockDataSource[url] = data;
    }

}