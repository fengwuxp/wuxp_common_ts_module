import * as log4js from "log4js"
import "reflect-metadata";
import {Runtime} from "inspector";
import PropertyDescriptor = module


const logger = log4js.getLogger();
logger.level = 'debug';

enum Scope {

    singleton,
    prototype,
    request,
    session
}

interface ComponentOptions {

    name?: string;

    /**
     * default singleton
     */
    scope?: Scope,

    packageName?: string;
}

const UNIQUELY_IDENTIFIES = "uniquely_identifies";
const BEAN_MAP: Map<string, any> = new Map();

function Component(options?: ComponentOptions) {

    const _options: ComponentOptions = {
        ...(options || {}),
        scope: Scope.singleton
    };

    return (target) => {

        logger.debug(target);


        const uniquelyIdentifies = _options.packageName;


        Reflect.defineMetadata(UNIQUELY_IDENTIFIES, uniquelyIdentifies, target);

        BEAN_MAP.set(uniquelyIdentifies, new target());


        return target;
    }
}

interface AutoWriedOptions {

    requiredType?: any;
}

function AutoWried(options: AutoWriedOptions) {

    const {requiredType} = options;

    return (target, name, descriptor: PropertyDescriptor) => {

        const metadata = Reflect.getMetadata(UNIQUELY_IDENTIFIES, requiredType);

        logger.debug("metadata", metadata);

        descriptor = {
            value: BEAN_MAP.get(metadata)
        }


        return descriptor;
    }
}

@Component({
    packageName: "test.annotations.example.annotation-metadata.test.ComponentExampleTest"
})
class ComponentExampleTest {


    constructor() {
        logger.debug("constructor ", this);
    }

    getName = () => "123";
}

class SimpleTest {

    @AutoWried({
        requiredType: ComponentExampleTest
    })
    componentExampleTest: ComponentExampleTest;
}

describe("metadata example", () => {


    test("metadata to class", () => {

        const simple = new SimpleTest();

        const name = simple.componentExampleTest.getName();
        logger.debug(name)

    })

});