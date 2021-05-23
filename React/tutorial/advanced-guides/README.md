## 1. Accessibility

1. Fragment的使用
2. 当没有props可以使用更简单的语法

## 2. Code spliting

1. dynamic import 功能

2. Lazy加载组件

3. ErrorBoundary的展示

4. Route-based code spliting

5. lazy只支持默认导出的组件，如果有多个组件，需要创建中间文件中转导出

## 3. Context

1. 提供数据通信功能

2. 类似vue的 $attrs，跨组件数据传递，而无需在中间组件进行数据声明

## 4. Error Boundaries

1. 提供了错误钩子，供错误捕获
```
componentDidCatch()

static getDerivedStateFromError()
```

2. 可以封装成错误检测高级组件，供其他组件使用


## 5. Forwarding ref

1. 获取原生HTML元素的引用

2. 组件中使用，可以获得该组件的引用


## 6. Fragment

1. 类似于vue中的template，可以不添加额外DOM节点的前提下，包裹一些子节点

2. 两种形式，具名标签，或者没有标签名的短语法




