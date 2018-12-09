import {Resolver} from "../Resolver";


/**
 * 根据自定义规则抓取匹配字符串的内容，并从数据源中获取数据进行替换
 */
export interface MatchRuleResolver extends Resolver<string> {

    /**
     * 解析规则匹配
     * @param value
     * @param dataSource
     */
    resolve: (value: string, dataSource: object) => string;

}

/**
 * 抽象的抓取匹配规则解析者
 */
export default abstract class AbstractMatchRuleResolver implements MatchRuleResolver {

    //用于校验匹配的正则表达式
    protected matchRegExp: RegExp;

    //用于搜索替换的正则表达式
    protected searchRegexp: RegExp;

    //替换后是否删除数据源中的对应属性
    protected deleteDataSourceAttr;


    constructor(matchRegExp: RegExp, searchRegexp: RegExp, deleteDataSourceAttr: boolean) {
        this.matchRegExp = matchRegExp;
        this.searchRegexp = searchRegexp;
        this.deleteDataSourceAttr = deleteDataSourceAttr;
    }

    resolve = (value: string, dataSource: object): string => {

        if (!this.matchRegExp.test(value)) {
            return value;
        }
        return value.replace(this.searchRegexp, (substring: string, ...args) => this.replacer(dataSource, ...args));
    };

    /**
     * 替换原字符串的内容
     * @param dataSource 数据源
     * @param args       正则表达式匹配到的结果列表
     * @return string    用于替换的内容
     */
    protected replacer = (dataSource, ...args): string => {
        //默认使用抓取到的第一个值进行替换
        const attrName = args[0];
        if (!attrName) {
            throw new Error(`replacer string error, args=${args}`);
        }
        const data = dataSource[attrName];

        if (this.deleteDataSourceAttr) {
            //删除数据源中的数据
            delete dataSource[attrName];
        }
        return data;
    }

}