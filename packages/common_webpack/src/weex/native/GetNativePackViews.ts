import * as fs from "fs";
import * as path from "path";
import WeexPackConfig from "./WeexPackConfig";

const {NATIVE_EXCLUDE_FILES, ANDROID_DIR, IOS_DIR} = WeexPackConfig;

/**
 *  获取原生要打包的页面
 * @author wxup
 * @create 2018-09-22 14:49
 **/

//开发目录
const DEV_DIR = "./dist";

const walk = function (root, dir, entry = {}, outPath) {
    const directory = path.join(__dirname, root, dir);
    fs.readdirSync(directory)
        .forEach(function (file) {
            const fullPath = path.join(directory, file);

            //是否排除打成原生js
            let isExclude = NATIVE_EXCLUDE_FILES.some((item) => {
                let regExp;
                if (item.constructor === String) {
                    regExp = new RegExp(item);
                } else if (item.constructor === RegExp) {
                    regExp = item;
                } else if (item.constructor === Function) {
                    return (item as any)(fullPath);
                }
                else {
                    console.warn("配置有误");
                    return false
                }
                return regExp.test(fullPath);
            });

            const stat = fs.statSync(fullPath);
            if (stat.isFile() && path.extname(fullPath) === '.vue' && !isExclude) {
                //dir.substr(6)是在dist里去掉views这层文件夹
                const name = path.join(outPath, dir.substr(6), path.basename(file, '.vue'));
                entry[name] = fullPath + '?entry=true'
            } else if (stat.isDirectory()) {
                const subdir = path.join(dir, file);
                walk(root, subdir, entry, outPath)
            }
        });
};

//输入
const entry = {};
const nativeRelease = process.env.NATIVE_RELEASE ? process.env.NATIVE_RELEASE : "";
if (nativeRelease.trim().length > 0) {
    //是否原生发布的包
    if (nativeRelease.indexOf("ANDROID") >= 0) {
        walk('../../../src', '/views', entry, ANDROID_DIR);
    }
    if (nativeRelease.indexOf("IOS") >= 0) {
        walk('../../../src', '/views', entry, IOS_DIR);
    }
    if (process.env.NOT_USE_DEV == null) {
        //默认会输出到开发环境的目录
        walk('../../../src', '/views', entry, DEV_DIR);
    }
} else {
    walk('../../../src', '/views', entry, DEV_DIR);
}

export default entry;
