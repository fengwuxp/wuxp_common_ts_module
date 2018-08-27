/**
 * weex 环境变量
 */
interface WeexEnvironment {
    readonly platform: string;	//Current running platform, could be “Android”, “iOS” or “Web”.
    readonly weexVersion: string;//	The version of Weex SDK.
    readonly appName: string;   //	Mobile app name or browser name.
    readonly appVersion: string;	//The version of current app.
    readonly osName: string;	 //The OS name, could be “Android” or “iOS”.
    readonly osVersion: string;	//The version of current OS.
    readonly  deviceModel: string;	//Mobile phone device model. (native only)
    readonly deviceWidth: number;	//Screen resolution width.
    readonly deviceHeight: number;	//Screen resolution height.
}

/**
 * weex api配置
 */
interface WeexConfigAPI {
    readonly  bundleUrl: string;
    readonly  bundleType?: string;
    readonly  env: WeexEnvironment;
}

interface WeexDocument {
}

export interface WeexModule {
    readonly [k: string]: Function
}


declare global {
    namespace weex {
        const config: WeexConfigAPI;

        const document: WeexDocument;

        function registerModule(name: string, module: WeexModule): void

        // registerComponent:(name:string)=>void;
        // requireModule: (name: string) => WeexModule
        function requireModule<E extends WeexModule>(name: string): E;

        function supports(condition: string): boolean;
    }
}
