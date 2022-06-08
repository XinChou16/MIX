class MyURLSearchParams {
    localSearch = []
    constructor(strOrObj) {
        if (typeof strOrObj === 'string') {
            this.localSearch = strOrObj.replace(/^\?/, '').split('&').map(kv => kv.split('&'));
        } else {
            this.localSearch = Object.entries(strOrObj);
        }
    }
    get(key) {
        const param = this.localSearch.find(kv => kv[0] === key);
        return param && param[1];
    }
    set(key, val) {
        const param = this.localSearch.find(kv => kv[0] === key);
        if (param) {
            param[1] = val;
        } else {
            this.append(key, val);
        }
    }
    has(key) {
        return typeof this.get(key) !== 'undefined';
    }
    append(key, val) {
        this.localSearch.push([key, val]);
    }
    toString() {
        return this.localSearch.map(kv => kv.join('=')).join('&');
    }
    *[Symbol.iterator]() {
        yield* this.localSearch;
    }
}