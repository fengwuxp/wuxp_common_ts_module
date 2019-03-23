/**
 * 数据提供者
 */
export interface DataProvider {


}

export class DefaultDataProvider implements DataProvider {

    /**
     * 全局
     */
    private globalStore = {};

    /**
     * 按照事件类型分发的数据
     */
    private eventStore = {};


    setGlobalValue = (key: string, value: any) => {
        this.globalStore[key] = value;
    }


}