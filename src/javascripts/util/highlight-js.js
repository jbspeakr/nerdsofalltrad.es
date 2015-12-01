/*
 * Waits for HighlightJS to be loaded (up to ~16 seconds),
 * then highlights each code block
 */
class HighlightJS {

  constructor(_window = {}) {
    let onHighlightJS = () => {
      return new Promise(function(resolve, reject) {
        let
          tries = 0,
          waitForHighlightJS = () => {
            if (_window.hljs) {
              resolve();
            } else {
              if (++tries < 1000) {
                _window.setTimeout(waitForHighlightJS, 16);
              } else {
                reject();
              }
            }
          };

        waitForHighlightJS();
      });
    };

    onHighlightJS().then(() => {
      Array.prototype.slice.call(
        _window.document.querySelectorAll('pre code')
      ).forEach((el) => {
        _window.hljs.highlightBlock(el);
      });
    });
  }
}

export default HighlightJS;
