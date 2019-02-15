const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//if use item = '', last item will get over written
var items = ['Buy Food', 'Walk the dog', 'Do laundry'];

app.get('/', function(req, res) {
  var today = new Date();
  // var currentDay = today.getDay();
  //The getDay() method returns the day of the week
  // var day = '';

// if (currentDay === 0) {
//   day = 'Sunday';
// } else if (currentDay === 6) {
//   day = 'Saturday';
// } else if (currentDay === 5) {
//   day = 'Friday';
// } else if (currentDay === 4) {
//   day = 'Thursday';
// } else if (currentDay === 3) {
//   day = 'Wednesday';
// } else if (currentDay === 2) {
//   day = 'Tuesday';
// } else if (currentDay === 1) {
//   day = 'Monday';
// }
  //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  var day = today.toLocaleDateString('en-US', options);
  //res.render(view [, locals] [, callback])
  //locals: an obj whose props define local variables for the view
  res.render('list', {
    kindOfDay: day,
    newListItems: items
  });
});

app.post('/', function(req, res) {
  //console.log('req.body = ', req.body)
  var item = req.body.newItem; //input name="newItem"

  items.push(item);
  //cant use res.render('list', {kindOfDay: day})
  res.redirect('/'); //when post is triggered, go back to get /
});

app.listen(3000, function() {
  console.log('listening to port 3000');
});