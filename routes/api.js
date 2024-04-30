const {revealExtension, existsExtension, imageExtension, toIde} =
    require("../controllers/extensions/api");
const router = require('express').Router();

/**
 * open the directory of an installed extension of Microsoft Edge
 */
router.get('/reveal/:id', revealExtension);
router.get('/exists/:id', existsExtension);
router.get('/image/', imageExtension);
router.get('/ide/', toIde);

module.exports = router;
