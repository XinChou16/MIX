// src/core/util/lang.js

/**
 * Parse simple path.
 */
const bailRE = /[^\w.$]/;
export function parsePath(path) {
	if (bailRE.test(path)) {
		return;
	} else {
		const segments = path.split('.');
		return function (obj) {
			for (let i = 0; i < segments.length; i++) {
				if (!obj) return;
				obj = obj[segments[i]];
			}
			return obj;
		};
	}
}
