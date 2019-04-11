const express = require('express');
const router  = express.Router();
const secure  = require('../middlewares/secure.mid');

/* GET home page */
router.get('/', secure.isAuthenticated, users.list);
router.post('/:id/delete', secure.isAuthenticated, secure.checkRole('Boss'), users.delete)

module.exports = router;
