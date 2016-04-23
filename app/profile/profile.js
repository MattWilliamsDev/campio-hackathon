define( function( require ) {
	'use strict';

	var ng = require( 'angular' );
	var app = require( '/app' );
	var CONST = require( 'common/constants' );
	
	var module = ng.module( 'skillsTracker.profile', [] );

	// Controller
	module.controller( 'profileCtrl', function( $scope, $routeParams, profileService ) {
		var guid = $routeParams.guid || false;
		var action = $routeParams.action || false;
		var skillId = $routeParams.skillId || false;

		$scope.params = {
			guid: guid
			, action: action
			, skill: skillId
		};

		console.log( 'profile params', $scope.params );

		if ( action && skillId ) {
			// Handle endorse/removal of skills
			switch( action ) {
				case 'endorse':
					profileService
						.update( guid + '/endorse/' + skillId )
						.success( function( response ) {
							console.log( 'Skill ENDORSE successful', response );
							$scope.user = response;
						})
						.error( function( response ) {
							console.error( 'Skill ENDORSE failed', response );
						});
					break;
				
				case 'remove':
					profileService
						.delete( guid + '/remove/' + skillId )
						.success( function( response ) {
							console.log( 'Skill REMOVE successful', response );
							$scope.user = response;
						})
						.error( function( response ) {
							console.error( 'Skill REMOVE failed', response );
						});
					break;
			};
		}
		
		$scope.skills = [];
		
		$scope.skillsList = [
			{ Id: '1', Name: 'JavaScript' }
			, { Id: '2', Name: '.NET' }
			, { Id: '3', Name: 'Java' }
			, { Id: '4', Name: 'Project Management' }
			, { Id: '5', Name: 'Recruiting' }
			, { Id: '6', Name: 'PHP' }
			, { Id: '7', Name: 'NodeJS' }
			, { Id: '8', Name: 'Introversion' }
		];

		$scope.updateSkills = function() {
			profileService
				.update(
					guid
					, {}
					, {
						data: {
							Skills: $scope.skills
						}
					}
				)
				.then(
					// Success
					function( response ) {
						console.log( 'Skill update successful', response );
						$scope.user = response.data;
					}
					// Error
					, function( response ) {
						console.error( 'Skill update failed', response );
						$scope.user = {
							Id: guid
							, FirstName: 'Bill'
							, LastName: 'Klos'
							, BusinessUnit: 'National'
							, Skills: $scope.skills
						};
					}
				)
		};

		$scope.setSkills = function() {
			ng.forEach( $scope.skillsList, function( skill ) {
				$scope.skills.map( function( item ) {
					if ( item.Id === skill.Id ) {
						skill.ticked = true;
					} else {
						skill.ticked = false;
					}
				});
			});
		};

		profileService
			.fetch( guid )
			// .success and .error are deprecated
			// need to switch these to use .then( [success], [error] )
			.then(
				function( response ) {
					console.log( 'profile fetch response', response );
					$scope.user = response.data;
				}
				, function( response ) {
					console.error( 'profile fetch error', response );
					$scope.user = {
						Id: guid
						, FirstName: 'Bill'
						, LastName: 'Klos'
						, BusinessUnit: 'National'
						, Skills: [
							{ Id: '1', Name: 'JavaScript' }
							, { Id: '2', Name: '.NET' }
							, { Id: '3', Name: 'Java' }
							, { Id: '7', Name: 'NodeJS' }
							, { Id: '8', Name: 'Introversion' }
						]
					};
					$scope.setSkills();
				}
			);
	});

	// Service(s)
	module.factory( 'profileService', function( $http ) {
		return {
			baseUrl: CONST.API_BASE_URL + '/api/Profile/'
			, fetch: function( resource, params, options ) {
				resource = resource || '';

				var requestOptions = ng.extend({
					method: 'GET'
					, url: this.baseUrl + resource
					, data: {}
					, error: function( response ) {
						console.error( 'Profile FETCH failed', response );
					}
				}, options );

				requestOptions.params = ng.extend( {}, params );

				return $http( requestOptions );
			}
			, create: function( resource, params, options ) {
				resource = resource || '';

				var requestOptions = ng.extend({
					method: 'POST'
					, url: this.baseUrl + resource
					, data: {}
					, error: function( response ) {
						console.error( 'Profile CREATE failed', response );
					}
				}, options );

				requestOptions.params = ng.extend( {}, params );

				return $http( requestOptions );
			}
			, update: function( resource, params, options ) {
				resource = resource || '';

				var requestOptions = ng.extend({
					method: 'PUT'
					, url: this.baseUrl + resource
					, data: {}
					, error: function( response ) {
						console.error( 'Profile UPDATE failed', response );
					}
				}, options );

				requestOptions.params = ng.extend( {}, params );

				return $http( requestOptions );
			}
			, delete: function( resource, params, options ) {
				resource = resource || '';

				var requestOptions = ng.extend({
					method: 'DELETE'
					, url: this.baseUrl + resource
					, data: {}
					, error: function( response ) {
						console.error( 'Profile DELETE failed', response );
					}
				}, options );

				requestOptions.params = ng.extend( {}, params );

				return $http( requestOptions );
			}
		};
	});

	return module;
} );