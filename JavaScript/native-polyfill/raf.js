/**
 * raf polyfill
 * @see https://raw.githubusercontent.com/behnammodi/polyfill/master/window.polyfill.js
 */
function polyfillRAF() {
    if (
        window.requestAnimationFrame ||
        window.cancelAnimationFrame
    ) return;

    window.requestAnimationFrame = function requestAnimationFrame(callback) {
        return setTimeout(function () {
            callback(Date.now());
        }, 1000 / 60);
    }

    window.cancelAnimationFrame = function cancelAnimationFrame(id) {
        clearTimeout(id);
    }
}