type ExpressionParser = (expression: string, context: any) => any;


const REG_EXP = /\$\{([^\}]*)\}/g;


/**
 *
 * @param expression  ${a.b.c}
 * @param context
 */
export const spelExpressionParse: ExpressionParser = (expression: string, context) => {

    if (expression == null || context == null) {
        return null;
    }

    const execArray = REG_EXP.exec(expression);

    const attrs = execArray[1].split(".");

    let next = context;

    attrs.forEach((name) => {
        if (next == null) {
            return
        }
        next = next[name];
    });

    return next;

};