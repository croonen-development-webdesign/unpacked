const {executeAsPromise} = require('../shared/execute');
const config = require('../../config');
const {stat} = require("fs");
const fs = require("fs");
const {localizeManifest, getManifest} = require("./manifests");

function writeManifestName(latest_path) {
    const ideaDir = latest_path + '/.idea';
    const ideaProjectNameFile = ideaDir + '/.name';
    if (!fs.existsSync(ideaProjectNameFile)) {
        const manifest = getManifest(latest_path);
        if (manifest.name.startsWith('__')) {
            localizeManifest(manifest, latest_path);
        }
        fs.mkdirSync(ideaDir, {recursive: true});
        fs.writeFileSync(ideaProjectNameFile, manifest.name);
    }
}

function reveal(id) {
    const fdir = config.edge_extensions_dir + '/' + id;
    const versionfiles = fs.readdirSync(fdir);
    const latest = versionfiles[versionfiles.length - 1];
    const latest_path = fdir + '/' + latest;
    const cmd = `open '${latest_path}'`;
    writeManifestName(latest_path);
    return executeAsPromise(cmd);
}

function fileExists(id) {
    return new Promise((resolve, reject) => {
        const path = config.edge_extensions_dir + '/' + id;
        stat(path, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    resolve(false);
                    return;
                }
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}

module.exports = {reveal, fileExists, writeManifestName};
