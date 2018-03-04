var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var orm = require('./ormlite');
var conString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/ormlite';
var Users = new orm(conString,'test_user');

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  Users.getAll(function(data){
  });
  res.render('index',{});
});

app.get('/id/:id', function(req, res){
  Users.findById(req.params.id, function(data){
  });
res.render('index',{});
});

app.get('/verify', function(req, res){
  Users.authenticate(function(data){
  });
});

app.get('*', function(req, res) {
    res.status(404).send('404 error');
});

app.listen(port, function () {
    console.log("App is running on port " + port);
});
