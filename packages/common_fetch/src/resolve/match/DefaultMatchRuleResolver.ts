import AbstractMatchRuleResolver from "./MatchRuleResolver";


/**
 * 默认的替换规则
 * 替换形如 1{member}23的字符串
 */
export default class DefaultMatchRuleResolver extends AbstractMatchRuleResolver {


    constructor() {
        super(/\{\w*\}/, /\{(.+?)\}/g, true);
    }
}