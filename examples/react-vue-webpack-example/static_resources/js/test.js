// 被异步加载的js 可能会修改到全局对象


console.log(window);
console.log(globalThis);
globalThis["___A___"] = 1;
console.log(window["___A___"]);
window.alert(globalThis["___A___"]);

function hhh() {
    console.log("___A___", globalThis["___A___"])
}

hhh();

