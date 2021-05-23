/**
 * Copy text in browser
 * @see https://stackoverflow.com/questions/40147676/javascript-copy-to-clipboard-on-safari
 */
window.Clipboard = (function (window, document, navigator) {
  var textArea, copy;

  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText() {
    var range, selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  function copyToClipboard() {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  copy = function (text) {
    createTextArea(text);
    selectText();
    try {
      copyToClipboard();
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    copy: copy,
  };
})(window, document, navigator);

// How to use
Clipboard.copy('text to be copied');
