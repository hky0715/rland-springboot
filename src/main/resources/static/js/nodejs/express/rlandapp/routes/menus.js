var express = require('express');
var router = express.Router();

/* GET menus listing. */
router.get('/list', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/detail', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
