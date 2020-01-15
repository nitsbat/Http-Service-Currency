var currencyConv = angular.module('currencyConv',['ngRoute','ui.router','ngResource']);

currencyConv.config(['$routeProvider', function($routeProvider){
    $routeProvider

    .when('/input',{
        templateUrl : 'pages/input.html',
        controller : 'MainController'
    })

}]);

currencyConv.controller('MainController',['$scope','currencyDesc','$location','$sce','$rootScope','$state','priceGenerator','$timeout',
                                function($scope,currencyDesc,$location,$sce,$rootScope,$state,priceGenerator,$timeout){
                
    $scope.textInput = currencyDesc.currencyDef;
    $scope.sym = "";
    $scope.$watch('textInput',function(){
        currencyDesc.currencyDef = $scope.textInput;
    })

    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        // console.log(event)
        // console.log(next)
        // console.log(current)
        if(next==current){
            $location.path('/');
        }
    }); // // This is for getting to homepage everytime page refreshes. next refers to the next url while current is on the current url, but on refresh the current becomes the new one

    $scope.nameTitle = "Nitin";
    
    $scope.list = [
        {
            name : "USD - (US Dollars)",
            currency : currencyDesc.currencySymbolList[0],
            symbol : "&#36;",
        },
        {   
            name : "INR - (Indian Rupees)",
            currency : currencyDesc.currencySymbolList[1],
            symbol : "&#8377;"
        },
        {
            name : "EUR - (Euro)",
            currency : currencyDesc.currencySymbolList[2],
            symbol : "&#8364;"
        },
        {
            name : "JPY - (Japanese Yen)",
            currency : currencyDesc.currencySymbolList[3],
            symbol : "&#165;"
        }
    ]


   
    $scope.getPrice = function(){
        console.log('sad');
        //console.log($scope.textInput);
        //console.log($scope.currencySelected.currency)
        var currencyToConvertObj = $scope.currencySelected;
        var amountToConvert = $scope.textInput;
        $scope.finalChange1(currencyToConvertObj.symbol)
        $scope.res = priceGenerator.getCurrencyDetails();
        $scope.res.then(function(result){
            $scope.mainPrice = $scope.checkCurrency(sym,result.quotes,currencyToConvertObj,amountToConvert);
        })  
    }

    $scope.checkCurrency = function(sym,quotes,currencyToConvertObj,amt){
        console.log(quotes)
        $scope.sym = sym
        console.log($scope.sym)
        if(sym == "&#36;"){
            if(currencyToConvertObj.currency == "USD"){
                return amt*1;
            }
            else if(currencyToConvertObj.currency == "INR"){
                return (amt*quotes["USDINR"]).toFixed(2)
            }
            else if(currencyToConvertObj.currency == "EUR"){
                return (amt*quotes["USDEUR"]).toFixed(2)
            }
            else if(currencyToConvertObj.currency == "JPY"){
                return (amt*quotes["USDJPY"]).toFixed(2)
            }
        }else if(sym == "&#8377;"){
            var den = quotes["USDINR"];
            if(currencyToConvertObj.currency == "USD"){
                return amt*(1/den).toFixed(2)
            }
            else if(currencyToConvertObj.currency == "INR"){
                return amt*1
            }
            else if(currencyToConvertObj.currency == "EUR"){
                return (amt*(1/den)*quotes["USDEUR"]).toFixed(2)
            }
            else if(currencyToConvertObj.currency == "JPY"){
                return (amt*(1/den)*quotes["USDJPY"]).toFixed(2)
            }
        }else if(sym == "&#8364;"){
            var den = quotes["USDEUR"];
            if(currencyToConvertObj.currency == "USD"){
                return amt*(1/den).toFixed(2)
            }
            else if(currencyToConvertObj.currency == "INR"){
                return (amt*(1/den)*quotes["USDINR"]).toFixed(2)
            }
            else if(currencyToConvertObj.currency == "EUR"){
                return amt*1
            }
            else if(currencyToConvertObj.currency == "JPY"){
                return (amt*(1/den)*quotes["USDJPY"]).toFixed(2)
            }
        }else if(sym == "&#165;"){
            var den = quotes["USDJPY"];
            if(currencyToConvertObj.currency == "USD"){
                return amt*(1/den).toFixed(2)
            }
            else if(currencyToConvertObj.currency == "INR"){
                return (amt*(1/den)*quotes["USDINR"]).toFixed(2)
            }
            else if(currencyToConvertObj.currency == "EUR"){
                return (amt*(1/den)*quotes["USDEUR"]).toFixed(2)
            }
            else if(currencyToConvertObj.currency == "JPY"){
                return 1*amt
            }
        }
    }

    $scope.getSymbol = function(currencyName){
        if(currencyName == "USD"){
            return $scope.list[0].symbol;
        }else if(currencyName == "INR"){
            return $scope.list[1].symbol;
        }else if(currencyName == "EUR"){
            return $scope.list[2].symbol;
        }else{
            return $scope.list[3].symbol;
        }
    }

    var field ;
    var newField;
    $scope.finalChange = function(sym){

        field = '<span class="input-group-text" style="color: green; font-size: 13pt" >%sym%</span>';
        newField = field.replace("%sym%",sym);
        //console.log(newField);
        $scope.trustedField = $sce.trustAsHtml(newField);
    }
    $scope.finalChange1 = function(sym){

        field = '<span class="input-group-text" style="color: green; font-size: 13pt" >%sym%</span>';
        newField = field.replace("%sym%",sym);
        console.log(newField);
        $scope.trustedField1 = $sce.trustAsHtml(newField);
    }
    
    $scope.Onclick = function(currencyName){
        $location.path('/input');
        sym = $scope.getSymbol(currencyName);
        $scope.finalChange(sym);
        $scope.sym = sym;
       // console.log($scope.sym)
    }

}]);