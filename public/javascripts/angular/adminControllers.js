/* App Controllers */

angular.module('practitionerPortal', ['practitionerPortal.filters', 'practitionerPortal.services', 'practitionerPortal.directives','ngResource' ], function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/adminUserList.html',
        controller: UserCntl
    });
    $routeProvider.when('/exercise', {
        templateUrl: '/adminExerciseList.html',
        controller: ExerciseCntl
    });
    $routeProvider.when('/exercise/:exerciseId', {
        templateUrl: '/adminExerciseEdit.html',
        controller: ExerciseEditCntl
    });
    $routeProvider.when('/admin/user', {
        templateUrl: '/adminUserList.html',
        controller: UserCntl
    });
    $routeProvider.when('/admin/user/:userId', {
        templateUrl: '/adminUserEdit.html',
        controller: UserEditCntl
    });
    $routeProvider.when('/logout', {
        controller: LogoutCntl,
        templateUrl: '/home.html'
    });
    $locationProvider.html5Mode(true);
});

function HomeCntl($scope, $routeParams, $resource, $location) {
    var self = this;
    self.Admin = $resource('/user/self');
    
    self.Admin.get({}, function(data, error){
        $scope.user = data;
    });
}

function AdminEditCntl($scope, $routeParams, $resource, $location) {
    var self = this;
    self.User = $resource('/user/:userId', {
        userId:'@id'
    });
    $scope.params = $routeParams;
    if($scope.params.userId == "new"){
            $scope.user = new self.User();
            $scope.type="new";
        }
    else{
            $scope.type="view";
            self.User.get({
            userId: $routeParams.userId
        }, function(data, status){
            $scope.admin = data;
        });
    }
    $scope.save = function(){
        $scope.admin.$save({}, function(data){
            if(data.error){
                alert("error")
            }else
                $location.path("/admin");
        }, function(data, status){
            $scope.admin = data;
        }); 
    }
    $scope.remove = function(){
        if(confirm('Are you sure you want to delete this user?')){
            $scope.admin.$delete({}, function(data){
                $scope.admin = data;
                $location.path("/admin");
            });
        }
    }
}

function AdminCntl($scope, $routeParams, $resource) {
    var self = this;
    self.Admin = $resource('/user/:userId', {
        userId:'@id'
    });
    self.Admin.query({
        status: 'active'
    }, function(data, status){
        $scope.admins = data;
    });
}

function ExerciseEditCntl($scope, $routeParams, $resource, $location) {
    var self = this;
    self.Exercise = $resource('/exercise/:exerciseId', {
        exerciseId:'@id'
    });
    $scope.params = $routeParams;
    if($scope.params.exerciseId == "new"){
        $scope.exercise = new self.Exercise();
        $scope.type="new";
        $scope.exercise.tags = [];
    }
    else{
        $scope.type="view";
        self.Exercise.get({
            exerciseId: $routeParams.exerciseId
        }, function(data, status){
            $scope.exercise = data;
        });
    }
    $scope.save = function(){
        $scope.exercise.$save({}, function(data){
            $location.path("/exercise");
        }); 
    }

    $scope.cancel = function(){
        $location.path("/exercise");
    }
}

function ExerciseCntl($scope, $routeParams, $resource, $location) {
    var self = this;
    self.Exercise = $resource('/exercise/:exerciseId', {
        exerciseId:'@id'
    });
    self.Exercise.query({}, function(data, status){
        $scope.exercises = data;
    });
    $scope.setSelectedExercise = function(exercise){
        $scope.selectedExercise = exercise;
    }

    $scope.getDescription = function(description){
        if(description.length > 150)
            return description.substr(0, 150) + "..."
        else
            return description
    }

    $scope.editExercise = function(){
        $location.path('/exercise/'+$scope.selectedExercise._id)
    }
}


function UserEditCntl($scope, $routeParams, $resource, $location) {
    var self = this;
    self.User = $resource('/user/:userId', {
        userrId:'@id'
    });
    
    if($routeParams.userId == "new"){
        $scope.user = new self.User();
        $scope.type="new";
    }
    else{
        self.User.get({
            userId: $routeParams.userId
        }, function(data, status){
            $scope.user = data;
        });
    }

    $scope.save = function(){
        $scope.user.$save({}, function(data, status){
            if(!data.error){
                $location.path("/");
            }
        });
    }

    $scope.cancel = function(){
        $location.path("/");
    }
}

function UserCntl($scope, $location, $resource) {
    var self = this;
    self.User = $resource('/user/:userId', {
        userId: '@id'
    });
    self.User.query({
        status: 'active'
    }, function(data, status){
        $scope.users = data;
    });

    $scope.setSelectedUser = function (practitioner) {
        $scope.selectedUser = practitioner;
        $scope.selected = "yes"
    }

    $scope.editUser = function () {
        if ($scope.selectedUser)
            $location.path("/admin/user/" + $scope.selectedUser.id);
    }
}

function LogoutCntl($window) {
    $window.location = '/logout';
}

