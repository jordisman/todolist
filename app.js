const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
// const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var items = ['Buy Food', 'Cook Food', 'Eat Food'];

app.get('/', function(req, res) {
  var today = new Date();
  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  var day = today.toLocaleDateString('en-US', options);

  res.render('list', {
    kindOfDay: day,
    newListItems: items
  });
});

app.post('/', function(req, res) {
  var item = req.body.newItem; //grab hold of newItem

  items.push(item);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('listening to port 3000');
});