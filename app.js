const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//if use item = '', last item will get over written
// var items = ['buy apples', 'go running'];
mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true });

var itemsSchema = new mongoose.Schema({
  name: String
});

var Item = mongoose.model('Item', itemsSchema);

var item1 = new Item({
  name: 'Buy Apples'
});
var item2 = new Item({
  name: 'Walk the dog'
});
var item3 = new Item({
  name: 'Go to gym'
});


var defaultItems = [item1, item2, item3];

//first load up home page /
app.get('/', function(req, res) {
  var today = new Date();
  // var currentDay = today.getDay();
  //The getDay() method returns the day of the week
  // var day = '';

  //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  var day = today.toLocaleDateString('en-US', options);


    Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('insertMany OK!')
        }
      });
      res.redirect('/');
      //after insert items, it stops and won't go to else - render
      //use redirect to get it to root again, then it'd be else case
    } else {
      res.render('list', { // pass a local variable to the view
        currentDay: day,
        newListItems: foundItems
      });
    }
  });
  //res.render(view [, locals] [, callback])
  //locals: an obj whose props define local variables for the view
});

app.post('/', function(req, res) {

  var item = new Item({ //create new data
    name: req.body.newItem
  });
  item.save(); //save to db, like push to arr
  res.redirect('/');
});

app.post('/delete', function(req, res) {
  console.log(req.body);
  var checkedItemId = req.body.checkbox;
//Model.findByIdAndRemove()
  Item.findByIdAndRemove(checkedItemId, function(err) {
    if (!err) {
      console.log('Removed!')
      res.redirect('/');
    }
  });

});

app.listen(3000, function() {
  console.log('listening to port 3000');
});
