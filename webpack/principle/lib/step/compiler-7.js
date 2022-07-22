/**
 * 6. 重写 require 函数，是的浏览器能够识别，输出打包后的 bundle
 */

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')
const path = require('path');

const requireProxy = graphCode => `;(function(graph) {

  function require(moduleId) {
    function localRequire(relativePath) {
      return require(graph[moduleId].dependencies[relativePath]);
    }

    // require参数是给 code 里面提供的
    var exports = {};
    ;(function(require, exports, code) {
      eval(code);
    })(localRequire, exports, graph[moduleId].code);

    return exports;
  }

  require('./src/index.js');
})(${graphCode})`

const Parser = {
    // 获取文件内容
    getRaw: path => {
      return fs.readFileSync(path, 'utf-8');
    },
    // 获取AST
    getAst: path => {
        // 读取入口文件
        console.log({path});
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
                var extname = path.extname(filepath);

                // 实际使用，会省略js文件名后缀，fs查找时，需要补充完整
                depends[node.source.value] = filepath + (extname ? '' : '.js');
            }
        });

        return depends;
    },
    // 生成 code
    getCode(filename, ast, rules) {
        // const { code } = transformFromAst(ast, null, {
        //     presets: ['@babel/preset-env']
        // })
        const raw = this.getRaw(filename);
        let code = raw;
        console.log(rules);

        const [babelRule] = rules;
        if (babelRule.test.test(filename)) {
          // babel-loader
          const loader = require(`./${babelRule.use}`);
          code = loader(filename, code);
        }

        return code;
    }
}

class Compiler {
    constructor(options) {
        const { entry, output } = options;

        // 只考虑单一入口
        this.entry = entry;
        this.output = output;
        this.rules = options.module.rules;
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
            const itemInfo = this.build(dependencies[dependency]);
            this.modules.push(itemInfo);
          }
        }
      })

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
      this.generate(dependGraph);
    }
    build(filename) {
        const ast = Parser.getAst(filename);
        const dependencies = Parser.getDependencies(ast, filename);
        const code = Parser.getCode(filename, ast, this.rules);

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
    generate(code) {
      const filePath = path.join(this.output.path, this.output.filename)

      const bundle = requireProxy(JSON.stringify(code));

      // 写入文件
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(this.output.path);
      }
      fs.writeFileSync(filePath, bundle, 'utf-8');
    }
}

module.exports = Compiler;
