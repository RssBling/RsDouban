/**
 * doubanApp.detail Module
 *
 * Description
 */
(function() {
    var detailModule = angular.module('doubanApp.detail', ['doubanApp.service']);

    detailModule.config(['$routeProvider', function($routeProvider) {
    
        $routeProvider.
    
        when('/detail/:movieId', {
    
            templateUrl: 'detail/detail.html',
    
            controller: 'DetailController'
    
        })
    
    }])
   
   detailModule.controller('DetailController', ['$scope','$routeParams','JsonpService','appConfig',function($scope,$routeParams,JsonpService,appConfig) {
   
        $scope.loading = false;
   
        JsonpService.jsonp(appConfig.detaiUrl + $routeParams.movieId, {}, function(res) {
   
            // console.log(res)
   
            $scope.movie = res;
   
            $scope.loading = true;
   
            $scope.$apply();
   
        })
   
    }])

})();
