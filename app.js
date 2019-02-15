const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//if use item = '', last item will get over written
var items = ['buy apples', 'go running'];
var complete = ['complete task 1'];

//first load up home page /
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
    newListItems: items,
    completeItems: complete
  });
});

app.post('/add', function(req, res) {
  //console.log('req.body = ', req.body)
  var item = req.body.newItem; //input name="newItem"

  items.push(item);
  //cant use res.render('list', {kindOfDay: day})
  res.redirect('/'); //when post is triggered, go back to get /
});

app.post('/removeme', function(req, res) {
  console.log('req.body.check = ', req.body.check)
  var completeTask = req.body.check;

  if (typeof completeTask === 'string') {
    complete.push(completeTask);
    items.splice(items.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      items.splice(items.indexOf(completeTask[i]), 1);
    }
  }

  res.redirect('/');
});

app.listen(3000, function() {
  console.log('listening to port 3000');
});