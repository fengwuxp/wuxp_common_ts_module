import {Database} from "./Database";
import UUIDUtil from "common_utils/src/uuid/UUIDUtil";


/**
 * key => value 数据库
 */
export interface KeyValueDatabase<T> extends Database<T>, Map<string, T> {

}
