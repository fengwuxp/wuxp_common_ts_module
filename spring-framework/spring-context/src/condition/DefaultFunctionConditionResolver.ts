import {ConditionResolver, FunctionConditionResolver} from "./ConditionResolver";


export default class DefaultFunctionConditionResolver implements FunctionConditionResolver {

    private conditionResolvers: ConditionResolver[];


    constructor(conditionResolvers: ConditionResolver[]) {
        this.conditionResolvers = conditionResolvers || [];
    }

    resolve = (conditionType: (context, ...args) => (boolean | string | string[])): boolean => {


        if (typeof conditionType !== "function") {
            return null;
        }

        //TODO context
        const conditionResult = conditionType(null);


        return this.conditionResolvers.map((resolver) => {
            return resolver.resolve(conditionResult)
        }).filter(r => r != null)
            .reduce((p, c) => c, null);
    };


}