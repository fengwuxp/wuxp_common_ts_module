import {ConditionResolver} from "./ConditionResolver";
import {ConditionType} from "./ConditionType";


export default class DefaultConditionResolver implements ConditionResolver {


    private conditionResolver: ConditionResolver[] = [];


    constructor(conditionResolver: ConditionResolver[]) {
        this.conditionResolver = conditionResolver;
    }

    resolve = (conditionType: ConditionType) => {


        return this.conditionResolver.map(item => item.resolve(conditionType))
            .filter(r => r != null)
            .reduce((prev, current) => {
                return  current;
            }, null);
    };


}