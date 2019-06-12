export type ConditionSymbol = "|" | "&" | "^" | "!"

export type ConditionSymbolResolver<S extends  ConditionSymbol = ConditionSymbol> = (a, b?) => boolean ;


//Calculation symbol
export const OR_SYMBOL: ConditionSymbol = "|";
export const AND_SYMBOL: ConditionSymbol = "&";
export const NON_SYMBOL: ConditionSymbol = "!";
export const XOR_SYMBOL: ConditionSymbol = "^";


export const orConditionSymbolResolver: ConditionSymbolResolver<"|"> = (a, b) => b || a;
export const andConditionSymbolResolver: ConditionSymbolResolver<"&"> = (a, b) => b && a;

export const nonConditionSymbolResolver: ConditionSymbolResolver<"!"> = (a) => !a;
export const xorConditionSymbolResolver: ConditionSymbolResolver<"^"> = (a, b) => (a ^ b) > 0;

export const switchSymbolResolver = (symbol: ConditionSymbol): ConditionSymbolResolver => {

    switch (symbol) {
        case OR_SYMBOL:
            return orConditionSymbolResolver;
        case AND_SYMBOL:
            return andConditionSymbolResolver;
        case NON_SYMBOL:
            return nonConditionSymbolResolver;
        case XOR_SYMBOL:
            return xorConditionSymbolResolver;
    }
};



