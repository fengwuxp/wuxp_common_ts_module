/**
 * generator 执行者
 */
export interface GeneratorExecutor {


    /**
     * 执行generator
     * @param generator
     */
    run: (generator: GeneratorFunction) => any;


}
