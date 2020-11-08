const router = require('express').Router();

(require('./routes/pages'))(router);
(require('./routes/users'))(router);
(require('./routes/sessions'))(router);
(require('./routes/mods'))(router);
(require('./routes/modpacks'))(router);

module.exports = router;