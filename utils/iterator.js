/**
 * array iterator
 * @see https://juejin.cn/post/7055168101192564750
 */
 function createArrayIterator(arr) {
    let i = 0;
    return {
        next: () => ({
            done: i < arr.length ? false : true,
            value: i < arr.length ? arr[i++] : undefined,
        })
    };
}

const obj = {
    nums: [10, 20, 80],
    [Symbol.iterator]() {
        let i = 0;
        const next = () => ({
            done: i < this.nums.length ? false : true,
            value: i < this.nums.length ? this.nums[i++] : undefined,
        });
        const return = () => ({ done: true, value: undefined });
        return { next, return };
    }
}

const obj2 = {
    nums: [10, 20, 80],
    *[Symbol.iterator]() {
       for (const item of this.nums) {
           yield item;
       }
    }
}
const obj3 = {
    nums: [10, 20, 80],
    *[Symbol.iterator]() {
        yield* this.nums;
    }
}

let r;
let nums = createArrayIterator([10, 66, 99]);
r = nums.next();
r = nums.next();
r = nums.next();
r = nums.next();
