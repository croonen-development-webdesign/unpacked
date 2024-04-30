const {edge_extensions_dir} = require("../../config");
const fs = require("fs");

function sortManifests(a,b) {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName > bName) return 1;
    if (aName < bName) return -1;
    return 0;
}

function keyFromName(name) {
    if (!name) return name;

    if (name.startsWith('__')) name = name.substring(2);
    if (name.endsWith('__')) name = name.substring(0, name.length - 2);
    name = name.replace(/MSG_/, '');
    return name;
}

function nameAndDescription(messages, manifest) {
    const keyName = keyFromName(manifest.name);
    const keyDescription = keyFromName(manifest.description);
    const messageName = messages[keyName];
    const messageDescription = messages[keyDescription];
    if (messageName) {
        manifest.name = messageName.message;
    }
    if (messageDescription) {
        manifest.description = messageDescription.message;
    }
}

function localizeManifest(manifest, lpath) {
    const localesDir = lpath + '/_locales';
    if (fs.existsSync(localesDir)) {
        let localesEn = localesDir + '/' + 'en' + '/messages.json';
        if (!fs.existsSync(localesEn)) {
            localesEn = localesDir + '/' + 'en_US' + '/messages.json';
        }
        if (fs.existsSync(localesEn)) {
            const data = fs.readFileSync(localesEn);
            const messages = JSON.parse(data);
            nameAndDescription(messages, manifest);
        } else {
            console.log('>>> ' + localesEn + ' doesn\'t exist')
        }
    } else {
        console.log(localesDir + ' not found')
    }
}

function getStore(manifest) {
    if (manifest.update_url && manifest.update_url.indexOf('crx') !== -1) {
        if (manifest.update_url.indexOf('google') !== -1) {
            manifest.store = 'google';
        }
        if (manifest.update_url.indexOf('edge') !== -1) {
            manifest.store = 'edge';
        }
    }
}

function getManifest(latest_path) {
    const data = fs.readFileSync(latest_path + '/manifest.json');
    return JSON.parse(data);
}

function getIconPath(manifest) {
    if (manifest.icons) {
        return manifest.icons['32'] || manifest.icons['48'] || manifest.icons['16']
            || manifest.icons['128']
    }
    return null;
}

function getManifests() {
    const files = fs.readdirSync(edge_extensions_dir, {withFileTypes: true});
    const manifests = [];
    for (const file of files) {
        if (file[0] !== '.' && file.isDirectory()) {
            const fdir = edge_extensions_dir + '/' + file.name;
            const versionfiles = fs.readdirSync(fdir);
            const latest = versionfiles[versionfiles.length - 1];
            if (latest) {
                const latest_path = fdir + '/' + latest;
                const manifest = getManifest(latest_path);
                manifest.rootDir = file.name + '/' + latest;
                manifest.iconPath = getIconPath(manifest);
                manifest.id = file.name;
                if (manifest.name.startsWith('__') || manifest.description.startsWith('__')) {
                    localizeManifest(manifest, latest_path);
                }
                getStore(manifest);
                manifests.push(manifest);
            } else {
                console.log('no version found for ' + file.name);
            }
        }
    }
    manifests.sort(sortManifests);
    return manifests;
}

module.exports = {getManifests, localizeManifest, getManifest}
