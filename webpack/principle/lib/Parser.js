const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

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

              // 实际使用，会省略js文件名后缀，fs查找时，需要补充完整
              depends[node.source.value] = filepath + '.js';
          }
      });

      return depends;
  },
  // 生成 code
  getCode(ast) {
      const { code } = transformFromAst(ast, null, {
          presets: ['@babel/preset-env']
      })
      return code
  }
}

module.exports = Parser;
