define( function( require ) {
	'use strict';

	var ng = require( 'angular' );
	var app = require( '/app' );
	var CONST = require( 'common/constants' );
	
	var module = ng.module( 'skillsTracker.login', ['ngResource'] );


	module.factory('Login', ['$resource', 
		function($resource) {
			return $resource(CONST.API_BASE_URL + '/api/Auth', {},
			{
				auth: {
					method: 'POST',
					isArray:false,
	            	headers:{'Content-Type':'application/json'}
				}
			});
		}
	]);


	module.controller( 'loginCtrl', function( $scope, $routeParams, $window, Login ) {

		$scope.auth = function() {
			$scope.error = ""
			//FAKE START -- DELETE ME
			if($scope.username != '' && $scope.password != ''){
				localStorage.setItem('BearerToken', true)
				$window.location.href = '#/dashboard'
			}else{
				$scope.error = "Could not authenticate"
				$scope.password = ""
			}
			//FAKE END
			/*var loginService = new Login({Username:$scope.username, Password:$scope.password});
			$scope.password = ""
			loginService.$auth(function(response){
				console.log(reponse)
				if(reponse && response.Success == true){
					//TODO Set global
					localStorage.setItem('BearerToken', reponse.Token)
					$window.location.href = '#/profile'
				}else{
					$scope.error = "Could not authenticate"
				}
			})*/
		}
	});

	return module;
} );