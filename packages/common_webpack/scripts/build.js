const path = require('path');
const fs = require('fs');
const execSync = require('child_process').execSync;

const walk = function (root, dir, list, outPath) {
    const directory = path.join(__dirname, root, dir);
    fs.readdirSync(directory)
        .forEach(function (file) {
            const fullPath = path.join(directory, file);


            const stat = fs.statSync(fullPath);
            if (stat.isFile() && path.extname(fullPath) === '.ts') {
                list.push({
                    source: fullPath,
                    output: path.resolve(__dirname, outPath)
                });
            } else if (stat.isDirectory()) {
                const subdir = path.join(dir, file);
                walk(root, subdir, list, outPath)
            }
        });
};
const list = [];
walk("../", "./src/web", list, "../lib");
list.push({
    source: path.join(__dirname, "../src/style/PostCss.config.ts"),
    output: path.resolve(__dirname, "../lib/style")
});

console.log("生成的文件", list.length);


list.forEach((obj) => {
    let command = `tsc ${obj.source} --outDir ${obj.output} --module commonjs`;
    console.log(command);
    try {
        execSync(command);
    } catch (e) {
        // console.error(e);
    }
});

execSync(`rm -rf ${path.resolve(__dirname, "../lib/GetWebpackBaseConfigOptions.js")}`);
console.log("编译完成\r\n");
