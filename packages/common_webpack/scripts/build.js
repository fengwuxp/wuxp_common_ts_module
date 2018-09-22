const path = require('path');
const fs = require('fs');
const execSync = require('child_process').execSync;

// const walk = function (root, dir, list, outPath) {
//     const directory = path.join(__dirname, root, dir);
//     fs.readdirSync(directory)
//         .forEach(function (file) {
//             const fullPath = path.join(directory, file);
//
//
//             const stat = fs.statSync(fullPath);
//             if (stat.isFile() && path.extname(fullPath) === '.ts') {
//                 list.push({
//                     source: fullPath,
//                     output: path.resolve(__dirname, outPath)
//                 });
//             } else if (stat.isDirectory()) {
//                 const subdir = path.join(dir, file);
//                 walk(root, subdir, list, outPath)
//             }
//         });
// };
// const list = [];
// walk("../", "./src/web", list, "../lib");
// walk("../", "./src/weex", list, "../lib");
// list.push({
//     source: path.join(__dirname, "../src/style/PostCss.config.ts"),
//     output: path.resolve(__dirname, "../lib/style")
// });
// list.push({
//     source: path.join(__dirname, "../src/config/WebpackConfig.config.ts"),
//     output: path.resolve(__dirname, "../lib/config")
// });
//
// console.log("生成的文件", list.length);
//
//
// list.forEach((obj) => {
//     let command = `tsc ${obj.source} --outDir ${obj.output} --module CommonJS --target es5`;
//     console.log(command);
//     try {
//         execSync(command);
//     } catch (e) {
//         // console.error(e);
//     }
// });
//

execSync(`rm -rf ${path.resolve(__dirname, `../lib`)}`);

console.log("移除文件成功");

console.log("开始编译\r\n");
execSync("tsc");

console.log("编译完成\r\n");

console.log("移除不要文件");

const rmList = [
    "GetWebpackBaseConfigOptions",
];

rmList.forEach((item) => {
    execSync(`rm -rf ${path.resolve(__dirname, `../lib/${item}.js`)}`);
});

console.log("移除完成");
