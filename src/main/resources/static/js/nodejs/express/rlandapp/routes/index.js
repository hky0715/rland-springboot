var express = require('express');
var router = express.Router();

/* GET home page. */
// render로 모델을 전달함
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'
                    //  , layout: 'inc/layout' 
                    }); // app.js에서 ejs template views설정을 미리 해줬으니까 이렇게만 써도 찾을 수 있다. 얘는 vue 엔진이 사용하니까!
});

module.exports = router;
