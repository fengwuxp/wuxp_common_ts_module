import * as fs from "fs";
import * as path from "path";
import WeexPackConfig from "./WeexPackConfig";

const {NATIVE_EXCLUDE_FILES, ANDROID_DIR, PROJECT_ROOT_DIR, IOS_DIR, BUNDLE_JS_DIR} = WeexPackConfig;

/**
 *  获取原生要打包的页面
 * @author wxup
 * @create 2018-09-22 14:49
 **/

//开发目录
const DEV_DIR = "./dist";

const walk = function (root, dir, entry = {}, outPath) {
    const directory = path.join(PROJECT_ROOT_DIR, root, dir);
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
                } else {
                    console.warn("配置有误");
                    return false
                }
                return regExp.test(fullPath);
            });

            const stat = fs.statSync(fullPath);
            if (stat.isFile() && path.extname(fullPath) === '.vue' && !isExclude) {
                //dir.substr(6)是在dist里去掉views这层文件夹
                const name = path.join(PROJECT_ROOT_DIR, outPath, dir.substr(6), path.basename(file, '.vue'))
                    .replace(PROJECT_ROOT_DIR, "")
                    .replace("\\dist\\", "");
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
        walk('./src', '/views', entry, `${ANDROID_DIR}/${BUNDLE_JS_DIR.replace("./","")}`);
    }
    if (nativeRelease.indexOf("IOS") >= 0) {
        walk('./src', '/views', entry, `${IOS_DIR}/${BUNDLE_JS_DIR.replace("./","")}`);
    }
} else {
    walk('./src', '/views', entry, DEV_DIR);
}

export default entry;
