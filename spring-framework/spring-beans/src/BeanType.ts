export class BeanType {

    private _name: string;


    //导入的路径
    private _importPath: string;

    //导出的路径
    private _exportName: string;

    //超类
    private _supperClass: any;

    /**
     * 实现的接口所在的路径，包括泛型描述
     * example: test-module/TestFace<string>
     */
    private _supperInterfaces: string[];


    private constructor(name: string,
                        importPath: string,
                        exportName: string,
                        supperClass?: any,
                        supperInterfaces?: string[]) {
        this._name = name;
        this._importPath = importPath;
        this._exportName = exportName;
        this._supperClass = supperClass;
        this._supperInterfaces = supperInterfaces;
    }


    get name(): string {
        return this._name;
    }

    get importPath(): string {
        return this._importPath;
    }

    get exportName(): string {
        return this._exportName;
    }

    get supperClass(): any {
        return this._supperClass;
    }

    get supperInterfaces(): string[] {
        return this._supperInterfaces;
    }

    getClassName = () => {

        return `${this.importPath}.${this.exportName}`;
    };

    public static create = (name: string,
                            exportName: string = name,
                            importPath: string = "NormalizeUrl.ts",
                            supperClass?: any,
                            supperInterfaces?: string[]) => {

        return new BeanType(name, importPath, exportName, supperClass, supperInterfaces)
    }
}