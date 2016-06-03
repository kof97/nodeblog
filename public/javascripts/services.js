angular.module(['regServices'], ['ngResource'])
	.factory('User', function($resource) {
        return {
        	reg: $resource('reg', {}, {}),
        	login: $resource('login', {}, {})
        };
    });