/**
 * shallow clone
 * @param {Array | Object} obj
 * @returns {Object}
 * @reference https://github.com/jashkenas/underscore/blob/a15d1afc70/modules/clone.js
 */
function shallowClone(obj) {
    if (typeof obj !== 'object' || !obj) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.slice();
    } else {
        const cloned = Object.create(null);
        for (let key in obj) {
            cloned[key] = obj[key];
        }
        return cloned;
    }
}

function shallowClone2(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    const cloned = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = obj[key];
        }
    }
    return cloned;
}