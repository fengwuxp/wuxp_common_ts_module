/**
 * 组件构建者
 */
export interface ComponentBuilder<T> {


    build: () => T
}