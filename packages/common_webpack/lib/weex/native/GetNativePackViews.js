"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var WeexPackConfig_1 = require("./WeexPackConfig");
var NATIVE_EXCLUDE_FILES = WeexPackConfig_1.default.NATIVE_EXCLUDE_FILES, ANDROID_DIR = WeexPackConfig_1.default.ANDROID_DIR, PROJECT_ROOT_DIR = WeexPackConfig_1.default.PROJECT_ROOT_DIR, IOS_DIR = WeexPackConfig_1.default.IOS_DIR;
/**
 *  获取原生要打包的页面
 * @author wxup
 * @create 2018-09-22 14:49
 **/
//开发目录
var DEV_DIR = "./dist";
var walk = function (root, dir, entry, outPath) {
    if (entry === void 0) { entry = {}; }
    var directory = path.join(PROJECT_ROOT_DIR, root, dir);
    fs.readdirSync(directory)
        .forEach(function (file) {
        var fullPath = path.join(directory, file);
        //是否排除打成原生js
        var isExclude = NATIVE_EXCLUDE_FILES.some(function (item) {
            var regExp;
            if (item.constructor === String) {
                regExp = new RegExp(item);
            }
            else if (item.constructor === RegExp) {
                regExp = item;
            }
            else if (item.constructor === Function) {
                return item(fullPath);
            }
            else {
                console.warn("配置有误");
                return false;
            }
            return regExp.test(fullPath);
        });
        var stat = fs.statSync(fullPath);
        if (stat.isFile() && path.extname(fullPath) === '.vue' && !isExclude) {
            //dir.substr(6)是在dist里去掉views这层文件夹
            var name_1 = path.join(PROJECT_ROOT_DIR, outPath, dir.substr(6), path.basename(file, '.vue'))
                .replace(PROJECT_ROOT_DIR, "")
                .replace("\\dist\\", "");
            entry[name_1] = fullPath + '?entry=true';
        }
        else if (stat.isDirectory()) {
            var subdir = path.join(dir, file);
            walk(root, subdir, entry, outPath);
        }
    });
};
//输入
var entry = {};
var nativeRelease = process.env.NATIVE_RELEASE ? process.env.NATIVE_RELEASE : "";
if (nativeRelease.trim().length > 0) {
    //是否原生发布的包
    if (nativeRelease.indexOf("ANDROID") >= 0) {
        walk('./src', '/views', entry, ANDROID_DIR);
    }
    if (nativeRelease.indexOf("IOS") >= 0) {
        walk('./src', '/views', entry, IOS_DIR);
    }
}
else {
    walk('./src', '/views', entry, DEV_DIR);
}
exports.default = entry;
