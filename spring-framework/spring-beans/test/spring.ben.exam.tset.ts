import * as log4js from "log4js"
import {BeanType} from "../src/BeanType";
import {BeanFactory} from "../src/factory/BeanFactory";
import {Bean} from "../src/annotations/Bean";
import AnnotationBeanFactory from "../src/factory/AnnotationBeanFactory";

const logger = log4js.getLogger();
logger.level = 'debug';

class A {

}

class B {

}

class TestConfiguration {


    @Bean()
    public memberService = () => {
        return new A();
    };

    @Bean()
    public memberProvider = () => {
        return new B();
    }
}


describe("Reflect.decorate", () => {

    test("bean factory test", () => {


        const beanFactory: BeanFactory = new AnnotationBeanFactory();


        // const aBeanType = new BeanType("memberService", "./A", "A", Function, ["B<string>"]);
        // const bBeanType = new BeanType("memberProvider", "./B", "B", Function, ["A<string>"]);

        const aBeanType = BeanType.create("memberService");
        const bBeanType = BeanType.create("memberProvider");

        const beanA: A = beanFactory.getBean<A>(aBeanType);

        logger.debug(bBeanType);
        logger.debug(beanA);

    })
});