import {CodeGenerator} from "../CodeGenerator";
import {
    ClassDeclaration,
    ObjectExpression,
    Program,
    Statement,
    ClassBody,
    Decorator,
    CallExpression
} from "@babel/types";
import {getDecoratorByName} from "../../helper/AstPathNodeOperateHelper";
import {ReactViewOptions} from "typescript-spring-react/src/route/ReactView";
import {SpringReactRouteConfig} from "typescript-spring-react/src/route/SpringReactRouteConfig";
import ArtTemplateCodeGenerator from "../template/ArtTemplateCodeGenerator";

const k=new ArtTemplateCodeGenerator();
/**
 * 用于生成 react route 的路由信息
 */
export default class ReactRouteConfigGenerator implements CodeGenerator {


    generator = (classDeclaration: ClassDeclaration, state) => {

        //获取到reactView的装饰器
        const ReactViewDecorator = getDecoratorByName(classDeclaration, "ReactView");

        //得到参数
        const expression = ReactViewDecorator.expression as CallExpression;
        const _arguments = expression.arguments;


        //解析参数转换为路由配置到路由配置
        const result: SpringReactRouteConfig = _arguments.map((item: ObjectExpression) => {

            return item.properties.map((prop: any) => {

                const attr = {};
                attr[prop.key.name] = prop.value.value;
                return attr;
            })
        }).flatMap((items) => [...items])
            .reduce((prev, current) => {
                return {
                    ...prev,
                    ...current
                }
            }, {});


        //从state种解析文件的相对路径
        const {cwd, filename} = state;

        const filepath = filename.replace(filename, cwd);
        result["component"] = filepath;

        //移除掉reactView的装饰器
        classDeclaration.decorators = classDeclaration.decorators.filter((item) => {
            return (item.expression as CallExpression).callee["name"] !== "ReactView";
        });

    };


}

const genRouteConfigItemCode = (options: ReactViewOptions, componentPath: string) => {


    return `{
       name:"${options.name}",
       pathname:"${options.pathname}"
       exact:${options.exact || false}
       component: import("${componentPath}")
    }`
};