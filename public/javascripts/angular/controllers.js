/* App Controllers */

angular.module('practitionerPortal', ['practitionerPortal.filters', 'practitionerPortal.services', 'practitionerPortal.directives','ngResource' ], function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.when('/', {
        controller: HomeCntl,
        templateUrl: '/public/user.html'
    });
        
    $routeProvider.when('/exercise', {
        templateUrl: '/public/exerciseList.html',
        controller: ExerciseCntl
    });
    
    $routeProvider.when('/exercise/:exerciseId', {
        templateUrl: '/public/exerciseEdit.html',
        controller: ExerciseEditCntl
    });
    
    $routeProvider.when('/user', {
        templateUrl: '/public/userList.html',
        controller: UserCntl
    });

    $routeProvider.when('/user/:userId', {
        templateUrl: '/public/userEdit.html',
        controller: UserEditCntl
    });

    $routeProvider.when('/client', {
        templateUrl: '/public/clientList.html',
        controller: ClientCntl
    });
    
    $routeProvider.when('/client/:clientId', {
        templateUrl: '/public/clientEdit.html',
        controller: ClientEditCntl
    });
    
    $routeProvider.when('/client/:clientId/exercise', {
        templateUrl: '/public/clientExercisesEdit.html',
        controller: ClientExerciseEditCntl
    });
    
    $locationProvider.html5Mode(true);
});

function HomeCntl($scope, $routeParams, $resource, $location) {
    var self = this;
    self.User = $resource('/api/user/:userId');
    
    $scope.user = self.User.get({});
}

function UserEditCntl($scope, $routeParams, $resource, $location) {
    $scope.selectedpage = 'usernav';
    var self = this;
    self.User = $resource('/api/user/:userId', {
        userId:'@id'
    });
    $scope.params = $routeParams;
    if($scope.params.userId == "new"){
        $('.nav').children().removeClass('active');
        $('#'+$scope.selectedpage).addClass('active');
        $scope.user = new self.User();
        $scope.type="new";
    }
    else{
        $scope.type="view";
        $scope.user = self.User.get({
            userId: $routeParams.userId
        });
    }
    $scope.save = function(){
        $scope.user.status='active';
        $scope.user.$save({}, function(){
            $location.path("/user");
        }); 
    }
    $scope.remove = function(){
        if(confirm('Are you sure you want to delete this user?')){
            $scope.user.status='deleted';
            $scope.user.$save({}, function(){
                $location.path("/user");
            });
        }
    }
}

function UserCntl($scope, $routeParams, $resource) {
    $scope.selectedpage = 'usernav'; 
    $('.nav').children().removeClass('active');
    $('#'+$scope.selectedpage).addClass('active');
    var self = this;
    self.User = $resource('/api/user/:userId', {
        userId:'@id'
    });
    $scope.users =  self.User.query({
        status: 'active'
    });
    
    $scope.getClientCount = function(user){
        
        if(user.clientIds)
            return user.clientIds.length;
        else
            return 0;
    }
}

function ExerciseEditCntl($scope, $routeParams, $resource, $location) {
    $scope.selectedpage = 'exercisenav';
    var self = this;
    self.Exercise = $resource('/api/exercise/:exerciseId', {
        exerciseId:'@id'
    });
    $scope.params = $routeParams;
    if($scope.params.exerciseId == "new"){
        
        $('.nav').children().removeClass('active');
        $('#'+$scope.selectedpage).addClass('active');
        $scope.exercise = new self.Exercise();
        $scope.type="new";
        $scope.exercise.tags = [];
    }
    else{
        $scope.type="view";
        $scope.exercise = self.Exercise.get({
            exerciseId: $routeParams.exerciseId
        });
    }
    $scope.save = function(){
        $scope.exercise.status='active';
        $scope.exercise.$save({}, function(){
            $location.path("/exercise");
        }); 
    }
/*$scope.remove = function(){
        if(confirm('Are you sure you want to delete this exercise?')){
            $scope.user.status='deleted';
            $scope.user.$save({}, function(){
                $location.path("/user");
            });
        }
    }*/
}

