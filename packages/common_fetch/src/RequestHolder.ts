/**
 * 请求实例持有者
 */
export interface RequestHolder {

    /**
     * 取消请求
     */
    cancel: () => void;
}


export const buildRequestHolder = (fetchPromise:Promise<any>) => {


};