const {edge_extensions_dir} = require("../../config");

function sendIcon(res, iconpath) {
    if (iconpath.endsWith('null')) {
        res.send('');
    } else {
        const iconPath = edge_extensions_dir + '/' + iconpath;
        res.sendFile(iconPath, {headers: {'Content-Type': 'image/png'}});
    }
}

module.exports = {sendIcon};
