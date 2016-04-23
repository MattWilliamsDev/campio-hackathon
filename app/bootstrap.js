define( function( require ) {
	'use strict';

	var ng = require( 'angular' );
    var app = require( './app' );
	
	require( [ 'domReady!' ], function( document ) {
		ng.bootstrap( document, [ 'skillsTracker' ] );
	} );
} );
