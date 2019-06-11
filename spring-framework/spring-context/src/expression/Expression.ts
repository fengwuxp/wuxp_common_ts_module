export type Expression<E extends string = string> = string | E ;


export type ExpressionParser<T = any, E extends Expression = Expression> = (expression: E, context: any, ...args) => T;

// expression generator
export type ExpressionGenerator<E extends Expression = Expression> = (expr: string | string[], ...args) => E;

//expression
export type IsExpressionAssert<E extends Expression = Expression> = (expr: string) => boolean;

