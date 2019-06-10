export interface ApplicationConfiguration {

    name?: string;

    /**
     * default :"/"
     */
    contextPath?: string;

    /**
     * default:8080
     */
    port?: number;
}