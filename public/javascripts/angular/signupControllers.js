/* App Controllers */

angular.module('practitionerPortal', ['practitionerPortal.filters', 'practitionerPortal.services', 'practitionerPortal.directives', 'ngResource' ], function ($routeProvider, $locationProvider, $httpProvider) {


});



function SignupCntl($scope, $resource, $window, practitionerData) {
    var self = this;


    $scope.content = "#popover-content";
    self.bodyParts = {};
    self.bodyParts['']
    $scope.title = "Update your account details"
    $scope.passwordTitle = "Enter your password"
    self.Practitioner = $resource('/user/self');
    $scope.url = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
    self.Practitioner.get({time: Date.now().toString()}, function (data, error) {
        $scope.practitioner = data;
        practitionerData.prepForBroadcast(data);
    });

    $scope.validate = function () {

        if (!$scope.practitioner)
            return true
        if (!$scope.practitioner.password)
            return true
        if ($scope.practitioner.password != $scope.practitioner.passwordConfirm || $scope.practitioner.password.length < 3)
            return true
        if ($scope.form.$invalid)
            return true
        return false
    }

    $scope.register = function () {
        if ($scope.practitioner.password != $scope.practitioner.passwordConfirm) {
            $scope.errorMessage = "Password and confirm password do not match"
            $scope.updateError = 1;
            return false
        }
        $('#save').button('loading')

        $scope.practitioner.$save({},
            function (data, status) {
                if (data.data == "success"){
                    analytics.track("Sign Up");

                    $window.location.href = "/";
                }
                if (data.error) {
                    $scope.errorMessage = data.error
                    $scope.updateError = 1;
                    $('#save').button('fail')
                }
            }, function (data, status) {
                $('#save').button('fail')
                $scope.practitioner = data;
            });

    }
    $scope.dismissAlert = function () {
        $scope.updateError = 0;
    }
}
