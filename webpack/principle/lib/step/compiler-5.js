/**
 * 5. 递归解析所有依赖
 * https://github.com/webfansplz/article/issues/38
 */

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')
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

                // console.log(node.source,filepath);
                // console.log({dirname, filepath, node});

                depends[node.source.value] = filepath
            }
        });

        return depends;
    },
    // 生成 code
    getCode(ast) {
        const { code } = transformFromAst(ast, null, {
            // presets: ['@babel/preset-env']
        })
        return code
    }
}

class Compiler {
    constructor(options) {
        const { entry, output } = options;

        // 只考虑单一入口
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
    // 构建启动
    run() {
      const entryInfo = this.build(this.entry);
      this.modules.push(entryInfo);
      // 递归调用主入口的所有依赖对象
      this.modules.forEach(({ dependencies}) => {
        if (dependencies) {
          for (const dependency in dependencies) {
            const itemInfo = this.build(dependencies[dependency] + '.js');
            this.modules.push(itemInfo);
          }
        }
      })
      console.log(this.modules);

      // 生成依赖关系图
      const dependGraph = this.modules.reduce(
        (graph, item) => ({
          ...graph,
          // 将数组转换为对象，KEY为文件路径名，唯一
          [item.filename]: {
            dependencies: item.dependencies,
            code: item.code
          }
        }),
        {}
      );
      console.log(dependGraph);
    }
    build(filename) {
        const ast = Parser.getAst(filename);
        const dependencies = Parser.getDependencies(ast, filename);
        const code = Parser.getCode(ast);

        return {
          // 文件路径，每个模块的唯一标识
          filename,
          // 这个文件路径下，依赖的其他文件，保存对应的文件路径
          dependencies,
          // 文件代码内容
          code,
        }
    }
    // 重写 require函数，输出 bundle
    generate() {

    }
}

module.exports = Compiler;
