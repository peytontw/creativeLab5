var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/commentDB',{useMongoClient:true});

var incomeSchema = mongoose.Schema({
  monthlyIncome: Number,
  yearlyIncome: Number
});

var savingsSchema = mongoose.Schema({
  monthlySavings: Number,
  yearlySavings: Number
});

var expensesSchema = mongoose.Schema({
  name: String
  monthlyExpenses: Number,
  yearlyExpenses: Number
});

var Income = mongoose.model('Income', incomeSchema);
var Savings = mongoose.model('Savings', savingsSchema);
var Expenses = mongoose.model('Expenses', expensesSchema);

var db = mongoose.connection; //Saves the connection as a variable to use
  db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
  db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});

router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/income', function(req, res, next) {
  console.log("In the income GET route");
  Income.find(function(err, incomeList) {
    if (err) return console.error(err);
    else if (incomeList.length == 0) {
      console.log('Income is 0');
      res.json({monthlyIncome: 0, yearlyIncome: 0});
    }
    else {
      console.log(incomeList[0]);
      res.json(incomeList[0]);
    }
  });
});

router.put('/income', function(req, res, next) {
  var newIncome = new Income(req.body);
  console.log(newIncome);
  Income.remove(function(err) {
    if (err) return console.log(err);
    else console.log('Deleted old income');
  });
  newIncome.save(function(err, post) {
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

router.get('/savings', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // {monthlySavings, yearlySavings}
});

router.get('/expenses', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // [{name, monthlyExpense, yearlyExpense}]
});

router.put('/savings', function(req, res, next) {
  // res.render('index', { title: 'Express' });
});

router.put('/expenses', function(req, res, next) {
  // res.render('index', { title: 'Express' });
});

/* GET home page. */
// router.get('/fake', function(req, res, next) {
//   console.log("Inside Fake");
//   var fakelist=[{Name:"Jim",Comment:"Hi"}];
//   res.render('index', { title: 'Express' });
// });
//
// /* GET comments from database */
// router.get('/comment', function(req, res, next) {
// console.log("In the GET route? yes");
// Comment.find(function(err,commentList) { //Calls the find() method on your database
//   if (err) return console.error(err); //If there's an error, print it out
//   else {
//     console.log(commentList); //Otherwise console log the comments you found
//     res.json(commentList);
//   }
// })
// });
//
// router.delete('/comment', function(req,res,next) {
//   console.log("Delete");
//   Comment.remove(function(err) {
//     if(err) return console.error(err);
//     else {
//       console.log("Delete worked");
//       res.sendStatus(200);
//     }
//   })
// });
//
// router.post('/comment', function(req, res, next) {
//   console.log("POST comment route"); //[1]
//   console.log(req.body);
//   var newcomment = new Comment(req.body); //[3]
//   console.log(newcomment); //[3]
//   newcomment.save(function(err, post) { //[4]
//     if (err) return console.error(err);
//     console.log(post);
//     console.log(req.body); //[2]
//     res.sendStatus(200);
//   });
// });

module.exports = router;
