/**
 * spring component scanner
 */
export interface SpringComponentScanner {

    /**
     * @param path  ast path
     */
    scanning: (path) => any;
}