var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var view = path.join(__dirname,'../views/');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.sendFile(path.join(__dirname, '../views', 'old_create.html')); __dirname F:\demo-node\demo-web-components\routes
  res.sendFile(view+'old_create.html');
});
router.get('/new',function(_,res,_){
  res.sendFile(view+'new_create.html');
})

module.exports = router;
