angular.module(['regServices'], ['ngResource'])
	.factory('User', function($resource) {
        return $resource('reg', {}, {});
    });