import {ConditionResolver, FunctionConditionResolver} from "./ConditionResolver";
import {ApplicationContext} from "../context/ApplicationContext";


export default class DefaultFunctionConditionResolver implements FunctionConditionResolver {

    private conditionResolvers: ConditionResolver[];

    private applicationContext: ApplicationContext;

    constructor(conditionResolvers: ConditionResolver[], /*applicationContext: ApplicationContext*/) {
        this.conditionResolvers = conditionResolvers || [];
        // this.applicationContext = applicationContext;
    }

    resolve = (conditionType: (context, ...args) => (boolean | string | string[])): boolean => {


        if (typeof conditionType !== "function") {
            return null;
        }


        const conditionResult = conditionType(this.applicationContext);

        return this.conditionResolvers.map((resolver) => {
            return resolver.resolve(conditionResult)
        }).filter(r => r != null)
            .reduce((p, c) => c, null);
    };


}