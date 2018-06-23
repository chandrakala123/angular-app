var myApp = angular.module('myApp', ['ngRoute', 'ngStorage']);



   myApp.factory('service',function(){
       var temp="";
       add=function(y){
   temp=y;
       }
 
      return{
          set:function(y){
            add(y);
          },
          get:function(){
              return temp;
          }
      }
   
   })
 myApp.service('service1',function(){
 this.temp="";
 this.setData=function(y){
     this.temp=y;
   
 }
 this.getData=function(){
 return this.temp;
 }

    
   
 })
 myApp.directive('patientInfo',function(){
    return{
        restrict:'E',
        template:'<table class="table table-bordered">'+
          '<td>{{user.hospitalPatientId}} {{user.deptName}}{{user.doctorName}} {{user.token}} {{user.regId}}{{user.patientVisitId}}{{user.patientName}}{{user.patientAge}}{{user.mobileNumber}}  {{user.gender}}{{user.dateOfBirth}}{{user.feeValidDate}}  {{user.patientStatus}}{{user.feeValidVisits}}</td>'+
         
             '</table>',       
        
        scope:{user:"=user"}    


    }
})


    // configure our routes
    myApp.config(function($routeProvider, $locationProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });

            $locationProvider.html5Mode(true);
    });

    // create the controller and inject Angular's $scope
    myApp.controller('mainController', function ($scope,$localStorage,$sessionStorage,service1,service){

$scope.login=function(){
    var obj={
        "name":$scope.username,
        "pass":$scope.password

    }
    var y=obj.name;
    var y=obj.name;
    $localStorage.Obj=obj;
    console.log($localStorage.Obj);
    $sessionStorage.Obj=obj;
    console.log($sessionStorage.Obj);
   // console.log(y);
   // $scope.obname=$localStorage.obj.username;
   
   // var y=$scope.obj.username;
   service.set(y);
   service1.setData(y);
 

}



        });


   



    myApp.controller('aboutController',function($scope,$localStorage,$sessionStorage,service1,service,$http){
    var fact=service.get();
    var ser=service1.getData();
    $scope.facout="i am from factory:"+fact;
   $scope.ser1="i am from services:"+ser;
   $scope.output="this is from local:"+$localStorage.Obj.name;
   $scope.session="this is from session:"+$sessionStorage.Obj.name;
   var payload = { "fromDate": "2018-04-29", "toDate": "2018-05-29", "orgId": 2253, "authenticatedUserId": 220171221000002 };

 $http.post('http://49.207.6.227:8047/opd/fetchPatientVisitDetails', payload)

    .then(function (response) {
        //$scope.output= response.data;
         $scope.details = response.data.data.patientVisitList;
        $scope.statuscode = response.status;
        //console.log($scope.output);
     });

  


    });

    myApp.controller('contactController', function($scope,$localStorage,$sessionStorage) {
        $scope.msg = 'Contact us! JK. This is just a demo.';
        $scope.heading = "Details";
      
       
        $scope.signup=function(){
          var object={
              "name":$scope.name,
              "email":$scope.email,
              "password":$scope.password,
              "phn":$scope.phn,
              "address":$scope.address
          };
   
         $localStorage.object=object;
        
         console.log($localStorage.object)
        
        }
    });
