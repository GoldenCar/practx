//Set as variable for config injection, see bottom of file!
var app = angular.module('patientModule', ['practitionerPortal.filters', 'practitionerPortal.services', 'practitionerPortal.directives', 'ngResource'], function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when('/exerciselist/:exerciseListId', {
        templateUrl:'/public/home.html',
        controller:PatientExerciseListCntl
    });

    $locationProvider.html5Mode(false);
});

function HomeCntl($scope, $routeParams, $resource, $location, $window) {
    var self = this;
    $window.location.href = "/";
}

function MenuCntl($scope, practitionerData, $window) {
    var self = this;
    $scope.$on('handleBroadcast', function () {
        $scope.practitioner = practitionerData.data.practitioner;
    });

    $scope.externalURL = function (url) {
        $window.open(url, '_blank');
    }
}

function PatientExerciseListCntl($scope, exerciseListResource, practitionerData, $location, $window) {
    var self = this;

    //Used to track if the videos have been viewed.
    var trackedVideo = false;

    $scope.currentExercise;

    $scope.exerciseList = exerciseListResource.get({
        id:$location.absUrl().split('/')[4]
    }, function (data) {
        if (data.error) {
            $scope.errorMessage = data.error
            $scope.updateError = 1;
        } else {
            $scope.practitioner = data.practitioner
            practitionerData.prepForBroadcast(data);
            if (!data) {
                $scope.errorMessage = "Cannot find exercise list"
                $scope.updateError = 1;
            }
            $scope.exerciseList = data;


            $scope.currentExercise = $scope.exerciseList.exercises[0];
        }
    })

    $scope.showMobileExercise = function (exercise){
        $scope.currentExercise = $scope.exerciseList.exercises[exercise];
    }

    $scope.printList = function(){
        analytics.track('Patient Viewed Printed List');
        setTimeout(function(){$window.location.href = "/exerciselist/" + $scope.exerciseList.randomString + "/print";},100);
    }

    $scope.getExerciseComments = function(exercise){
        if(exercise){
        for(var i in exercise.prescriptionData){
            if(exercise.prescriptionData[i].name == "Comments"){
                return exercise.prescriptionData[i].value
            }
        }}
    }

    $scope.hideModal = function () {
        $scope.referModalStatus = 'hide'
    }

    $scope.hideVideo = function(){
        $scope.videoModalStatus = 'hide';
        $scope.videoExercise = undefined;
    }

    $scope.showPrescribed = function(exercise){
        if(JSON.stringify(exercise.prescriptionData).indexOf('Comments')){
            if(exercise.prescriptionData.length > 1){
                return true
            }
            else{
                return false
            }
        }
        else{
            if(exercise.prescriptionData.length > 0){
                return true
            }
            else{
                return false
            }
        }
    }

    $scope.showVideo = function(exercise){
        $scope.videoExercise = exercise;
        $scope.videoModalStatus = 'show'
        analytics.track('Patient Watched a Video');
    }


    $scope.showComments = function(exercise){
        if(exercise){
        for(var i in exercise.prescriptionData){
            if(exercise.prescriptionData[i].name == 'Comments'){
                return true;
            }
        }
        }
        return false;
    }

    $scope.getUpdatedAtText = function () {
        if ($scope.exerciseList) {
            if ($scope.exerciseList.status == "Sent") {
                return "Last sent: " + dateFormat($scope.exerciseList.updatedAt, "ddd, dS mmmm yyyy");
            } else {
                return "Last editted: " + dateFormat($scope.exerciseList.updatedAt, "ddd, dS mmmm yyyy");
            }
        } else {
            return "";
        }
    }
}

//Added so we can use tel!
app.config(function($compileProvider){
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});