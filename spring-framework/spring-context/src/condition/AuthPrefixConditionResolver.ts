import {StringConditionResolver} from "./ConditionResolver";


/**
 * 基于功能前缀的 condition resolver
 * 表达式规则 AUTH:[""]:&  功能类型：功能值：严格或宽松模式
 */
export default class AuthPrefixConditionResolver implements StringConditionResolver {


    public static readonly PREFIX: string = "AUTH";

    public static readonly SEPARATOR: string = ":";

    resolve = (conditionType: string) => {

        //check
        const isExpression = this.isExpression(conditionType);
        if (isExpression === false) {
            return null;
        }

        const strings = conditionType.split(AuthPrefixConditionResolver.SEPARATOR);

        //权限表达式
        const authExpression: string[] = JSON.parse(strings[1]);


        return false;

    };


    isExpression = (conditionType: string | string[]): boolean => {

        if (conditionType == null) {
            return false;
        }

        if (typeof conditionType === "string") {

            return conditionType.startsWith(AuthPrefixConditionResolver.PREFIX);
        }


        return false;
    };


}