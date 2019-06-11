import {ConditionFunction, ConditionType} from "./ConditionType";


/**
 * condition resolver
 */
export interface ConditionResolver<T = ConditionType> {

    /**
     * @param conditionType
     * @return true pass, false does not pass, null ignores
     */
    resolve: (conditionType: T) => boolean;
}


export interface StringConditionResolver extends ConditionResolver<string> {

    isExpression?: (expression: string | string[]) => boolean;
}

export interface StringArrayConditionResolver extends ConditionResolver<string[]> {


}

export interface BooleanConditionResolver extends ConditionResolver<boolean> {

}

export interface FunctionConditionResolver extends ConditionResolver<ConditionFunction> {

}

export const DefaultBooleanConditionResolver: BooleanConditionResolver = {
    resolve: (conditionType: boolean) => {

        if (conditionType == null) {
            return null;
        }
        return conditionType || false;
    }
};