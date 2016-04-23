define( function( require ) {
	'use strict';

	var ng = require( 'angular' );
	var profile = require( 'profile/profile' );
	var dashboard = require( 'dashboard/dashboard' );
	var login = require( 'login/login' );
	
	require( 'ngRoute' );
	require( 'ngResource' );
	require( 'ngMultiSelect' );
    
    return ng.module( 'skillsTracker', [
    	'ngRoute'
    	, 'ngResource'
    	, 'isteven-multi-select'
        , 'skillsTracker.profile'
        , 'skillsTracker.dashboard'
    	, 'skillsTracker.login'
    	// , 'skillsTracker.skills'
    ]).config([
		'$routeProvider', function( $routeProvider ) {

			$routeProvider
				.when( '/dashboard', {
					templateUrl: 'dashboard/dashboard.html'
					, controller: 'dashboardCtrl'
				})
				.when( '/profile/:guid?\/:action?\/:skillId?', {
					templateUrl: 'profile/profile.html'
					, controller: 'profileCtrl'
				})
				.when( '/login', {
					templateUrl: 'login/login.html'
					, controller: 'loginCtrl'
				})
				.otherwise({
					redirectTo: '/login'
				});
		}
	]);
} );
