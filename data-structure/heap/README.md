# 堆

类似于树状结构，可细分为最小堆和最大堆，分别具有不同特性

## 最小堆

最小堆满足 P 为 C 的一个节点，P 始终小于 C 的值，在顶部没有节点的被称之为根节点
![example](https://camo.githubusercontent.com/16e4220b69a866f97cc20d934c4b16fe5b9147de/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f362f36392f4d696e2d686561702e706e67)


## 最大堆

最大堆满足 P 为 C 的一个节点，P 始终大于 C的值
![example](https://camo.githubusercontent.com/cf3c66d0d2ed67af70a8bc500fc215526d266a0d/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f332f33382f4d61782d486561702e737667)


## Reference 

- [堆](https://www.jianshu.com/p/6b526aa481b1)


## 特点

1. 类似于树，但必须满足最小堆和最大堆
2. 

##　内部实现

1. `heapContainer`: 使用数组来模拟堆结构
2. `getLeftChildIndex(parentIndex)`：
3. `getRightChildIndex(parentIndex)`：
4. `getParentIndex(childIndex)`：
5. `leftChild(parentIndex)`：
6. `rightChild(parentIndex)`：
7. `parent(childIndex)`：

1. getChildIndex

> 计算左右两个 child 的索引，都为父级下面的，因为堆的特性，一个父节点 必须要有两个子节点可以算出来

- 需要传入 parentIndex 才能进行计算
- leftChild 计算方法为 `2n + 1`
- rightChild 计算方法为 `2n + 2`


