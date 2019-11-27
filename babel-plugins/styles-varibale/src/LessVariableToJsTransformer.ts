import {
    CssVariableToJsTransformer,
    CssVariableToJsTransformOptions,
    VariableNameConverter
} from "./CssVariableToJsTransformer";
import * as path from "path";
import less from "less";
import {reduceRightCommandResolvers, toHumpResolver, toHumpResolverByDash} from "./DefaultVariableNameConverter";


/**
 * less variable to js variable
 */
export default class LessVariableToJsTransformer implements CssVariableToJsTransformer {

    private variableNameConverter: VariableNameConverter;

    private static VARIABLE_NAME_PREFIX: string = "@";


    constructor(variableNameConverter?: VariableNameConverter) {
        this.variableNameConverter = reduceRightCommandResolvers(toHumpResolver, toHumpResolverByDash);
    }

    transform = <T = Record<string, string>>(src: string, filename: string, cssVariableToJsTransformOptions: CssVariableToJsTransformOptions): Promise<T> => {


        const {ignoreVariables, paths, variableTransformers, removeVariableNamePrefix} = cssVariableToJsTransformOptions;
        let _ignoreVariables = (ignoreVariables || []);
        let _variableTransformers = variableTransformers || [];
        ;

        return new Promise((resolve, reject) => {
            less.parse(src, {
                paths,
                ext: ".less"
            }, (err, root, imports, options) => {
                if (err) {
                    reject(err);
                    return;
                }
                try {
                    const evalEnv = new less.contexts.Eval(options);
                    const evaldRoot = root.eval(evalEnv);
                    const ruleset = evaldRoot.rules;
                    const lessVars = ruleset.filter((rule) => {
                        return rule.variable === true;
                    }).filter((rule) => {
                        return _ignoreVariables.indexOf(rule.name) < 0;
                    }).reduce((prev, rule) => {
                        let variableName: string = rule.name;
                        if (removeVariableNamePrefix == undefined || removeVariableNamePrefix === true) {
                            //移除变量名称前缀
                            variableName = variableName.replace(LessVariableToJsTransformer.VARIABLE_NAME_PREFIX, "");
                        }
                        const name = this.variableNameConverter(variableName);
                        const value = rule.value;
                        //转换
                        prev[name] = _variableTransformers.reduceRight((prev, transform) => {
                            return transform(prev);
                        }, value.toCSS(options));
                        return prev;
                    }, {});
                    resolve(lessVars)
                } catch (err) {
                    reject(err);
                }
            });
        })


    };


}
