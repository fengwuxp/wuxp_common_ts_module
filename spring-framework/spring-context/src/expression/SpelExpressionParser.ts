import {ExpressionParser} from "./ExpressionParser";

const SPEL_REG_EXP = /\$\{([^\}]*)\}/g;


export const isSpelExpressionParser = (expression: string) => {

    return SPEL_REG_EXP.test(expression);
};

/**
 * spel expression parser
 * @param expression  ${a.b.c}
 * @param context
 */
export const spelExpressionParser: ExpressionParser = <T = any>(expression: string, context: any): T => {

    //TODO  增加简单的计算支持

    //TODO example  ${a.b.c} + ${a.b.f} 、${a.b.c} > ${a.b.f}

    if (expression == null || context == null) {
        return null;
    }

    const execArray = SPEL_REG_EXP.exec(expression);

    if (execArray == null || execArray.length == 0) {
        return null;
    }

    const attrs = execArray[1].split(".");

    let next: any = context;

    attrs.forEach((name) => {
        if (next == null) {
            return
        }
        next = next[name];
    });

    return next;

};