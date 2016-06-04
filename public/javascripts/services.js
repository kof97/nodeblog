angular.module(['regServices'], ['ngResource'])
	.factory('User', function($resource) {
        return {
        	reg: $resource('reg', {}, {}),
        	login: $resource('login', {}, {})
        };
    })

    .factory('Article', function($resource) {
        return {
        	post: $resource('post', {}, {}),
        	// login: $resource('login', {}, {})
        };
    });