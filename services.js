currencyConv.service('currencyDesc',function(){

    this.currencySymbolList = ["USD","INR","EUR","JPY"]
    this.currencyDef = 0;

});



currencyConv.service('priceGenerator',['$resource','currencyDesc','$http','$q','$timeout',function($resource,currencyDesc,$http,$q,$timeout){

    var apiKey = "ce40db43f1c79bc9efdd3740b20e79dc";
    var q = $q.defer();
   
    this.getCurrencyDetails = function(){

       
        var deferredObject = $q.defer();
        var currencyAPI = $resource('http://www.apilayer.net/api/live?',{access_key : apiKey , format :1}
        )
        
        var a = currencyAPI.get();
        a.$promise.then(function(result){
            deferredObject.resolve(result)
        });
        
        return deferredObject.promise
    }

}]);