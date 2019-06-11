import {StringArrayConditionResolver, StringConditionResolver} from "./ConditionResolver";
import {ConditionSymbol, switchSymbolResolver} from "./ConditionConstantVar";


export default class DefaultStringArrayConditionResolver implements StringArrayConditionResolver {

    private stringConditionResolvers: StringConditionResolver[];


    constructor(stringConditionResolvers: StringConditionResolver[]) {
        this.stringConditionResolvers = stringConditionResolvers || [];
    }

    resolve = (conditionType: string[]) => {

        if (conditionType == null) {
            return null;
        }
        if (!Array.isArray(conditionType)) {
            return null;
        }

        let expressions = [...conditionType];

        const symbol: ConditionSymbol = expressions.pop() as ConditionSymbol;

        return expressions.map(s => {
            return this.stringConditionResolvers.map(resolver => {
                return resolver.resolve(s);
            }).filter(r => r != null)
                .reduce((p, c) => c, null);
        }).filter(r => r != null)
            .reduce(switchSymbolResolver(symbol), null);

    };


}