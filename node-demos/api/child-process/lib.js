const path = require('path');
const { fork } = require('child_process');

function actionFork(filename, params) {
  return new Promise((resolve, reject) => {
    const forkedChild = fork(path.resolve(__dirname, filename));

    forkedChild.on('message', (data) => {
      resolve(data);
    });

    forkedChild.on('exit', (code) => {
      if (code != 0) {
        reject('exit with code: ' + code);
      }
    });

    forkedChild.send(params);
  });
}

function listenMessage() {
  process.on('message', (data) => {
    if (data) {
      // ...
      process.send(data);
    }
  });
}

exports.actionFork = actionFork;
exports.listenMessage = listenMessage;
