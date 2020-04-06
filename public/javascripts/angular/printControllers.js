angular.module('practitionerPortal', ['practitionerPortal.filters', 'practitionerPortal.services', 'practitionerPortal.directives', 'ngResource', ], function ($routeProvider, $locationProvider, $httpProvider) {

});


function PatientViewCntl($scope, $resource, $routeParams, $location, $http, $window) {

    var self = this;
    self.ExerciseList = $resource('/api/exerciselist/:exerciseListId', {
        exerciseListId:'@exerciseListId'
    })
    self.Exercise = $resource();
    $scope.showalert = 0;


    $scope.exerciseList = self.ExerciseList.get({
        exerciseListId:$location.absUrl().split('/')[4]
    }, function (data) {
        if (data.error) {
            $scope.errorMessage = data.error
            $scope.updateError = 1;
        } else {
            $scope.practitioner = data.practitioner
            if (!data) {
                $scope.errorMessage = "Cannot find exercise list"
                $scope.updateError = 1;
            }
            $scope.exerciseList = data;
        }
    })

    $scope.printList = function(){
        $window.location.href = "/exerciselist/" + $scope.exerciseList.randomString + "/print";
    }

    $scope.editExerciseList = function () {
        if ($scope.exerciseList.patient) {
            $location.path("/patient/" + $scope.exerciseList.patient.id + "/prescribe");
        }
    }

    $scope.getExerciseComments = function(exercise){
        for(var i in exercise.prescriptionData){
            if(exercise.prescriptionData[i].name == "Comments"){
                return exercise.prescriptionData[i].value
            }
        }
    }
    $scope.showEditProgramNotes = function(){
        $scope.editProgramNotes = !$scope.editProgramNotes
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
    $scope.editPatient =
        self.Patient = $resource('/user/patient/:userId', {
            userId:'@id'
        });

    $scope.editPatient = new self.Patient();
    $scope.savePatient = function () {
        $("#savencreate").button('loading')
        $scope.editPatient.$save({}, function (response, status) {
            $("#savencreate").button('fail')
            if (response.error) {
                if(response.error == "Unauthorised"){
                    $window.location.href = "/";
                }
                $scope.status = response.error;
                $scope.showalert++;
            } else {
                $scope.status = "Patient Updated Successfully";
                $scope.showalert++;
                $scope.exerciseList.patient = response;
                $scope.showEditPatient = false;
            }
        });
    }

    $scope.showComments = function(exercise){
        for(var i in exercise.prescriptionData){
            if(exercise.prescriptionData[i].name == 'Comments'){
                if(!exercise.prescriptionData[i].value){
                    return false;
                }
            }
        }
        return true;
    }

    $scope.getPrescriptionText = function(prescription, noDots){

        if (noDots){
            if (prescription){
                return prescription.name;
            }
            else{
                return "";
            }
        }

        if(prescription){
            if(prescription.name && prescription.value){
                var length = prescription.name.length + prescription.value.length;
                var dots = 100 - length;
                dots *= 1.6;
                var result = prescription.name + " ";

                for(var i = 0; i < dots; i++)
                {
                    result += ". "
                }
                return result
            }else{
                return ""
            }
        }else{
            return ""
        }
    }

    $scope.resendEmail = function () {
        $http.post('/user/' + $scope.exerciseList.patient.id + '/exerciselist/prescribe', $scope.exerciseList).success(function (response, status) {
            if (response.error) {
                $scope.status = response.error;
                $scope.showalert++;
                if(response.error == "Unauthorised"){
                    $window.location.href = "/";
                }
            }
            else {
                $scope.status = "";
                $scope.status = "Email sent";
                $scope.showalert++;
            }
        });
    }

    $('#myModal').on('shown', function(e) {
        var modal = $(this);

        modal.css('top', '45%')
            .css('margin-left', (modal.outerWidth() / 2) * -1);

        return this;
    });

    $scope.editExercise = function (exercise) {
        $scope.modalExercise = new self.Exercise(exercise);
        $('#myModal').modal({
            backdrop:true
        })
    }

    $scope.selectExercise = function (exercise) {
        $('#myModal').modal('hide')
        for(var i in  $scope.exerciseList.exercises){
            if($scope.exerciseList.exercises[i].id == exercise.id){
                $scope.exerciseList.exercises[i] = exercise;
            }
        }
        $scope.exerciseList.$save({id: $routeParams.id}, function(response, status){
            if(response.error == "Unauthorised"){
                $window.location.href = "/";
            }
        })
    }

    $scope.editProgramNotes = false;

    $scope.removeExercise = function(exercise){
        if(confirm("Are you sure you want to remove this exercise?")){
            $scope.exerciseList.exercises.remove($scope.exerciseList.exercises.indexOf(exercise));
            $scope.exerciseList.$save({id: $routeParams.id}, function(response, status){
                if(response.error == "Unauthorised"){
                    $window.location.href = "/";
                }

            })
            $('#myModal').modal('hide')
        }
    }

    $scope.saveEmailText = function(){
        if($scope.emailText)
            $scope.exerciseList.emailText = $scope.emailText.replace(/\n\r?/g, '<br />');
        $scope.exerciseList.$save({id: $routeParams.id}, function(response, status){
            if(response.error == "Unauthorised"){
                $window.location.href = "/";
            }

            $scope.editProgramNotes = !$scope.editProgramNotes
        })
    }

    $scope.hideModal = function () {
        $('#myModal').modal('hide')
    }

    $scope.getUpdatedAtText = function () {
        if ($scope.exerciseList) {
            if ($scope.exerciseList.status == "Sent") {
                return "Last sent: " + dateFormat($scope.exerciseList.updatedAt, "ddd, dS mmmm yyyy @ H:MM");
            } else {
                return "Last edited: " + dateFormat($scope.exerciseList.updatedAt, "ddd, dS mmmm yyyy @ H:MM");
            }
        } else {
            return "";
        }
    }

    $scope.setPrescriptionValue = function (prescription, value) {
        prescription.value = value;
    }

    $scope.showVideo = function(exercise){
        var v=document.createElement('video');
        if(navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null || navigator.userAgent.match(/Android/i) != null){
            $window.open(exercise.videoMp4,'_blank');
        }else{
            $('#videoModal').modal()
            $('#videoModal').on('hidden', function () {
                $('#videoModal').html('');
            })
            if(v.canPlayType && v.canPlayType( 'video/webm; codecs="vp8, vorbis"' )){
                $('#videoModal').html('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h2>'+exercise.name+'</h2></div><div class="modal-body" id="splashBody"><video id="theVideo" width="720" height="400" autoplay controls><source type="video/webm" src="'+exercise.videoWebM+'"><source type="video/mp4"  src="'+exercise.videoMp4+'">  Your browser does not support the video tag.</video></div>')
            }else if($.browser.msie){
                $('#videoModal').html('<div class="row"><div class="span12"><p>Your browser does not support this video.<br/> Please visit <a href="https://tools.google.com/dlpage/webmmf/" target="_blank">this page</a> and download the required codec</p></div></div>')
            }else{
                $('#videoModal').html('<div class="modal-body" id="splashBody"><video id="theVideo" width="720" height="400" autoplay controls><source type="video/webm" src="'+exercise.videoWebM+'"><source type="video/mp4"  src="'+exercise.videoMp4+'">  Your browser does not support the video tag.</video></div>')

            }
        }
    }
}