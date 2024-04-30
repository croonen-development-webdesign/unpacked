const {getManifests} = require("../../lib/extensions/manifests");

module.exports = (req, res) => {
    const manifests = getManifests();
    // fs.writeFileSync(edge_extensions_list, JSON.stringify(manifests));
    res.render('extensions', {
        extensions: manifests,
        activeRoute: req.originalUrl,
    });
};
