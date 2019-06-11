import {StringConditionResolver} from "../condition/ConditionResolver";
import { permissionExpressionParser} from "./PermissionExpression";
import {ApplicationContext} from "../context/ApplicationContext";


/**
 * 基于功能前缀的 condition resolver
 * 表达式规则 PERMISSION:[""]:&  功能类型：功能值：严格或宽松模式
 */
export default class PermissionPrefixConditionResolver implements StringConditionResolver {

    private applicationContext: ApplicationContext;

    resolve = (conditionType: string) => {

        //check
        return permissionExpressionParser(conditionType, this.applicationContext);

    };


}