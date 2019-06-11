import {ApplicationContext} from "./ApplicationContext";


export interface PermissionApplicationContext extends ApplicationContext {

    checkPermission: (permission: string) => boolean;
}