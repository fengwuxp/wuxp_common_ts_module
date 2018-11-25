import {storage} from "../sdk/ExportWeexSdkModule";
import AbstractWeexStorage from "./WeexStorage";


/**
 * 默认的 weexStore
 */
 class DefaultWeexStroe extends AbstractWeexStorage {


    constructor() {
        super(storage);
    }
}

export default new DefaultWeexStroe();