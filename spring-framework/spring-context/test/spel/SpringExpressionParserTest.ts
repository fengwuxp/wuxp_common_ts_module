import {StandardContext,, SpelExpressionEvaluator} from 'spel2js';
import {SpelExpressionParser} from 'spel2js/src/SpelExpressionParser';
import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';

describe('spring expression test', () => {

    test("test spel 1", () => {
        const expression = '#toDoList.owner == authentication.details.name';
        const spelContext = StandardContext.create({
            details: {
                name: "Darth Vader1"
            }
        }, {});
        const locals = {
            toDoList: {
                owner: 'Darth Vader'
            }
        };

        const compiledExpression = SpelExpressionEvaluator.compile(expression);

        const result = compiledExpression.eval(spelContext, locals); // true
        logger.debug("result", result);

    })

    test("test spel 2", () => {
        // const parser =  SpelExpressionParser();

        let parser=new SpelExpressionParser();
        const result =   parser.parse("#a+#b",{
            a:1,
            b:2
        })
        logger.debug("result", result);
    })
})
