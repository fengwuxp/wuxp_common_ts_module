import {PackageScanner} from "./PackageScanner";



export default class SpringPackageScanner implements PackageScanner<string[]> {
    scan: (paths: string[]) => string[];


}