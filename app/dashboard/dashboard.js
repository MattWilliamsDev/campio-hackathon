define( function( require ) {
	'use strict';

	var ng = require( 'angular' );
	var app = require( '/app' );
	var CONST = require( 'common/constants' );
	
	var ngModule = ng.module( 'skillsTracker.dashboard', ['ngResource'] );

	ngModule.factory('Search', ['$resource',
	function($resource) {
		return $resource(CONST.API_BASE_URL + '/api/Search', {},
		{
			search: {
				method: 'POST',
            	headers:{'Content-Type':'application/json'}
			}
		});

	}]);

	ngModule.controller('dashboardCtrl', ['$scope', '$routeParams', 'Search' ,function( $scope, $routeParams, Search ) {
		// Do stuff to $scope

		$scope.search = function() {
			var searchService = new Search({Name: $scope.name});

			/*searchService.$search(function(response) {
				$scope.searchResults = response;
			});*/
			$scope.name = ""
			$scope.searchResults = [
							{
								id:1,
								FirstName:'Bill',
								LastName:'Klos',
								BusinessUnit:'National'
							}
						]
		};
	}]);

	return ngModule;
} );