const {reveal, fileExists, writeManifestName} = require("../../../lib/extensions/finder");
const {sendIcon} = require("../../../lib/extensions/icon");
const config = require("../../../config");
const {exec} = require("child_process");

function revealExtension(req, res) {
    const {id} = req.params;
    fileExists(id)
        .then(result => {
            if (result) {
                reveal(id)
                    .then(result => {
                        // console.log(result);
                        res.send(JSON.stringify(result));
                    })
                    .catch(err => {
                        console.log('reveal error:', err);
                        res.send(err);
                    })
            } else {
                res.send(JSON.stringify(404));
            }
        });
}

function existsExtension(req, res) {
    const {id} = req.params;
    fileExists(id)
        .then(result => {
            const msg = 'exists result: ' + result;
            // console.log(msg);
            // if (result) {
                res.send(msg);
            // } else {
            //     res.sendStatus(404);
            // }
        })
        .catch(err => {
            console.log('exists error:', err);
            res.send(err);
        })
}

function imageExtension(req, res) {
    const {iconpath} = req.query;
    sendIcon(res, iconpath);
}

function toIde(req, res) {
    const {path} = req.query;
    const fullPath = config.edge_extensions_dir + '/' + path;
    const cmd = `'${config.idea_toolbox.webstorm}' '${fullPath}'`;
    writeManifestName(fullPath);
    exec(cmd);
    res.send();
}

module.exports = {revealExtension, existsExtension, imageExtension, toIde};
