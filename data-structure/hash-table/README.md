# 哈希表

- 哈希表直接影响冲突的数字
- 哈希表越大，冲突也就越少


## 方法

1. `hash(key)`

> 将 key 转换为哈希数字

2. `set(key, value)`

> 设置哈希值

存在创建和更新两种情况，基于哈希表进行赋值

3. `delete(key)`

> 删除哈希值

4. `get(key)`

> 获取哈希值

5. `has(key)`

> key值的存在性判断


哈希表特点

- 查找效率快，o(1) 的时间复杂度
- 哈希表容易冲突，需要在设计的时候考虑周到
