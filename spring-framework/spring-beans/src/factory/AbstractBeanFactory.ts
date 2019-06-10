import {BeanFactory} from "./BeanFactory";
import {getBean} from "../context/BeanContext";

export default abstract class AbstractBeanFactory implements BeanFactory {


    getBean = getBean;


}