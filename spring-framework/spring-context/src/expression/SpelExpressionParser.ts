import {Expression, ExpressionParser, IsExpressionAssert} from "./Expression";

//spel expression  example:${a.b.c}
export type SpelExpression = Expression | "${*}" | "#{*}";

const SPEL_REG_EXP = /\$\{([^\}]*)\}/g;


export const isSpelExpression: IsExpressionAssert<SpelExpression> = (expression: SpelExpression) => {

    return SPEL_REG_EXP.test(expression);
};

/**
 * spel expression parser
 * @param expression  ${a.b.c}
 * @param context
 */
export const spelExpressionParser: ExpressionParser = <T = any, SpelExpression>(expression: SpelExpression, context: any): T => {

    //TODO  增加简单的计算支持

    //TODO example  ${a.b.c} + ${a.b.f} 、${a.b.c} > ${a.b.f}

    if (!isSpelExpression(expression) || context == null) {
        return null;
    }

    const execArray = SPEL_REG_EXP.exec(expression);

    if (execArray == null || execArray.length == 0) {
        return null;
    }

    //属性列表
    const attrs: any[] = execArray[1].split(".");

    return attrs.reduce((prev: any, name) => {
        if (prev == null) {
            return null;
        }
        prev = prev[name];
        return prev;
    }, context);


};