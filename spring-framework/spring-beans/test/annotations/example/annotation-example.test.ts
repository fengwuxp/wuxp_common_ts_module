import "reflect-metadata";
import * as log4js from "log4js"
import "reflect-metadata";
import {readonly} from "core-decorators";

const logger = log4js.getLogger();
logger.level = 'debug';

function AnnotationToClass() {

    return (target) => {
        logger.debug("class", target);
        logger.debug("--------------AnnotationToClass-------------------");
        return target
    }

}

function AnnotationToFiled(value) {

    return (target, name, descriptor) => {
        // target[name] = value;
        logger.debug("filed", target);
        logger.debug("name", name);
        logger.debug("descriptor", descriptor);
        // logger.debug("vale", target[name],value);
        logger.debug("------------AnnotationToFiled---------------------");
        // Reflect.defineMetadata(name, value, target, name);

        const attributes: PropertyDescriptor = {
            value
        };
        // Object.defineProperty(target,name,attributes);

        return attributes;
    }
}

function AnnotationToParam() {

    return (target, name: string, index: number) => {

        logger.debug("param", target);
        logger.debug("name", name);
        logger.debug("index", index);
        logger.debug("--------------AnnotationToParam-------------------");
        return target
    }
}

function AnnotationToMethod() {

    return () => (target, name, descriptor) => {
        logger.debug("method", target);
        logger.debug("name", name);
        logger.debug("descriptor", descriptor);
        logger.debug("--------------AnnotationToMethod------------------");
        return target
    }
}

function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}


function AnnotationToConstructor() {
    return () => (target, name, descriptor) => {
        logger.debug("constructor", target);
        logger.debug("name", name);
        logger.debug("descriptor", descriptor);
        logger.debug("--------------AnnotationToConstructor------------------");
        return target;
    }

}


// @AnnotationToClass()
class AnnotationExampleTest {

    @AnnotationToFiled("张三")
    public name: string;


    // @AnnotationToConstructor()
    // constructor() {
    //
    // }

    constructor(@AnnotationToParam() name?: string) {
        // this.name = name;
    }

    @AnnotationToMethod()
    testExample() {
    }
}

class Person {

    // @readonly
    a = "2";

    @readonly
    name() {
        return ``
    }
}

const testFn=(index,name)=>{}

describe("annotation example", () => {


    test("annotation to class", () => {

        const annotationExampleTest = new AnnotationExampleTest();
        logger.log(annotationExampleTest.name);
        const p = new Person();
        p.name();
        // annotationExampleTest.name='2'

        const prototype = testFn.prototype;
        logger.debug(prototype)
    })

});