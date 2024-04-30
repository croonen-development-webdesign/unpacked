const { exec } = require('child_process');

function executeAsPromise(cmd) {
    // console.log('cmd', cmd);
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

module.exports = {executeAsPromise};
