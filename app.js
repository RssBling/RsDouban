(function(){
   var doubanApp = angular.module('doubanApp',['ngRoute','doubanApp.detail','doubanApp.listModule']);
   //路由 每个模块的路由单独放到子模块中配置
   doubanApp.config(['$routeProvider',function($routeProvider){
   
    $routeProvider.
      otherwise({
   
        redirectTo:'/in_theaters',
   
      })
   
   }])

   //定义一个不变的值
   doubanApp.constant('appConfig',{
   
   listUrl:"https://api.douban.com/v2/movie/",
   
   detaiUrl:"https://api.douban.com/v2/movie/subject/",
 
   pageCount:5
 
   })

   doubanApp.directive('search',['$route','$routeParams','$location','$timeout',function($route,$routeParams,$location,$timeout){
   
    return{
   
           replace:true,
   
           template:'<form  ng-submit="search()" class="navbar-form navbar-right">\
                     <input ng-model="input" type="text" class="form-control" placeholder="Search...">\
                     </form>',
   
           link:function($scope,iElm,iAttrs,controller){
   
                $scope.search = function(){
   
                   if($routeParams.category){
   
                      console.log('列表页');
   
                      $route.updateParams({category:'search',q:$scope.input});
   
                    }else{
           
                       $location.path('search');
           
                       $timeout(function() {
           
                          $route.updateParams({category:'search',q:$scope.input});
           
                        },0)
          
                    }
        
                }
    
            }
    
        }
   
   }]);
  
   doubanApp.directive('page',[function(){

     return{

      replace:true,
     
      template:'<ul class="pagination"></ul>',
     
      link:function($scope,iElm,iAttrs,controller){
     
        $scope.$watch('pageConfig',function(n){
     
          if(n){
     
            var total = n.total;
     
            var show = n.show;
     
            var current = n.current;
     
            var region = Math.floor(show / 2);
     
            var begin = current - region;
     
            begin = Math.max(1,begin);
     
            var end = begin + show;
     
            if(end>total){
     
              end = total+1;
     
              begin = end - show;
     
              begin = Math.max(1,begin);
     
            }
     
            var pagination = iElm[0];
           
            for(var i = begin;i < end;i++){
           
              var li = document.createElement('li');
           
              li.innerHTML = '<a>'+i+'</a>';
           
              if(i == current){
           
                li.classList.add('active');
           
              }
           
              li.index = i;//i是最后一个值加1
           
              pagination.appendChild(li);
           
              li.onclick = function(){
           
                n.click(this.index)
           
              }

              // for(var i = begin;i<end;i++){
              //   pages.push(i)
              //}
            
            }
          }
        })
      }
     }
   }])

})();