(function(){
	var listModule = angular.module('doubanApp.listModule',['doubanApp.service']);

      listModule.config(['$routeProvider',function($routeProvider){
      
          $routeProvider. when('/:category/:page?',{ //category--路由参数
   
             templateUrl:'list/list.html',
   
            controller:'ListController'
   
          })

      }])

      listModule.controller('ListController',['$scope','$http','JsonpService','$routeParams','$route','$rootScope','appConfig',function($scope,$http,JsonpService,$routeParams,$route,$rootScope,appConfig){
      
      $rootScope.category =$routeParams.category;
        
        $rootScope.search = function(){

            $route.updateParams({category:'search',q:$rootScope.input});
        }
        
       var count = appConfig.pageCount;

       var currentPage = parseInt($routeParams.page || 1);//如果没值则为第一页,未输入值时currentPage为undefined,currentPage可能是一个字符串

       $scope.currentPage = currentPage;

       var start = (currentPage - 1) * count;//currentPage为undefined时,start是NAN 类型的

       JsonpService.jsonp('https://api.douban.com/v2/movie/'+$routeParams.category,{count:count,start:start,q:$routeParams.q},function(res){
       
           console.log(res);

           $scope.subjects = res.subjects;

           $scope.total = res.total;

           $scope.title = res.title;

           $scope.totalPage = Math.ceil($scope.total/count);

          $scope.pageConfig = {total:$scope.totalPage,current:currentPage,show:10,click:function(index){
          
             $route.updateParams({page:index})

             $route.reload();

      }};

      $scope.$apply();

            $scope.hundlePage = function(page){

              page = Math.min(Math.max(page,1),$scope.totalPage);

               $route.updateParams({page:page})
           }

       })

    }])

})()