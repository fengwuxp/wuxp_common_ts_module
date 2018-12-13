import {storage} from "../sdk/ExportWeexSdkModule";
import AbstractWeexLocalStorage from "./AbstractWeexLocalStorage";
import DefaultLocalStorage from "common_utils/src/storage/DefaultLocalStorage";


/**
 * 默认的 weexStorage
 */
class WeexSdkStorage extends AbstractWeexLocalStorage {


    constructor() {
        super(storage);
    }

    protected isSuccess = (result: string) => result === "success";


}

//导出一个weex sdk model的storage
const weexSdkStorage = new DefaultLocalStorage(new WeexSdkStorage());

export default weexSdkStorage;