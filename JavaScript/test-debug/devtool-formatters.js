/**
 * formatters
 */

window.devtoolsFormatters = [{
    header(obj) {
        if (!obj.__clown) {
            return null;
        }
        delete obj.__clown;
        const style = `
            color: red;
            border: dotted 2px gray;
            border-radius: 4px;
            padding: 5px;
        `;
        try {
            const content = `🤡${JSON.stringify(obj, null, 4)}`;
            return ['div', {style}, content];
        } catch (error) {
            return null;
        }
    },
    hasBody() {
        return false;
    },
}];

console.clown = function (obj) {
    console.log({...obj, __clown: true});
}
