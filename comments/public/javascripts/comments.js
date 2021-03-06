angular.module('app', [])
.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.rows=[];

  $scope.monthlySavings = 0;
  $scope.yearlySavings = 0;
  $scope.savingsPercent = 0;
  $scope.newMonthly = 0;
  $scope.newYearly = 0;


  $http.get('/income').then(function(data){
    console.log(data);

    if (data.data.monthlyIncome != 0)
    {
      $scope.incomeInput.monthlyIncome = data.data.monthlyIncome;
      $scope.incomeInput.yearlyIncome = data.data.yearlyIncome;



      var totalMonthlyExpenses = 0;

      for(var i=0; i<$scope.rows.length; i++){
        totalMonthlyExpenses += $scope.rows[i].monthlyExpense;
      }

      var savingsTotal = ($scope.incomeInput.monthlyIncome);
      savingsTotal -= totalMonthlyExpenses;

      $scope.monthlySavings = savingsTotal;
      $scope.yearlySavings = (savingsTotal*12);
      $scope.savingsPercent = ($scope.monthlySavings / $scope.incomeInput.monthlyIncome * 100);
    }

    else
    {

    }

  });


  $http.get('/expenses').then(function(data){
    console.log(data);

      angular.copy(data.data, $scope.rows);


      var totalMonthlyExpenses = 0;

      for(var i=0; i<$scope.rows.length; i++){
        totalMonthlyExpenses += $scope.rows[i].monthlyExpense;
      }

      var savingsTotal = ($scope.incomeInput.monthlyIncome);
      savingsTotal -= totalMonthlyExpenses;

      $scope.monthlySavings = savingsTotal;
      $scope.yearlySavings = (savingsTotal*12);
      $scope.savingsPercent = ($scope.monthlySavings / $scope.incomeInput.monthlyIncome * 100);


      console.log("");
  });


  $scope.addIncome = function () {

    var totalMonthlyExpenses = 0;

    for(var i=0; i<$scope.rows.length; i++){
      totalMonthlyExpenses += $scope.rows[i].monthlyExpense;
    }

    var savingsTotal = ($scope.incomeInput.monthlyIncome);
    savingsTotal -= totalMonthlyExpenses;

    $scope.monthlySavings = savingsTotal;
    $scope.yearlySavings = (savingsTotal*12);
    $scope.savingsPercent = ($scope.monthlySavings / $scope.incomeInput.monthlyIncome * 100);


    var myJSONincome = {monthlyIncome:$scope.incomeInput.monthlyIncome, yearlyIncome:$scope.incomeInput.yearlyIncome};
    $http.post('/income', myJSONincome).then(function(data){
      console.log("Income updated");
    });


  };

  $scope.updateYearlyIncome = function(row) {
    row.yearlyIncome = row.monthlyIncome * 12;
  };

  $scope.updateMonthlyIncome = function(row) {
    row.monthlyIncome = row.yearlyIncome / 12;
  };


  $scope.updateYearlyInput = function(row) {
    row.yearlyExpense = row.monthlyExpense * 12;
    row.percent = row.monthlyExpense / $scope.incomeInput.monthlyIncome * 100;

    var totalMonthlyExpenses = 0;

    for (var i=0; i<$scope.rows.length; i++){
      totalMonthlyExpenses += $scope.rows[i].monthlyExpense;
    }


    var savingsTotal = ($scope.incomeInput.monthlyIncome);
    savingsTotal -= totalMonthlyExpenses;

    $scope.monthlySavings = savingsTotal;
    $scope.yearlySavings = (savingsTotal*12);
    $scope.savingsPercent = (savingsTotal/$scope.incomeInput.monthlyIncome * 100);

    var myJSONrows = $scope.rows;
    $http.post('/expenses', myJSONrows).then(function(data){
      console.log("Expenses updated");
    });
  };

  $scope.updateMonthlyInput = function(row) {
    row.monthlyExpense = row.yearlyExpense / 12;
    row.percent = row.monthlyExpense / $scope.incomeInput.monthlyIncome * 100;

    var totalMonthlyExpenses = 0;

    for(var i=0; i<$scope.rows.length; i++){
      totalMonthlyExpenses += $scope.rows[i].monthlyExpense;

    }


    var savingsTotal = ($scope.incomeInput.monthlyIncome);
    savingsTotal -= totalMonthlyExpenses;

    $scope.monthlySavings = savingsTotal;
    $scope.yearlySavings = (savingsTotal*12);
    $scope.savingsPercent = (savingsTotal/$scope.incomeInput.monthlyIncome * 100);

    var myJSONrows = $scope.rows;
    $http.post('/expenses', myJSONrows).then(function(data){
      console.log("Expenses updated");
    });
  };

  $scope.addNew = function (row) {

    if($scope.incomeInput.monthlyIncome <= 0){
      alert("You can't buy things without money, fool ;) Add income first. Thanks.");
    }
    else {
      $scope.newMonthly = row.monthlyExpense;
      $scope.newYearly = row.yearlyExpense;

      $scope.rows.push({
        name: row.name,
        monthlyExpense: row.monthlyExpense,
        yearlyExpense: row.yearlyExpense,
        percent: ((row.monthlyExpense / $scope.incomeInput.monthlyIncome) * 100)
      });

      row.name = '';
      row.monthlyExpense = '';
      row.yearlyExpense = '';

      var totalMonthlyExpenses = 0;

      for(var i=0; i<$scope.rows.length; i++){
        totalMonthlyExpenses += $scope.rows[i].monthlyExpense;
      }

      var savingsTotal = ($scope.incomeInput.monthlyIncome);
      savingsTotal -= totalMonthlyExpenses;

      $scope.monthlySavings = savingsTotal;
      $scope.yearlySavings = (savingsTotal*12);
      $scope.savingsPercent = (savingsTotal/$scope.incomeInput.monthlyIncome * 100);
    }

    var myJSONrows = $scope.rows;
    $http.post('/expenses', myJSONrows).then(function(data){
      console.log("Expenses updated");
    });

  };
}
]);


// $(document).ready(function(){
//
//   $("#postComment").click(function(){
//     var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
//     jobj = JSON.stringify(myobj);
//     $("#json").text(jobj);
//     var url = "comment";
//     $.ajax({
//       url:url,
//       type: "POST",
//       data: jobj,
//       contentType: "application/json; charset=utf-8",
//       success: function(data,textStatus) {
//         $("#done").html(textStatus);
//       }
//     })
//   });
//
//   $("#deleteComments").click(function(){
//     $("#json").text("Delete");
//     var url = "comment";
//     $.ajax({
//       url:url,
//       type: "DELETE",
//       success: function(data,textStatus) {
//         $("#done").html(textStatus);
//         $("#comments").html('');
//       }
//     })
//   });
//
//   $("#getComments").click(function() {
//     $.getJSON('comment', function(data) {
//       console.log(data);
//       var everything = "<ul>";
//       for(var comment in data) {
//         com = data[comment];
//         everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
//       }
//       everything += "</ul>";
//       $("#json").text("Get");
//       $("#done").html("success");
//       $("#comments").html(everything);
//     })
//   });
//
// });
