import {storage} from "../sdk/ExportWeexSdkModule";
import AbstractWeexLocalStorage from "./AbstractWeexLocalStorage";


/**
 * 默认的 weexStorage
 */
class WeexSdkStorage extends AbstractWeexLocalStorage {


    constructor() {
        super(storage);
    }

    protected isSuccess = (result: string) => result === "success";


}

export default new WeexSdkStorage();