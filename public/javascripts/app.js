angular.module('nodeblog', ['ngRoute', 'regServices'])
    .controller('IndexCtrl', function($scope, $http, User) {
        $http.get("/index").success(function(response) {
            $scope.user = response.res;
        });
    })

    .controller('RegCtrl', function($scope, User) {
        $scope.name = "";
        $scope.password = "";
        $scope.passwordRepeat = "";
        $scope.email = "";
        $scope.error = "";

        $scope.submit = function() {
            if ($scope.password != $scope.passwordRepeat) {
                $scope.reset();
                return $scope.error = "两次密码不一致！";
            };

            var user = {
                name: $scope.name,
                password: $scope.password,
                passwordRepeat: $scope.passwordRepeat,
                email: $scope.email
            };

            User.reg.save({}, user, function(res) {

                $scope.reset();

                if (res.error == "success") {
                    window.location.href = "/";
                } else { 
                    $scope.error = res.error; 
                };
                
            }, function(err) {
                $scope.reset();
                $scope.error = "注册失败，请重试";
            });
        };

        $scope.reset = function() {
            $scope.name = "";
            $scope.password = "";
            $scope.passwordRepeat = "";
            $scope.email = "";
        };

    })

    .controller('LoginCtrl', function($scope, User) {
        $scope.name = "";
        $scope.password = "";
        $scope.error = "";

        $scope.login = function() {
            var user = {
                name: $scope.name,
                password: $scope.password
            };

            User.login.save({}, user, function(res) {
                $scope.reset();

                if (res.error == "success") {
                    window.location.href = "/";
                } else {
                    $scope.error = res.error; 
                };

            }, function(err) {
                $scope.reset();
                $scope.error = "登录失败，请重试";
            });

        };

        $scope.reset = function() {
            $scope.name = "";
            $scope.password = "";
        };


    })

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', { templateUrl: 'parts/index.html', controller: 'IndexCtrl' }).
            when('/reg', { templateUrl: 'parts/reg.html', controller: 'RegCtrl' }).
            when('/login', { templateUrl: 'parts/login.html', controller: 'LoginCtrl' }).
            otherwise({ redirectTo: '/' });
    }]);