/**
 * 2. 解析入口文件，获取 AST
 */
const fs = require('fs');
const parser = require('@babel/parser');
const options = require('../webpack.config');

const Parser = {
    getAst: path => {
        // 读取入口文件
        const content = fs.readFileSync(path, 'utf-8');
        // 将文件内容转为AST抽象语法树
        return parser.parse(content, {
            sourceType: 'module'
        })
    }
}

class Compiler {
    constructor(options) {
        const { entry, output } = options;

        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
    // 构建启动
    run() {
        const ast = Parser.getAst(this.entry);
        console.log(Object.keys(ast));
        console.log(ast);
    }
    // 重写 require函数，输出 bundle
    generate() {

    }
}

new Compiler(options).run();
