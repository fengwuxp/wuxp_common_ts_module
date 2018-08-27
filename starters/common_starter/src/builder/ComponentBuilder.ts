/**
 * 组件builder
 */
export interface ComponentBuilder<T> {


    props:(...args)=>this;

    build: () => T
}