(function(){
	var hotModule = angular.module('doubanApp.hotModule',['doubanApp.service']);
     hotModule.controller('HotController',['$scope','$http','JsonpService','$routeParams','$route','$rootScope',function($scope,$http,JsonpService,$routeParams,$route, $rootScope){
       $rootScope.category ='hot';
       // JsonpService.jsonp('https://api.douban.com/v2/movie/in_theaters',{count:count,start:start},function(res){
       // 	$scope.subjects = res.subjects;
       var count = 5;
       var currentPage = parseInt($routeParams.page || 1);

       $scope.currentPage = currentPage;

       var start = (currentPage - 1) * count;

       JsonpService.jsonp('https://api.douban.com/v2/movie/in_theaters',{count:count,start:start},function(res){
       
       console.log(res);

       $scope.subjects = res.subjects;

       $scope.total = res.total;

       $scope.title = res.title;

       $scope.totalPage = Math.ceil($scope.total/count);

       	$scope.$apply();

       	$scope.hundlePage = function(page){

       		page = Math.min(Math.max(page,1),$scope.totalPage);

       		$route.updateParams({page:page})
       	}

       })

     }])

})()