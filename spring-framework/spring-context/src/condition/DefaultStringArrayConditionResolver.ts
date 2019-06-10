import {StringArrayConditionResolver, StringConditionResolver} from "./ConditionResolver";


export default class DefaultStringArrayConditionResolver implements StringArrayConditionResolver {

    private stringConditionResolvers: StringConditionResolver[];


    //Calculation symbol
    private static readonly OR_SYMBOL: string = "|";
    private static readonly AND_SYMBOL: string = "|";


    constructor(stringConditionResolvers: StringConditionResolver[]) {
        this.stringConditionResolvers = stringConditionResolvers || [];
    }

    resolve = (conditionType: string[]) => {

        if (conditionType == null) {
            return null;
        }
        if (conditionType.constructor !== Array) {
            return null;
        }

        let expressions = [...conditionType];

        const symbol: string = expressions.pop();

        return expressions.map(s => {
            return this.stringConditionResolvers.map(resolver => {
                return resolver.resolve(s);
            }).filter(r => r != null)
                .reduce((p, c) => c, null);
        }).filter(r => r != null)
            .reduce((p, c) => {
                if (DefaultStringArrayConditionResolver.OR_SYMBOL === symbol) {
                    return p || c;
                } else {
                    return p && c;
                }

            }, null);

    };


}