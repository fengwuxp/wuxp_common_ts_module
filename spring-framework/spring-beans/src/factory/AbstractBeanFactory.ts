import {BeanFactory} from "./BeanFactory";


export default abstract class AbstractBeanFactory implements BeanFactory {



    getBean = <T = any>(...args): T => {

        return null
    };


}