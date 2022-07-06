/**
 * 1. 定义 Compiler 类
 */

class Compiler {
    constructor(options) {
        const { entry, output } = options;

        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
    // 构建启动
    run(){}
    // 重写 require 函数，输出 Bundle
    generate() {}
}