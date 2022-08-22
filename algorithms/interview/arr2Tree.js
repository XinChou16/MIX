/**
 * arr 2 tree
 */
export function arr2Tree(arr) {
    const ret = [];
    const hash = {};

    for (let item of arr) {
        hash[item.id] = item;
    }
    
    for (let item of arr) {
        const parent = hash[item.pid];

        if (parent) {
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(item);
        } else {
            ret.push(item);
        }
    }
    
    return ret;
}

const arr = [
    { id: 1, pid: 0 },
    { id: 2, pid: 1 },
    { id: 3, pid: 1 },
    { id: 4, pid: 2 },
    { id: 5, pid: 2 },
    { id: 6, pid: 3 },
];
