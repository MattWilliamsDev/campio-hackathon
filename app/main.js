require.config({
  // alias libraries paths
    root: 'app/'
    , paths: {
        'domReady': 'bower_components/requirejs-domready/domReady'
        , 'angular': 'bower_components/angular/angular'
        , 'ngRoute': 'bower_components/angular-route/angular-route'
        , 'ngLoader': 'bower_components/angular-loader/angular-loader'
        , 'ngResource': 'bower_components/angular-resource/angular-resource'
        , 'ngMultiSelect': 'bower_components/isteven-angular-multiselect/isteven-multi-select'
    }

    // angular does not support AMD out of the box, put it in a shim
    , shim: {
        angular: {
            exports: 'angular'
        }
        , ngRoute: {
            deps: [ 'angular' ]
        }
        , ngResource: {
            deps: [ 'angular' ]
        }
        , ngLoader: {
            deps: [ 'angular' ]
        }
        , ngMultiSelect: {
            deps: [ 'angular' ]
        }
    }

    // kick start application
    , deps: [
        './bootstrap'
    ]
});