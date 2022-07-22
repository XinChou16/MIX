/**
 * recurise iterate
 * @see https://github.com/vuejs/vue-loader/blob/0.7.0/lib/template-rewriter.js
 */

function walk(tree, fn) {
    if (tree.children) {
        tree.children.forEach(function(child) {
            fn(child);
            walk(child, fn);
        });
    }
}
