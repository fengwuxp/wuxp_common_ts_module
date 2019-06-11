import {StringConditionResolver} from "./ConditionResolver";
import {spelExpressionParser} from "../expression/SpelExpressionParser";
import SpringApplicationContext from "../context/SpringApplicationContext";


/**
 * 基于spel expression
 */
export default class SpelExpressionConditionResolver implements StringConditionResolver {


    resolve = (conditionType: string): boolean => {

        const result: any = spelExpressionParser(conditionType, SpringApplicationContext);
        if (result == null) {
            return null;
        }

        return Boolean(result).valueOf();
    };


}