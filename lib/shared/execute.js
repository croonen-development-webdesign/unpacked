const { exec } = require('child_process');

function execute(cmd) {
    exec(cmd, (err) => {
        if (err) {
            console.error(err);
        }
        // else {
        //     console.log(`stdout: ${stdout}`);
        //     console.log(`stderr: ${stderr}`);
        // }
    });
}

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

function executeItem(name, itemgetter, getcmd) {
    return new Promise((resolve, reject) => {
        itemgetter(name)  // call forward
            .then(items => {
                const cmd = getcmd(items[0]); // call back
                // debug(cmd);
                executeAsPromise(cmd)
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            })
            .catch(err => {
                console.error(err);
                reject(err);
            })
    });
}

module.exports = {execute, executeAsPromise, executeItem};