function ExerciseCntl($scope, $routeParams, $resource) {
    $scope.selectedpage = 'exercisenav'; 
    $('.nav').children().removeClass('active');
    $('#'+$scope.selectedpage).addClass('active');
    var self = this;
    self.Exercise = $resource('/api/exercise/:exerciseId', {
        exerciseId:'@id'
    });
    $scope.exercises =  self.Exercise.query({}, function(){
        //$scope.setSelectedExercise($scope.exercises[0]);
        });
    
    $scope.setSelectedExercise = function(exercise){
        $scope.selectedExercise = exercise;
        viddlerOpen('viddler_b5cb2c97',$scope.selectedExercise.videoNumber,0)
    }
}

function ClientEditCntl($scope, $routeParams, $resource, $location) {
    $scope.selectedpage = 'clientnav';
    var self = this;
    self.Client = $resource('/api/client/:clientId', {
        clientId:'@id'
    });
    
    if($routeParams.clientId == "new"){
        $('.nav').children().removeClass('active');
        $('#'+$scope.selectedpage).addClass('active');
        $scope.client = new self.Client();
        $scope.type="new";
    }
    else{
        $scope.client = self.Client.get({
            clientId: $routeParams.clientId
        }, function(client, status){
            if(!client.userName && $routeParams.userId){
                $scope.user = self.User.get({
                    userId: $routeParams.userId
                }, function(user, status){
                    $scope.client.userName = user.name;
                    $scope.client.userId = user._id
                });
            }
            else{
                $scope.hasUser = false;
            }
        });
    }

    $scope.save = function(){
      
        if(!$scope.client.name)
            return;
        for(i in $scope.users)
        {
            if($scope.users[i].name == $scope.client.userName)
            {
                $scope.client.userId = $scope.users[i]._id;   
            }
        }
        $scope.client.status='active';
        $scope.client.$save({}, function(){
            $location.path("/client");
        }); 
    }
}

function ClientCntl($scope, $routeParams, $resource) {
    var self = this;
    self.Client = $resource('/api/client/:clientId', {
        clientId: '@id'
    });
    if($routeParams.userId){
        $scope.clients =  self.Client.query({
            userId: $routeParams.userId
        });
    }
    else{
        $scope.clients =  self.Client.query({
            status: 'active'
        });
        $scope.setSelectedClient = function(client){
            $scope.selectedClient = client;
        }
    }   

    $scope.showModal = function(exercise){
        $('#myModal').modal({
            backdrop: true,
            show: true,
            keyboard: true    
        });
        $scope.videoPlaying = exercise.videoNumber;
        
//        $('#myModal').on('show', function () {
//            viddlerOpen('viddler_b5cb2c97',exercise.videoNumber,0)
//            alert(exercise.videoNumber);
//        });
    }
}

function ClientExerciseEditCntl($scope, $routeParams, $resource, $location) {
    var self = this;
    self.Client = $resource('/api/client/:clientId', {
        clientId:'@id'
    });
    self.Exercise = $resource('/api/exercise/:exerciseId', {
        exerciseId:'@id'
    });
    $scope.exercises =  self.Exercise.query({}, function(){
        if(!$scope.exercises)
            $scope.exercises = [];
        else{
            if($scope.client.exerciseIds){
                for(i in $scope.exercises){
                    for(p in $scope.client.exerciseIds){
                        if($scope.client.exerciseIds[p] == $scope.exercises[i]._id)
                        {
                            $scope.exercises[i].selected = true;
                       
                        }
                    }
                }
            }
        }
    });
    
    if($routeParams.clientId == "new"){
        $scope.client = new self.Client();
        $scope.type="new";
    }
    else{
        $scope.client = self.Client.get({
            clientId: $routeParams.clientId
        }, function(){
            if(!$scope.client.exerciseIds)
                $scope.client.exerciseIds = [];
            else{
                if($scope.exercises){
                    for(i in $scope.exercises){
                        for(p in $scope.client.exerciseIds){
                            if($scope.client.exerciseIds[p] == $scope.exercises[i]._id)
                            {
                                $scope.exercises[i].selected = true;
                           
                            }
                        }
                    }
                }
            }
        });
    }
    
    $scope.save = function(){
        $scope.client.status='active';
        $scope.client.$save({}, function(){
            $location.path("/client");
        }); 
    }
    
    $scope.selected = function(exercise){
        
        exercise.selected = !exercise.selected
        if(exercise.selected){
            $scope.client.exerciseIds.push(exercise._id);
        }
        else{
            $scope.client.exerciseIds.remove($scope.client.exerciseIds.indexOf(exercise._id));
        }
    }
}