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

var expenseSchema = mongoose.Schema({
  name: String,
  monthlyExpense: Number,
  yearlyExpense: Number
});

var Income = mongoose.model('Income', incomeSchema);
var Savings = mongoose.model('Savings', savingsSchema);
var Expense = mongoose.model('Expense', expenseSchema);

var db = mongoose.connection; //Saves the connection as a variable to use
  db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
  db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});

router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/income', function(req, res, next) {
  console.log('In the income GET route');
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

router.post('/income', function(req, res, next) {
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

router.put('/savings', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // [{name, monthlyExpense, yearlyExpense}]
});

router.get('/expenses', function(req, res, next) {
  console.log('In the expenses GET route');
  Expense.find(function(err, expenseList) {
    if (err) return console.error(err);
    else {
      console.log(expenseList);
      res.json(expenseList);
    }
  });
});

router.post('/expenses', function(req, res, next) {
  var newExpenses = req.body;
  console.log(newExpenses);
  Expense.remove(function(err) {
    if (err) return console.log(err);
    else console.log('Deleted old expenses');
  });
  for(var i=0; i<newExpenses.length; i++){
    var e = new Expense(newExpenses[i]);
    e.save(function(err, post) {
      if (err) return console.error(err);
      console.log(post);
    });
  };
  res.sendStatus(200);
});

module.exports = router;
