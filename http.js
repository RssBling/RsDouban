(function(){
	 var serviceModule = angular.module('doubanApp.service', []);

	 serviceModule.service ('JsonpService',['$window',function($window){	 

	   this.jsonp = function(url,params,fn){

		   var queryString = '?';
		
		      for (key in params) {
        
                queryString += key + '=' + params[key] + '&&';
        
            }

		    var funName = 'my_callback' + new Date().getTime();

		    queryString += 'callback' + '=' + funName;

		    $window[funName] = function(res){

		    	console.log('请求成功');
		
		    	fn(res);
		
		    	$window.document.body.removeChild(script);
		
		    };
		
		    var script = $window.document.createElement('script');
		
		    script.src = url + queryString;
		
		    $window.document.body.appendChild(script);
        
        }
	
	}])

})();