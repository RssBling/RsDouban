(function(){
	var top250Module = angular.module('doubanApp.top250Module',[]);
      top250Module.controller('Top250Controller',['$scope','$http','JsonpService','$routeParams','$route','$rootScope',function($scope,$http,JsonpService,$routeParams,$route,$rootScope){
       $rootScope.category ='top';
       // JsonpService.jsonp('https://api.douban.com/v2/movie/top250',{count:count,start:start},function(res){
       // 	$scope.subjects = res.subjects;
       var count = 5;
       var currentPage = parseInt($routeParams.page || 1);

       $scope.currentPage = currentPage;

       var start = (currentPage - 1) * count;

       JsonpService.jsonp('https://api.douban.com/v2/movie/'+$routeParams.category,{count:count,start:start},function(res){
       
       console.log(res);

       $scope.subjects = res.subjects;
s
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