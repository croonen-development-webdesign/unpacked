const homedir = require('os').homedir();
const toolboxdir = homedir + '/Library/Application Support/JetBrains/Toolbox';

module.exports = {
    port: 3019,
    edge_extensions_dir: homedir + '/Library/Application Support/Microsoft Edge/Default/Extensions',
    edge_extensions_list: homedir + '/Dev/node/unpacked/tmp/extensions-list2.json',
    idea_toolbox: {
        webstorm: toolboxdir + '/WebStorm',
        phpstorm: toolboxdir + '/PhpStorm',
        pycharm:  toolboxdir + '/PyCharm',
        idea:  toolboxdir + '/Idea',
    },
}
