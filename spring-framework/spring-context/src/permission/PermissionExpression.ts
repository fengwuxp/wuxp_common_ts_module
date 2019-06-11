import {Expression, ExpressionGenerator, ExpressionParser, IsExpressionAssert} from "../expression/Expression";
import {ConditionSymbol, OR_SYMBOL, switchSymbolResolver} from "../condition/ConditionConstantVar";
import {PermissionApplicationContext} from "../context/PermissionApplicationContext";


//permission expression  example: PERMISSION:[expr]:&  expr example : member.*,member.add  功能模块.资源操作类型 @link {ResourceActionType}
type PermissionExpression = Expression | "PERMISSION:[*]:&" | "PERMISSION:[*]:|";

/**
 * 资源操作动作类型
 */
export enum ResourceActionType {

    "*",

    query,

    create,

    update,

    deleted,


}

/**
 *
 * @param exprs
 * @param symbol  default "|"
 */
export const permissionExpressionGenerator: ExpressionGenerator<PermissionExpression> = (exprs: string[], symbol?: string): PermissionExpression => {

    return `${PERMISSION_PREFIX}:${JSON.stringify(exprs)}:${symbol || OR_SYMBOL}`;
};

export const isPermissionExpression: IsExpressionAssert<PermissionExpression> = (expr: string) => {
    if (expr == null) {
        return false;
    }
    return expr.startsWith(`${PERMISSION_PREFIX}:`);
};

/**
 * permission expression parser
 * @param expression
 * @param context  permission context
 * @return true pass, false not pass ,null ignore
 */
export const permissionExpressionParser: ExpressionParser<boolean, PermissionExpression> = (expression, context: PermissionApplicationContext): boolean => {

    if (!isPermissionExpression(expression)) {
        return null;
    }

    const exprs: string[] = expression.split(":");

    const permissionExpressions: string[] = JSON.parse(exprs[1]);
    const symbol: ConditionSymbol = exprs[2] as ConditionSymbol;

    return permissionExpressions.map(context.checkPermission).reduce(switchSymbolResolver(symbol), false);


};