/**
 * 3. 找出所有依赖模块
 */

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default
const options = require('../webpack.config');
const path = require('path');

const Parser = {
    // 获取AST
    getAst: path => {
        // 读取入口文件
        const content = fs.readFileSync(path, 'utf-8');
        // 将文件内容转为AST抽象语法树
        return parser.parse(content, {
            sourceType: 'module'
        })
    },
    // 获取依赖
    getDependencies(ast, filename) {
        const depends = {};

        // 遍历所有的import, 存起来
        traverse(ast, {
            // import 导入语句的AST节点
            ImportDeclaration({ node }) {
                const dirname = path.dirname(filename);
                // 保存依赖模块路径, 后面生成依赖关系图会用到
                const filepath = './' + path.join(dirname, node.source.value)

                console.log({dirname, filepath, node});

                depends[node.source.value] = filepath
            }
        });

        return depends;
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
        const ast = Parser.getAst('../' + this.entry);
        const dependencies = Parser.getDependencies(ast, this.entry);
        // console.log(ast);
        // console.log(dependencies);
    }
    // 重写 require函数，输出 bundle
    generate() {

    }
}

new Compiler(options).run();
