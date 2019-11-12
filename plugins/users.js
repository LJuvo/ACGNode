var express = require('express');
var router = express.Router();
var db = require('../lib/mysql.lib');

/* GET users listing. */
router.get('/', function(req, res, next) {
  (async ()=>{
    let s = await db.FindAll('user', '');
    console.log(s);
  })();

  return res.send('respond with a resource');
});
/* GET users listing. */
router.get('/insert', function(req, res, next) {
  (async ()=>{
    let s = await db.INSERT('user', {
      username  : 'Juvos',
      userpass  : '123456',
      usertel   : '123555',
      userwx    : '74516'
    },'');
    console.log(s);
  })();

  return res.send('respond with a resource');
});
router.get('/update', function(req, res, next) {
  (async ()=>{
    let s = await db.UPDATE('user', {
      username  : 'Juvos',
      userpass  : '456789',
      usertel   : '123456',
      userwx    : '88888'
    },{
      username  : 'Juvos' 
    });
    console.log(s);
  })();

  return res.send('respond with a resource');
});
router.get('/del', function(req, res, next) {
  (async ()=>{
    let s = await db.DELETE('user', {
      username  : 'Juvos'
    });
    console.log(s);
  })();

  return res.send('respond with a resource');
});
router.get('/page', function(req, res, next) {
  (async ()=>{
    let s = await db.PAGE('user','');
    console.log(s);
  })();

  return res.send('respond with a resource');
});
router.get('/page/:pageNum', function(req, res, next) {
  (async ()=>{
    console.log(req.params.pageNum);
    let s = await db.PAGE('user','',req.params.pageNum);
    console.log(s);
  })();

  return res.send('respond with a resource');
});

module.exports = router;
