import {DataProvider} from "./DataProvider";



/**
 * 数据提供者工厂
 */
export default class DataProviderFactory {

    static factory = <T extends DataProvider>(ProviderConstructor: { new(...args: T[]): {} }): T & DataProvider => {

        return new ProviderConstructor() as T;
    }
}