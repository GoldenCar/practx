/* App Controllers */


angular.module('practitioner', ['practitionerPortal.filters', 'practitionerPortal.services', 'practitionerPortal.directives', 'ngResource' ], function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl: '/practitionerExerciseProgram-tablet.html',
        controller: ExerciseProgramCntl
    });

    $routeProvider.when('/patient/:patientId', {
        templateUrl: '/practitionerPatientEdit-tablet.html',
        controller: PatientEditCntl
    });

    $routeProvider.when('/template', {
        templateUrl: '/practitionerTemplateList-tablet.html',
        controller: TemplateListCntl
    });

    $routeProvider.when('/template/edit/:id', {
        templateUrl: '/practitionerTemplateEdit-tablet.html',
        controller: TemplateCntl
    });

    $routeProvider.when('/template/edit', {
        templateUrl: '/practitionerTemplateEdit-tablet.html',
        controller: TemplateCntl
    });

    $routeProvider.when('/template/view/:id', {
        templateUrl: '/practitionerTemplateView-tablet.html',
        controller: TemplateViewCntl
    });

    $routeProvider.when('/patient', {
        templateUrl: '/practitionerPatientList-tablet.html',
        controller: PatientCntl
    });

    $routeProvider.when("/patient/:patientId/prescribe", {
        templateUrl: '/practitionerExerciseListEdit-tablet.html',
        controller: ExerciseListEditCntl
    });

    $routeProvider.when('/practitioner/subscription', {
        templateUrl: '/subscription.html',
        controller: SubscriptionCntl
    });

    $routeProvider.when("/patient/:patientId/prescribe/:templateId", {
        templateUrl: '/practitionerExerciseListEdit-tablet.html',
        controller: ExerciseListEditCntl
    });

    $routeProvider.when("/practitioner/exercise", {
        templateUrl: '/practitionerExerciseProgram-tablet.html',
        controller: ExerciseProgramCntl
    });

    $routeProvider.when("/patient/:id/view", {
        templateUrl: '/practitionerPatientView-tablet.html',
        controller: PatientViewCntl
    });

    $routeProvider.when('/practitioner/self', {
        templateUrl: '/practitionerRegisterPassword-tablet.html',
        controller: PractitionerEditCntl
    });

    $routeProvider.when('/logout', {
        controller: LogoutCntl,
        templateUrl: '/home.html'
    });

    $routeProvider.otherwise({redirectTo: '/'})

    $locationProvider.html5Mode(true);
});

function LogoutCntl($window) {

    analytics.track('Logged Out');

    $window.location.href = "/logout";
}

function FrameCntl($scope, practitionerData, $window, navData, userResource, $location, tabletTour, authicSubdomain) {
    var self = this;

    $scope.getDaysLeft = function(date) {
        //return Date.parse(date) - Date.parse();
        //var time = Date.parse(new Date);
        //var endtime = Date.parse(date);
        var daysLeft = Math.round((Date.parse(date)-Date.parse(new Date))/1000/60/60/24);
        if(daysLeft < 0) {
            return '0 days';
        }
        else if(daysLeft != 1) {
            return daysLeft + ' days';
        }
        return daysLeft + ' day';
    }

    $scope.pleaseUpgrade = function(date) {
        //return Date.parse(date) - Date.parse();
        //var time = Date.parse(new Date);
        //var endtime = Date.parse(date);
        var daysLeft = Math.round((Date.parse(date)-Date.parse(new Date))/1000/60/60/24);
        if(daysLeft < 0) {
            return  'Trial has expired, upgrade to continue using PracTx'
        }
        else {
            return ' ';
        }
    }

    $scope.showTour = function () {
        if ($location.path() == '/')
            return false
        else
            return true
    }

    $scope.restartTour = function () {
        tabletTour.shouldRun = true;
        //tabletTour.restart()
        tabletTour.prepForBroadcast();
    }

    $scope.menuAlert = 0;
    $scope.patient = new userResource();
    $scope.$on('handleBroadcast', function () {
        $scope.practitioner = practitionerData.data;
        //We can now identify
        analytics.identify($scope.practitioner.id, {
            "name": $scope.practitioner.name,
            "email": $scope.practitioner.email,
            "phone": $scope.practitioner.phone,
            "photo": $scope.practitioner.photo,
            "address": $scope.practitioner.address,
            "company": $scope.practitioner.company,
            "website": $scope.practitioner.website,
            "emailText": $scope.practitioner.emailText,
            "ClinicId": $scope.practitioner.ClinicId
        });
    });


    $scope.$on('menuBroadcast', function (event, status) {
         if (status === 'show'){
             $scope.menuopen = true;
         }
         else{
             $scope.menuopen = false;
         }
        if (!$scope.$$phase){
            $scope.$apply();
        }
    });


    $scope.$on('handleBroadcastNav', function () {
        $scope.activeNav = navData.data;
    });

    $scope.externalURL = function (url) {
        $window.open(url, '_blank');
    }

    $scope.saveAndRedirect = function () {
        $scope.saveBtnStatus = 'loading';
        $scope.patient.$save({}, function (response, status) {
            if (response.error == "Unauthorised") {
                $window.location.href = "/";
            }
            $scope.saveBtnStatus = 'fail';
            if (response.error) {
                $scope.status = response.error;
            } else {
                analytics.track('Patient Save (Menubar)');
                $scope.status = "Patient Created Successfully";
                $scope.patient = new userResource();
                $location.path("/patient/" + response.id + "/prescribe");
                $scope.patientModalStatus = 'hide'
                $scope.createPatientModal = 'hide'
            }
        });
    }

    $scope.logout = function () {
        $window.location.href = "/logout";
    }

    $scope.referFriend = function () {
        $scope.referModalStatus = 'hide'
        $.post("/refer", {
            name: $scope.referral.name,
            email: $scope.referral.email
        }, function (data) {
            if (data.error) {
                $scope.status ="An error occurred. Message not Sent.";
                if (!$scope.$$phase)
                    $scope.$apply();

                if (data.error == "Unauthorised") {
                    $window.location.href = "/";
                }
            } else {
                $scope.menuAlert++;
                $scope.status = "A Referral Email Has Been Successfully Sent To"  + $scope.referral.name + " (" + $scope.referral.email + ")"
                if (!$scope.$$phase)
                    $scope.$apply();
                $scope.referral.name = "";
                $scope.referral.email = "";
            }
        }, "json");
    }

    $scope.toggleMenu = function () {
        $scope.menuopen = !$scope.menuopen;
    };

    $scope.menuButtonPressed = function(){
        if ($scope.menuopen){
            return"_pressed";
        }
        return "";
    }

    $scope.editAuthicAccount = '#';

    authicSubdomain.get({}, function(body){
        if (!body.error){
            $scope.editAuthicAccount = body.url;
        }
    });
}

function SubscriptionCntl($scope, practitionerResource, $location, practitionerData, $window, navData, authicSubdomain) {

    practitionerResource.get({}, function (data, error) {
        if (data.error == "Unauthorised") {
            $window.location.href = "/";
        }
        $scope.practitioner = data;
        practitionerData.prepForBroadcast(data);

        //We can now identify
        analytics.identify($scope.practitioner.id, {
            "name": $scope.practitioner.name,
            "email": $scope.practitioner.email,
            "phone": $scope.practitioner.phone,
            "photo": $scope.practitioner.photo,
            "address": $scope.practitioner.address,
            "company": $scope.practitioner.company,
            "website": $scope.practitioner.website,
            "emailText": $scope.practitioner.emailText,
            "ClinicId": $scope.practitioner.ClinicId
        });

    });

    $scope.editAuthicAccount = '#';

    authicSubdomain.get({}, function(body){
        if (!body.error){
            $scope.editAuthicAccount = body.url;
        }
    });

    $scope.upgradeAccount = function (code) {
        $window.location.href = "/movetopaidplan?code="+code;
        //console.log('upgrade account');
        // if(code == 'stdTrial') {
        //     $window.location.href = "";
        // } else {
        //     $window.location.href = ""; 
        // }
    };
}

function PractitionerEditCntl($scope, practitionerResource, $http, $location, practitionerData, $window, navData) {
    navData.prepForBroadcast('account')
    var self = this;
    $scope.content = "#popover-content";
    self.bodyParts = {};
    self.bodyParts['']
    $scope.title = "Update your account details"
    $scope.passwordTitle = "Enter your password"
    //$scope.url = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
    $scope.url = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/


    practitionerResource.get({}, function (data, error) {
        if (data.error == "Unauthorised") {
            $window.location.href = "/";
        }
        $scope.practitioner = data;
        practitionerData.prepForBroadcast(data);

        //We can now identify
        analytics.identify($scope.practitioner.id, {
            "name": $scope.practitioner.name,
            "email": $scope.practitioner.email,
            "phone": $scope.practitioner.phone,
            "photo": $scope.practitioner.photo,
            "address": $scope.practitioner.address,
            "company": $scope.practitioner.company,
            "website": $scope.practitioner.website,
            "emailText": $scope.practitioner.emailText,
            "ClinicId": $scope.practitioner.ClinicId
        });

    });

    $scope.register = function () {
        $scope.saveBtnStatus = 'loading'
        $scope.practitioner.$save({},
            function (data, status) {
                if (data.error == "Unauthorised") {
                    $window.location.href = "/";
                }
                if (data.data == "success") {
                    analytics.track('Practitioner Update Details');
                    $location.path("/");
                }
                if (data.error) {
                    $scope.errorMessage = data.error
                    $scope.updateError = 1;
                    $scope.saveBtnStatus = 'fail'
                }
            }, function (data, status) {
                $scope.saveBtnStatus = 'fail'
                $scope.practitioner = data;
            });

    }
    $scope.dismissAlert = function () {
        $scope.updateError = 0;
    }
    $scope.clinikoWhatIsThis = function () {
        if($scope.showClinikoPopup == false)    
            $scope.showClinikoPopup = true
        else
            $scope.showClinikoPopup = false
    }
}

function PatientCntl($scope, practitionerResource, $location, templateListResource, practitionerData, navData, $filter, $http, $window, userResource, tabletTour) {
    navData.prepForBroadcast('nav-patients')
    var self = this;
    $scope.updatetest = 'UPDATE FROM CLINIKO';

    $scope.patient = new userResource();
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 20;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.showalert = 0;
    $scope.sortType = 'status-0';
    self.sortVars = {
        name: 0,
        exercise: 1,
        status: 0
    }

    $scope.clinikoUpdatePatient = function(resource) {
        $scope.enableUpdateButton = true;
        $scope.updatetest = 'UPDATING PATIENT LIST';
        
        $http.get('/clinikopatients').
            success(function(response) {

                practitionerResource.get({}, function (data, error) {
                    if (data.error == "Unauthorised") {
                        $window.location.href = "/";
                    }
                    if(data.expired) {
                        $location.path("/practitioner/subscription");
                    }
                    $scope.patients = data.Patients

                    $scope.practitioner = data;
                    practitionerData.prepForBroadcast(data);

                    //We can now identify
                    analytics.identify($scope.practitioner.id, {
                        "name": $scope.practitioner.name,
                        "email": $scope.practitioner.email,
                        "phone": $scope.practitioner.phone,
                        "photo": $scope.practitioner.photo,
                        "address": $scope.practitioner.address,
                        "company": $scope.practitioner.company,
                        "website": $scope.practitioner.website,
                        "emailText": $scope.practitioner.emailText,
                        "ClinicId": $scope.practitioner.ClinicId
                    });

                    if ($scope.patients) {
                        if ($scope.patients.length < 1) {
                            $scope.patientStatus = "You have no patients"
                        }
                        $scope.search();
                        setUpdatedAt()
                    }
                    else {
                        $scope.patientStatus = "You have no patients"
                    }
                    $scope.status = "Cliniko Patients Updated";
                    //add status not no patients updated
                    $scope.showalert++;
                    $scope.enableUpdateButton = false;
                    $scope.updatetest = 'UPDATE FROM CLINIKO';
                });
            }).
            error(function(error) {
                alert("An error occured with Cliniko");
            });

    }

    templateListResource.query(function (data) {
            $scope.templates = data;

            $scope.loaded = 'true';
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
        },
        function (data, status) {
            $scope.loaded = 'true';
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
            if (status == 500) {
                $window.location.href = "/";
            }
        })

    $scope.setSelected = function ($this) {
        $("th.column-head").removeClass("selected");
        $("th.column-head:nth-child(" + $this + ")").addClass("selected");
    }

    $scope.order = 'exerciseList.status';
    $scope.sortSelected = "status"
    $scope.sortPatients = function (column) {
        var currSort = $scope.sortType.split('-');
        //Current column
        if (column == currSort[0]) {
            //reverse the sort
            currSort[1] = (parseInt(currSort[1]) + 1) % 2;
        }
        else {
            currSort[1] = self.sortVars[column];
            currSort[0] = column;
        }

        $scope.sortType = currSort[0] + '-' + currSort[1];
        if (currSort[0] == "name") {
            $scope.order = currSort[0];
        }
        else if (currSort[0] == "status") {
            $scope.order = 'exerciseList.status';
        }
        else if (currSort[0] == "exercise") {
            $scope.order = "exerciseList.updatedAt"
        }
        $scope.reverse = currSort[1] == 1;

        $scope.search()
    }

    $scope.nameOrEmail = function () {
        if ($scope.order != "email") {
            return "Name"
        } else {
            return "Email"
        }
    }

    $scope.delete = function (patient) {
        if (confirm('Are you sure you want to delete this patient?')) {
            pp = new userResource(patient);
            pp.$delete(function (response, status) {
                if (response.error == "Unauthorised") {
                    $window.location.href = "/";
                }
                if (response.data == "User has been deleted") {

                    $scope.patients.remove($scope.patients.indexOf(patient));
                    $scope.search();

                    $scope.status = response.data;
                    $scope.showalert++;

                    analytics.track('Patient Delete (Patient List)');

                } else {
                    $scope.status = "There has been an error deleting the user";
                    $scope.showalert++;
                }
            });
        }
    }

    $scope.save = function () {
        $scope.saveBtnStatus = 'loading'
        $scope.patient.$save({}, function (response, status) {
            if (response.error == "Unauthorised") {
                $window.location.href = "/";
            }

            $scope.saveBtnStatus = 'fail'
            if (response.error) {
                $scope.status = response.error;
                $scope.showalert++;
            } else {

                $scope.status = "Patient Created Successfully";

                if (!$scope.patients) {
                    $scope.patients = [];
                }

                $scope.patients.push(response)
                $scope.patient = new userResource();
                $scope.showalert++;
                setUpdatedAt();
                $scope.search();

                analytics.track('Patient Save');
            }
        });
    }


    $scope.saveAndRedirect = function () {
        $scope.saveBtnStatus = 'loading'
        $scope.patient.$save({}, function (response, status) {
            if (response.error == "Unauthorised") {
                $window.location.href = "/";
            }

            $scope.saveBtnStatus = 'fail'
            if (response.error) {
                $scope.status = response.error;
                $scope.showalert++;
            } else {
                $scope.status = "Patient Created Successfully";
                if (!$scope.patients) {
                    $scope.patients = [];
                }
                $scope.patients.push(response)
                $scope.patient = new userResource();
                $scope.showalert++;
                $scope.search();

                analytics.track('Patient Save (+redirect)');

                $location.path("/patient/" + response.id + "/prescribe");
            }
        });
    }


    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        if (haystack) {
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        } else {
            false
        }
    };

    // init the filtered items
    $scope.search = function () {
        if ($scope.patients) {
            if ($scope.order !== '') {
                $scope.patients = $filter('orderBy')($scope.patients, $scope.order, $scope.reverse);
            }
            $scope.filteredItems = $filter('filter')($scope.patients, function (item) {

                if (searchMatch(item['name'], $scope.query) || searchMatch(item['email'], $scope.query))
                    return true;
                return false;
            });

            // take care of the sorting order

            $scope.currentPage = 0;
            // now group by pages
            $scope.groupToPages();
        }
    };


    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.getRangeText = function () {
        if ($scope.filteredItems) {
            if ($scope.filteredItems.length > 19) {
                from = ($scope.currentPage * $scope.itemsPerPage) + 1;
                if ($scope.filteredItems.length > (($scope.currentPage * $scope.itemsPerPage) + $scope.itemsPerPage)) {
                    to = ($scope.currentPage * $scope.itemsPerPage) + $scope.itemsPerPage;
                } else {
                    to = $scope.filteredItems.length;
                }
                return from + " - " + to;
            } else if ($scope.filteredItems.length == 0) {
                return "0 - " + $scope.filteredItems.length;
            } else {
                return "1 - " + $scope.filteredItems.length;
            }
        }
        else {
            return "0 - 0"
        }
    }

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.sort_by = function (newSortingOrder) {


        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;

        // icon setup
        $('th i').each(function () {
            // icon reset
            $(this).removeClass().addClass('icon-sort');
        });
        if ($scope.reverse)
            $('th.' + new_sorting_order + ' i').removeClass().addClass('icon-chevron-up');
        else
            $('th.' + new_sorting_order + ' i').removeClass().addClass('icon-chevron-down');
    };

    $scope.patientStatus = "Loading..."

    practitionerResource.get({}, function (data, error) {

        if (data.error == "Unauthorised") {
            $window.location.href = "/";
        }

        if(data.expired) {
            $location.path("/practitioner/subscription");
        }

        $scope.patients = data.Patients

        $scope.practitioner = data;
        practitionerData.prepForBroadcast(data);

        //We can now identify
        analytics.identify($scope.practitioner.id, {
            "name": $scope.practitioner.name,
            "email": $scope.practitioner.email,
            "phone": $scope.practitioner.phone,
            "photo": $scope.practitioner.photo,
            "address": $scope.practitioner.address,
            "company": $scope.practitioner.company,
            "website": $scope.practitioner.website,
            "emailText": $scope.practitioner.emailText,
            "ClinicId": $scope.practitioner.ClinicId
        });

        if ($scope.patients) {
            if ($scope.patients.length < 1) {
                $scope.patientStatus = "You have no patients"
            }
            $scope.search();
            setUpdatedAt()
        }
        else {
            $scope.patientStatus = "You have no patients"
        }
    });

    //TODO Probably a better way to do this but this works for now.
    //Giving an updatedTime to the year 2000 so order is last.
    function setUpdatedAt() {
        for (var i = 0; i < $scope.patients.length; i++) {
            if ($scope.patients[i].exerciseList.status == "None") {
                $scope.patients[i].exerciseList.updatedAt = "2000-01-10T15:40:11.953Z"
            }
        }
    }

    $scope.getReverse = function (orderBy) {
        if (orderBy == $scope.order) {
            $scope.reverse = !$scope.reverse;
        }
        else {
            if (orderBy == 'name' || orderBy == 'email') {
                $scope.reverse = false;
            }
            else {
                //We want the default order for last updated to be in descending order
                $scope.reverse = true;
            }
        }

        analytics.track('Order patients by ' + orderBy, {
            reverse: $scope.reverse
        })

        return $scope.reverse;
    }

    $scope.getDateFormat = function (patient) {
        if (patient.exerciseList.exerciseCount > 0) {
            return patient.exerciseList.exerciseCount + " Exercises - " + dateFormat(patient.exerciseList.updatedAt, "ddd, dS mmmm yyyy @ H:MM");
        } else {
            return "Created " + dateFormat(patient.exerciseList.updatedAt, "ddd, dS mmmm yyyy @ H:MM");
        }
    }

    $scope.getBig = function (patient) {
        if ($scope.order == "Email") {
            return patient.email
        } else {
            return patient.name
        }
    }

    $scope.getSmall = function (patient) {
        if ($scope.order == "Email") {
            return patient.name
        } else {
            return patient.email
        }
    }

    $scope.setSelectedPatient = function (patient) {
        $scope.selectedPatient = patient;
        $scope.selected = "yes"
    }
    $scope.selectedTemplate = "";
    $scope.prescribeExerciseList = function (patient) {
        if (patient) {
            if (patient.template) {
                $location.path("/patient/" + patient.id + "/prescribe/" + patient.template);
            }
            else {
                $location.path("/patient/" + patient.id + "/prescribe");
            }
        }
    }

    $scope.editPatient = function () {
        if ($scope.selectedPatient && $scope.practitioner)
            $location.path("/patient/" + $scope.selectedPatient.id);
    }

    $scope.createOrEdit = function (patient) {
        if (patient.exerciseList.status == "None") {
            $location.path("/patient/" + patient.id + "/prescribe");
        } else {
            $location.path("/patient/" + patient.id + "/view");
        }
    }

    $scope.justEdit = function (patient) {
        $location.path("/patient/" + patient.id + "/prescribe");
    }

    $scope.resendEmail = function (patient) {
        var object = {
            name: patient.exerciseList.name,
            emailText: patient.exerciseList.emailText,
            randomString: patient.exerciseList.randomString,
            id: patient.id,
            patient: {email: patient.email, name: patient.name}
        }
        $http.post('/user/' + patient.id + '/exerciselist/resend', object).success(function (response, status) {
            if (response.error) {
                $scope.status = response.error;
                $scope.showalert++;
                if (response.error == "Unauthorised") {
                    $window.location.href = "/";
                }
            }
            else {
                $scope.status = "Email sent";
                $scope.showalert++;

                analytics.track("Sent Email (Patient List)");
            }
        });
    }
}

function PatientEditCntl($scope, $routeParams, userResource, practitionerResource, $location, navData, practitionerData, $window) {
    navData.prepForBroadcast('nav-patients')

    var self = this;

    $scope.practitioner = practitionerResource.get({time: Date.now().toString()}, function (data) {
        if (data.error == "Unauthorised") {
            $window.location.href = "/";
        }

        practitionerData.prepForBroadcast($scope.practitioner)
        //We can now identify
        analytics.identify($scope.practitioner.id, {
            "name": $scope.practitioner.name,
            "email": $scope.practitioner.email,
            "phone": $scope.practitioner.phone,
            "photo": $scope.practitioner.photo,
            "address": $scope.practitioner.address,
            "company": $scope.practitioner.company,
            "website": $scope.practitioner.website,
            "emailText": $scope.practitioner.emailText,
            "ClinicId": $scope.practitioner.ClinicId
        });
    });
    navData.prepForBroadcast("patients");

    if ($routeParams.patientId == "new") {
        $scope.patient = new userResource();
        $scope.type = "new";
    }
    else {
        $scope.patient = userResource.get({
            userId: $routeParams.patientId, time: Date.now().toString()
        }, function (data) {
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
        });
    }


    $scope.delete = function () {
        if (confirm("Are you sure you want to delete this patient?")) {
            $scope.saveBtnStatus = 'loading'
            $scope.deleteBtnStatus = 'loading'
            $scope.patient.$delete({userId: $routeParams.patientId}, function (data, status) {
                if (data.error == "Unauthorised") {
                    $window.location.href = "/";
                }
                $scope.saveBtnStatus = 'fail'
                $scope.deleteBtnStatus = 'fail'
                $location.path("/");
            });
        }
    }

    $scope.save = function () {
        Y
        $scope.saveBtnStatus = 'loading'
        $scope.patient.$save({}, function (data, status) {

            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
            $scope.saveBtnStatus = 'fail'
            $location.path("/practitioner/" + $routeParams.practitionerId + "/patient");
        });
    }
}

function ExerciseProgramCntl($scope, $routeParams, flip, selectExercise,userResource, tabletTour, practitionerResource, formValidate, getExerciseClass, $window, exerciseResource, $http, getExerciseSearch, exerciseListByUserResource, $location, practitionerData, navData, getBtnClass, templateResource) {

    $scope.setSelectedPractitioner = function (practitioner) {
        $scope.selectedPractitioner = practitioner;
    }
    $scope.getPatientCount = function (practitioner) {
        return practitioner.patients.length;
    }


    $scope.$on('tourBroadcast', function () {
        if (tabletTour.shouldRun) {
            $scope.tourModalStatus = 'show'
            tabletTour.shouldRun = false;
        }
    });


    $scope.startTour = function(){
        analytics.track('Started Tour');
        tabletTour.restart();
        tabletTour.start(true)

    }

    $scope.url = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
    navData.prepForBroadcast('nav-exercises')

    var self = this;
    self.searchTags = ['neck', 'lower Arm', 'upper Legs', 'lower Legs', 'chest', 'abdomen', 'shoulder', 'back', 'gluets', 'upper Arm', 'none']
    $scope.exerciseList = new exerciseListByUserResource({exercises: [], patient: {}, name: "Your exercise program"});
    $scope.showalert = 0;

    practitionerResource.get({time: Date.now().toString()}, function (data, error) {
            if(data.expired) {
                $location.path("/practitioner/subscription");
            }
            $scope.practitioner = data;

            practitionerData.prepForBroadcast(data);
            if ($scope.practitioner.practitionerType == undefined || $scope.practitioner.practitionerType.length <= 0) {
                $scope.practitionerTypeModalStatus = 'show'
            }
            //We can now identify
            analytics.identify($scope.practitioner.id, {
                "name": $scope.practitioner.name,
                "email": $scope.practitioner.email,
                "phone": $scope.practitioner.phone,
                "photo": $scope.practitioner.photo,
                "address": $scope.practitioner.address,
                "company": $scope.practitioner.company,
                "website": $scope.practitioner.website,
                "emailText": $scope.practitioner.emailText,
                "ClinicId": $scope.practitioner.ClinicId
            });

            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }

        },
        function (data, status) {
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
            if (status == 500) {
                $window.location.href = "/";
            }
        })

    $scope.updateUserThenSaveAndEmail = function () {
        saveUser(function (response) {
            if (response == 'success') {
                $scope.userEditModalStatus = 'hide'
                $scope.saveAndEmail()
            } else {
                return false;
            }
        })
    }

    function saveUser(callback) {
        $scope.saveBtnStatus = 'loading'
        prac = new practitionerResource($scope.practitioner)
        $scope.practitioner.$save({},
            function (data, status) {
                $scope.practitioner = prac
                if (data.error == "Unauthorised") {
                    $window.location.href = "/";
                }
                if (data.data == "success") {

                    $scope.userEditModalStatus = 'hide'
                    analytics.track('Practitioner Update Details');
                    callback(data.data)
                }
                if (data.error) {
                    $scope.errorMessage = data.error
                    callback('error')
                    $scope.updateError = 1;
                    $scope.saveBtnStatus = 'fail'
                    $scope.practitioner = prac
                }
            }, function (data, status) {
                $scope.practitioner = prac
                callback('error')
            });
    }

    $scope.selectPractitionerType = function (type) {
        if ($scope.tnc) {

            analytics.track('Practitioner Type Selected', {
                type: type
            });
            $scope.practitioner.practitionerType = type;
            tmpprac = new practitionerResource($scope.practitioner);
            $scope.practitioner.$save({}, function (data) {
                $scope.practitioner = tmpprac;
                practitionerData.prepForBroadcast($scope.practitioner);
                if (data.data == "success") {
                    $scope.practitionerTypeModalStatus = 'hide';
                    $scope.tourModalStatus = 'show'
                    if ($scope.practitioner.clinikoId != null) {

                        //
                        $http.get('/clinikopatients').
                        success(function(response) {

                            practitionerResource.get({}, function (data, error) {
                                if (data.error == "Unauthorised") {
                                    $window.location.href = "/";
                                }

                                $scope.patients = data.Patients

                                $scope.practitioner = data;
                                
                            });
                        }).
                        error(function(error) {
                            alert("An error occured");
                        });
                        //
                    }
                }

            })
        } else {
            $scope.tncError = "true"
        }
    }

    $scope.getExerciseClass = function (exercise) {return getExerciseClass(exercise)}

    $scope.saveAsTemplate = function () {
        analytics.track('Save as template (Program Screen)');
        $scope.saveBtnStatus = 'loading'
        $scope.exerciseList.patient = practitionerData.data
        if ($scope.emailText)
            $scope.exerciseList.emailText = $scope.emailText.replace(/\n\r?/g, '<br />');

        template = new templateResource({name: $scope.exerciseList.name, exercises: $scope.exerciseList.exercises, emailText: $scope.exerciseList.emailText})
        template.$save({}, function (data, status) {
            if (status == 500) {
                $scope.status = "There was an issue with the server"
                $scope.showalert++;
                $scope.saveBtnStatus = 'fail'
            }
            if (data.error) {
                if (data.error == "Unauthorised") {
                    $window.location.href = "/"
                }
                $scope.status = data.error
                $scope.showalert++;
                $scope.saveBtnStatus = 'fail'
            }
            else {
                $scope.status = "Template Saved Successfully"
                $scope.showalert++;
                $scope.saveBtnStatus = 'fail'
            }
        });
    }

    $scope.getExerciseSearch = function(){return getExerciseSearch($scope.search)}

    $scope.getBtnClass = function(exercise){return getBtnClass(exercise)}

    $scope.dropdownText = "Body Filter"
    $scope.search = ['all', 'Anterior', 'neck'];

    $scope.trueval = false

    $scope.showVideo = function (exercise) {

        $window.open(exercise.videoMp4, '_blank');
        analytics.track('Watched a Video (Home)', {
            Name: exercise.name
        });
    }

    $scope.validateForm = function () { return formValidate($scope.exerciseList) }

    $scope.editExercise = function (exercise) {
        $scope.modalExercise = new exerciseResource(exercise);
        $scope.exerciseModalStatus = 'show'
    }

    $scope.smallString = function(request, name){
        var len = 100;
        if (name.length > 22){
            len = 75;
        }
        if (request.length > len) {
            return request.substr(0, len-1) + "..."
        } else {
            return request
        }

    }

    $scope.searchFilter = function (needle) {
        if ($scope.search.indexOf(needle) != -1) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.stretchFilter = "All"

    $scope.filters = ['All', 'Stretch', 'Strengthen']

    $scope.filterTag = function () {
        if ($scope.stretchFilter == 'Strengthen') {
            $scope.filterStrengthenTag()
        } else if ($scope.stretchFilter == 'All') {
            $scope.filterAllTag()
        } else {
            $scope.filterStretchTag()
        }
    }

    $scope.filterAllTag = function () {
        if ($scope.search.indexOf('Strengthen') != -1)
            $scope.search.remove($scope.search.indexOf('Strengthen'))
        if ($scope.search.indexOf('Stretch') != -1)
            $scope.search.remove($scope.search.indexOf('Stretch'))

        analytics.track('Filter Exercises (Exercise List)', {
            filter: 'All'
        })
    }

    $scope.filterStretchTag = function () {
        if ($scope.search.indexOf('Strengthen') != -1)
            $scope.search.remove($scope.search.indexOf('Strengthen'))
        if ($scope.search.indexOf('Stretch') != -1)
            $scope.search.remove($scope.search.indexOf('Stretch'))

        $scope.search.push('Stretch')

        analytics.track('Filter Exercises (Exercise List)', {
            filter: 'Stretch'
        })
    }

    $scope.filterStrengthenTag = function () {
        if ($scope.search.indexOf('Stretch') != -1)
            $scope.search.remove($scope.search.indexOf('Stretch'))
        if ($scope.search.indexOf('Strengthen') != -1)
            $scope.search.remove($scope.search.indexOf('Strengthen'))
        $scope.search.push('Strengthen')

        analytics.track('Filter Exercises (Exercise List)', {
            filter: 'Strengthen'
        })
    }

    $scope.searchToString = function () {
        return $scope.search.toString().replace(',', ' ');
    }

    $scope.selectExercise = function (exercise) {

        var found = false
        for (var i in $scope.exerciseList.exercises) {
            if ($scope.exerciseList.exercises[i].id == exercise.id) {
                $scope.exerciseList.exercises[i] = exercise;
                found = true;
            }
        }

        for (var i in $scope.exercises) {

            if ($scope.exercises[i].id == exercise.id) {
                $scope.exercises[i].active = true;
            }
        }

        if (!found) {
            $scope.exerciseList.exercises.push(exercise)
            analytics.track("Added Exercise (Exercise List)", {
                id: exercise.id,
                name: exercise.name
            })
        }
        else {
            analytics.track("Updated Exercise (Exercise List)", {
                id: exercise.id,
                name: exercise.name
            })
        }

        exercise.active = true

        $scope.exerciseModalStatus = 'hide'
        $scope.modalExercise = {};
    }

    $scope.setPrescriptionValue = function (prescription, value) {
        prescription.value = value;
    }

    $scope.backOrFront = "Anterior";
    $scope.flip = function () {
        flip($scope.search, function (search, backOrFront) {
            $scope.search = search
            $scope.backOrFront = backOrFront
        })
    }

    $scope.addToSearch = function (request) {
        for (var i in self.searchTags) {
            if ($scope.search.indexOf(self.searchTags[i]) != -1) {
                $scope.search.remove($scope.search.indexOf(self.searchTags[i]))
            }
        }
        $scope.search.push(request)

    }

    $scope.getPrescriptionDataText = function (exercise) {
        var string = "";

        if (exercise.prescriptionData.length > 0) {
            for (var i = 0; i < exercise.prescriptionData.length - 1; i++) {
                if (exercise.prescriptionData[i].value != 'undefined' && exercise.prescriptionData[i].value != undefined) {
                    if (exercise.prescriptionData[i].name != "Comments") {
                        string += exercise.prescriptionData[i].value + " " + exercise.prescriptionData[i].name + ", "
                    } else {
                        string += exercise.prescriptionData[i].value + ", "
                    }
                }
            }
            if (exercise.prescriptionData[i].value != 'undefined' && exercise.prescriptionData[i].value != undefined) {
                if (exercise.prescriptionData[i].name != "Comments")
                    string += exercise.prescriptionData[exercise.prescriptionData.length - 1].value + " " + exercise.prescriptionData[exercise.prescriptionData.length - 1].name
                else {
                    string += exercise.prescriptionData[exercise.prescriptionData.length - 1].value
                }
            }
        }
        return string
    }

    $scope.hideModal = function () {
        $scope.exerciseModalStatus = 'hide'
    }

    $scope.isDisabled = function () {
        if ($scope.exerciseList) {
            if ($scope.exerciseList.exercises) {
                if ($scope.exerciseList.exercises.indexOf($scope.modalExercise) == -1) {
                    return true
                } else {
                    return false
                }
            }
            else {
                return true;
            }
        } else {
            return true;
        }
    }

    $scope.addExercise = function (exercise, isThumbnail) {

        if (!exercise.active) {
            $scope.modalExercise = new exerciseResource(exercise);
            $scope.exerciseModalStatus = 'show'
        } else {
            //REMOVED - Setting to false changes the order since there is no property
            //exercise.active = false
            delete exercise.active;


            if (!isThumbnail) {
                isThumbnail = false;
            }

            analytics.track("Removed Exercise", {
                id: exercise.id,
                name: exercise.name,
                thumbnail: isThumbnail
            })

            for (var i in $scope.exerciseList.exercises) {
                if ($scope.exerciseList.exercises[i].id == exercise.id) {
                    $scope.exerciseList.exercises.remove($scope.exerciseList.exercises.indexOf($scope.exerciseList.exercises[i]))
                }
            }
            for (var i in $scope.exercises) {
                if ($scope.exercises[i].id == exercise.id) {

                    //REMOVED - Setting to false changes the order since there is no property
                    //$scope.exercises[i].active = false;
                    delete $scope.exercises[i].active;

                }
            }
            $scope.exerciseModalStatus = 'hide'
        }
    }

    $scope.patientId = $routeParams.patientId;

    $scope.getSelectText = function (exercise) {
        if (exercise.selected) {
            return "Unselect"
        }
        else
            return "Select"
    }

    $http.get('/exercises.json').then(function (data) {
        $scope.exercises = data.data;
        if (!$scope.exercises)
            $scope.exercises = [];
        else {
            if ($scope.exercises && $scope.exerciseList) {
                for (var i in $scope.exercises) {
                    for (var p in $scope.exerciseList.exercises) {
                        if ($scope.exercises[i]) {
                            if ($scope.exerciseList.exercises[p].id == $scope.exercises[i].id) {
                                $scope.exercises[i].active = true;
                                $scope.exerciseList.exercises[p] = $scope.exercises[i];
                            }
                        }
                    }
                }
            }
        }
    });

    $scope.editPatient = new userResource();
    $scope.savePatient = function () {
        $scope.saveBtnStatus = 'loading'
        $scope.editPatient.$save({}, function (response, status) {
            $scope.saveBtnStatus = 'fail'
            if (response.error) {
                $scope.status = response.error;
                $scope.showalert++;
                if (response.error == "Unauthorised") {
                    $window.location.href = "/";
                }

            } else {
                $scope.status = "Patient Updated Successfully";
                $scope.showalert++;
                $scope.exerciseList.patient = response;
                $scope.showEditPatient = false;
            }
        });
    }

    function savePatient(callback) {
        analytics.track('Saved patient (Program Screen)');
        $scope.saveBtnStatus = 'loading'
        patient = new userResource($scope.exerciseList.patient)
        patient.$save({}, function (response, status) {
            $scope.saveBtnStatus = 'fail'
            if (response.error) {
                $scope.status = response.error;
                $scope.showalert++;
                if (response.error == "Unauthorised") {
                    $window.location.href = "/";
                }
                callback(response);
            } else {
                $scope.status = "Patient Updated Successfully";
                $scope.showalert++;
                $scope.exerciseList.patient = response;
                $scope.showEditPatient = false;
                callback(response);
            }
        });
    }

    $scope.saveAndEmail = function () {
        if ($scope.practitioner.name == "" || $scope.practitioner.name == undefined || $scope.practitioner.address == "" || $scope.practitioner.address == undefined || $scope.practitioner.phone == "" || $scope.practitioner.phone == undefined) {
            $scope.patientModalStatus = 'hide'
            $scope.userEditModalStatus = 'show'
            return false;
        }
        analytics.track('Email to patient (Program Screen)');
        $scope.saveBtnStatus = 'loading'
        if (!$scope.exerciseList.patient.id) {
            savePatient(function (response) {
                if (response.error) {
                    $scope.patientModalStatus = 'hide'
                    return false;
                }
                patient = $scope.exerciseList.patient
                if ($scope.emailText)
                    $scope.exerciseList.emailText = $scope.emailText.replace(/\n\r?/g, '<br />');
                $scope.exerciseList.$save({userId: patient.id, exerciseListId: 'prescribe'}, function (data, status) {
                    if (status == 500) {
                        $scope.status = "There was an issue with the server"
                        $scope.showalert++;
                        $scope.saveBtnStatus = 'fail'
                        $scope.patientModalStatus = 'hide'
                    }
                    if (data.error) {
                        if (data.error == "Unauthorised") {
                            $window.location.href = "/"
                        }
                        $scope.status = data.error
                        $scope.showalert++;
                        $scope.saveBtnStatus = 'fail'
                        $scope.patientModalStatus = 'hide'
                    }
                    else {
                        $scope.patientModalStatus = 'hide'
                        $location.path("/patient/" + patient.id + "/view")
                    }
                });
            })
        } else {
            patient = $scope.exerciseList.patient
            if ($scope.emailText)
                $scope.exerciseList.emailText = $scope.emailText.replace(/\n\r?/g, '<br />');
            $scope.exerciseList.$save({userId: patient.id, exerciseListId: 'prescribe'}, function (data, status) {
                $scope.exerciseList = patient
                if (status == 500) {
                    $scope.status = "There was an issue with the server"
                    $scope.showalert++;
                    $scope.saveBtnStatus = 'fail'
                    $scope.patientModalStatus = 'hide'
                }
                if (data.error) {
                    $scope.patientModalStatus = 'hide'
                    if (data.error == "Unauthorised") {
                        $window.location.href = "/"
                    }
                    $scope.status = data.error
                    $scope.showalert++;
                    $scope.saveBtnStatus = 'fail'
                }
                else {
                    $scope.patientModalStatus = 'hide'
                    $location.path("/patient/" + patient.id + "/view")
                }
            });
        }
    }

    $scope.spacecamel = function (s) {
        return s.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
            return str.toUpperCase();
        })
    }

    $scope.emailToMe = function () {
        $scope.saveBtnStatus = 'loading'
        $scope.exerciseList.patient = practitionerData.data
        if ($scope.emailText)
            $scope.exerciseList.emailText = $scope.emailText.replace(/\n\r?/g, '<br />');
        tmpExercise = new exerciseListByUserResource($scope.exerciseList)
        $scope.exerciseList.$save({userId: practitionerData.data.id, exerciseListId: 'prescribe'}, function (data, status) {
            analytics.track('Emailed to self (program screen)');
            $scope.exerciseList = tmpExercise;
            if (status == 500) {
                $scope.status = "There was an issue with the server"
                $scope.showalert++;
                $scope.saveBtnStatus = 'fail'
            }
            if (data.error) {
                if (data.error == "Unauthorised") {
                    $window.location.href = "/"
                }
                $scope.status = data.error
                $scope.showalert++;
                $scope.saveBtnStatus = 'fail'
            }
            else {
                $scope.patientModalStatus = 'hide'
                $scope.exerciseList.patient = {};
                $scope.status = "Email sent successfully"
                $scope.showalert++;
                $scope.saveBtnStatus = 'fail'
            }
        });
    }



    $scope.save = function () {
        $scope.saveBtnStatus = 'loading'

        if ($scope.emailText)
            $scope.exerciseList.emailText = $scope.emailText.replace(/\n\r?/g, '<br />');
        if ($routeParams.patientId == "new" && $scope.exerciseList.patient.id) {
            patient = $scope.exerciseList.patient.id
        }
        else {
            patient = $routeParams.patientId
        }

        $scope.exerciseList.$save({userId: patient}, function (data, status) {

            if (status == 500) {
                $scope.status = "There was an issue with the server"
                $scope.showalert++;
                $scope.saveBtnStatus = 'fail'
            }
            if (data.error) {
                if (data.error == "Unauthorised") {
                    $window.location.href = "/";
                }

                $scope.status = data.error
                $scope.showalert++;
                $scope.saveBtnStatus = 'fail'
            }
            else {
                $location.path("/patient")
            }
        });
    }
    $scope.dismissAlert = function () {
        $scope.updateError = 0;
    }
    $scope.getDescription = function (value) {
        if (value.length > 300)
            return value.substr(0, 300) + "..."
        else
            return value
    }

    $scope.selected = function (exercise) {  $scope.exerciseList.exercises = selectExercise($scope.exerciseList.exercises, exercise) }
}

function ExerciseListEditCntl($scope, $routeParams, selectExercise,userResource, flip, formValidate, practitionerResource, getExerciseClass, $http, templateResource, exerciseResource, getBtnClass, exerciseListByUserResource, $location, practitionerData, navData, $window) {
    navData.prepForBroadcast('nav-patients')

    var self = this;

    self.searchTags = ['neck', 'lower Arm', 'upper Legs', 'lower Legs', 'chest', 'abdomen', 'shoulder', 'back', 'gluets', 'upper Arm', 'none']
    $scope.showalert = 0;

    $scope.trueval = false

    practitionerResource.get({time: Date.now().toString()}, function (data, error) {
            $scope.practitioner = data;
            practitionerData.prepForBroadcast(data);

            //We can now identify
            analytics.identify($scope.practitioner.id, {
                "name": $scope.practitioner.name,
                "email": $scope.practitioner.email,
                "phone": $scope.practitioner.phone,
                "photo": $scope.practitioner.photo,
                "address": $scope.practitioner.address,
                "company": $scope.practitioner.company,
                "website": $scope.practitioner.website,
                "emailText": $scope.practitioner.emailText,
                "ClinicId": $scope.practitioner.ClinicId
            });

            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }

        },
        function (data, status) {
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
            if (status == 500) {
                $window.location.href = "/";
            }
        })

    $scope.getExerciseClass = function (exercise) {return getExerciseClass(exercise)}


    $scope.getBtnClass = function(exercise){return getBtnClass(exercise)}
    $scope.dropdownText = "Body Filter"
    $scope.search = ['all', 'Anterior', 'neck'];

    $scope.trueval = false

    $scope.showVideo = function (exercise) {

        $window.open(exercise.videoMp4, '_blank');
        analytics.track('Watched a Video (Exercise List)', {
            Name: exercise.name
        });
    }

    $scope.validateForm = function () { return formValidate($scope.exerciseList) }

    $scope.editExercise = function (exercise) {
        $scope.modalExercise = new exerciseResource(exercise);
        $scope.exerciseModalStatus = 'show'
    }

    $scope.smallString = function(request, name){
        var len = 100;
        if (name.length > 22){
            len = 75;
        }
        if (request.length > len) {
            return request.substr(0, len-1) + "..."
        } else {
            return request
        }

    }

    $scope.searchFilter = function (needle) {
        if ($scope.search.indexOf(needle) != -1) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.stretchFilter = "All"

    $scope.filters = ['All', 'Stretch', 'Strengthen']

    $scope.filterTag = function () {
        if ($scope.stretchFilter == 'Strengthen') {
            $scope.filterStrengthenTag()
        } else if ($scope.stretchFilter == 'All') {
            $scope.filterAllTag()
        } else {
            $scope.filterStretchTag()
        }
    }

    $scope.filterAllTag = function () {
        if ($scope.search.indexOf('Strengthen') != -1)
            $scope.search.remove($scope.search.indexOf('Strengthen'))
        if ($scope.search.indexOf('Stretch') != -1)
            $scope.search.remove($scope.search.indexOf('Stretch'))

        analytics.track('Filter Exercises (Exercise List)', {
            filter: 'All'
        })
    }


    $scope.filterStretchTag = function () {
        if ($scope.search.indexOf('Strengthen') != -1)
            $scope.search.remove($scope.search.indexOf('Strengthen'))
        if ($scope.search.indexOf('Stretch') != -1)
            $scope.search.remove($scope.search.indexOf('Stretch'))

        $scope.search.push('Stretch')

        analytics.track('Filter Exercises (Exercise List)', {
            filter: 'Stretch'
        })
    }

    $scope.filterStrengthenTag = function () {
        if ($scope.search.indexOf('Stretch') != -1)
            $scope.search.remove($scope.search.indexOf('Stretch'))
        if ($scope.search.indexOf('Strengthen') != -1)
            $scope.search.remove($scope.search.indexOf('Strengthen'))
        $scope.search.push('Strengthen')

        analytics.track('Filter Exercises (Exercise List)', {
            filter: 'Strengthen'
        })
    }

    $scope.searchToString = function () {
        return $scope.search.toString().replace(',', ' ');
    }

    $scope.selectExercise = function (exercise) {

        var found = false
        for (var i in $scope.exerciseList.exercises) {
            if ($scope.exerciseList.exercises[i].id == exercise.id) {
                $scope.exerciseList.exercises[i] = exercise;
                found = true;
            }
        }

        for (var i in $scope.exercises) {

            if ($scope.exercises[i].id == exercise.id) {
                $scope.exercises[i].active = true;
            }
        }

        if (!found) {
            $scope.exerciseList.exercises.push(exercise)
            analytics.track("Added Exercise (Exercise List)", {
                id: exercise.id,
                name: exercise.name
            })
        }
        else {
            analytics.track("Updated Exercise (Exercise List)", {
                id: exercise.id,
                name: exercise.name
            })
        }

        exercise.active = true

        $scope.exerciseModalStatus = 'hide'
        $scope.modalExercise = {};
    }

    $scope.setPrescriptionValue = function (prescription, value) {
        prescription.value = value;
    }

    $scope.backOrFront = "Anterior";
    $scope.flip = function () {
        flip($scope.search, function (search, backOrFront) {
            $scope.search = search
            $scope.backOrFront = backOrFront
        })
    }

    $scope.addToSearch = function (request) {
        for (var i in self.searchTags) {
            if ($scope.search.indexOf(self.searchTags[i]) != -1) {
                $scope.search.remove($scope.search.indexOf(self.searchTags[i]))
            }
        }
        $scope.search.push(request)

    }

    $scope.getPrescriptionDataText = function (exercise) {
        var string = "";

        if (exercise.prescriptionData.length > 0) {
            for (var i = 0; i < exercise.prescriptionData.length - 1; i++) {
                if (exercise.prescriptionData[i].value != 'undefined' && exercise.prescriptionData[i].value != undefined) {
                    if (exercise.prescriptionData[i].name != "Comments") {
                        string += exercise.prescriptionData[i].value + " " + exercise.prescriptionData[i].name + ", "
                    } else {
                        string += exercise.prescriptionData[i].value + ", "
                    }
                }
            }
            if (exercise.prescriptionData[i].value != 'undefined' && exercise.prescriptionData[i].value != undefined) {
                if (exercise.prescriptionData[i].name != "Comments")
                    string += exercise.prescriptionData[exercise.prescriptionData.length - 1].value + " " + exercise.prescriptionData[exercise.prescriptionData.length - 1].name
                else {
                    string += exercise.prescriptionData[exercise.prescriptionData.length - 1].value
                }
            }
        }
        return string
    }

    $scope.hideModal = function () {
        $scope.exerciseModalStatus = 'hide'
    }

    $scope.isDisabled = function () {
        if ($scope.exerciseList) {
            if ($scope.exerciseList.exercises) {
                if ($scope.exerciseList.exercises.indexOf($scope.modalExercise) == -1) {
                    return true
                } else {
                    return false
                }
            }
            else {
                return true;
            }
        } else {
            return true;
        }
    }

    $scope.addExercise = function (exercise, isThumbnail) {

        if (!exercise.active) {
            $scope.modalExercise = new exerciseResource(exercise);
            $scope.exerciseModalStatus = 'show'
        } else {
            //REMOVED - Setting to false changes the order since there is no property
            //exercise.active = false
            delete exercise.active;


            if (!isThumbnail) {
                isThumbnail = false;
            }

            analytics.track("Removed Exercise", {
                id: exercise.id,
                name: exercise.name,
                thumbnail: isThumbnail
            })

            for (var i in $scope.exerciseList.exercises) {
                if ($scope.exerciseList.exercises[i].id == exercise.id) {
                    $scope.exerciseList.exercises.remove($scope.exerciseList.exercises.indexOf($scope.exerciseList.exercises[i]))
                }
            }
            for (var i in $scope.exercises) {
                if ($scope.exercises[i].id == exercise.id) {

                    //REMOVED - Setting to false changes the order since there is no property
                    //$scope.exercises[i].active = false;
                    delete $scope.exercises[i].active;

                }
            }
            $scope.exerciseModalStatus = 'hide'
        }
    }


    $scope.patientId = $routeParams.patientId;

    $scope.displayVideo = function (exercise) {

    }

    $scope.getSelectText = function (exercise) {
        if (exercise.selected) {
            return "Unselect"
        }
        else
            return "Select"
    }

    $http.get('/exercises.json').then(function (data) {
        $scope.exercises = data.data;
        if (!$scope.exercises)
            $scope.exercises = [];
        else {
            if ($scope.exercises && $scope.exerciseList) {
                for (var i in $scope.exercises) {
                    for (var p in $scope.exerciseList.exercises) {
                        if ($scope.exercises[i]) {
                            if ($scope.exerciseList.exercises[p].id == $scope.exercises[i].id) {
                                $scope.exercises[i].active = true;
                                // $scope.exerciseList.exercises[p] = $scope.exercises[i];
                            }
                        }
                    }
                }
            }
        }
    });


    $scope.editPatient = new userResource();

    $scope.savePatient = function () {
        $scope.saveBtnStatus = 'loading'
        $scope.editPatient.$save({}, function (response, status) {
            $scope.saveBtnStatus = 'fail'
            if (response.error) {
                $scope.status = response.error;
                $scope.showalert++;
                if (response.error == "Unauthorised") {
                    $window.location.href = "/";
                }

            } else {
                $scope.status = "Patient Updated Successfully";
                $scope.showalert++;
                $scope.exerciseList.patient = response;
                $scope.showEditPatient = false;
            }
        });
    }


    exerciseListByUserResource.get({
        userId: $routeParams.patientId, time: Date.now().toString(), exerciseListId: $routeParams.exerciseListId
    }, function (data, status) {
        if (!data) {
            $scope.exerciseList = {};
            $scope.trueval = true;
        }
        else {
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
            $scope.exerciseList = data
            if ($scope.exerciseList.emailText)
                $scope.emailText = $scope.exerciseList.emailText.replace(/<br \/>?/g, '\n');
            $scope.trueval = true;
            if (data.patient) {
                $scope.editPatient.name = data.patient.name
                $scope.editPatient.email = data.patient.email
                $scope.editPatient.id = data.patient.id
            }
            if (!$scope.exerciseList.name) {
                $scope.exerciseList.name = "Your exercise program"
            }
        }
        if (!$scope.exerciseList.exercises) {
            $scope.exerciseList.exercises = [];

        }
        else {
            for (p in $scope.exerciseList.exercises) {
                $scope.exerciseList.exercises[p].active = true
                if ($scope.exercises) {
                    for (i in $scope.exercises) {
                        if ($scope.exercises[i]) {
                            if ($scope.exerciseList.exercises[p].id == $scope.exercises[i].id) {
                                $scope.exercises[i].active = true;
                            }
                        }
                    }
                }
            }
        }
        templateResource.get({id: $routeParams.templateId}, function (data, error) {
            if (!data.error) {
                for (var i in data.exercises) {
                    if (data.exercises[i].id) {
                        $scope.exerciseList.exercises.push(data.exercises[i]);
                    }
                }

                for (var i in $scope.exerciseList.exercises) {
                    $scope.exerciseList.exercises[i].active = true;
                }

                $scope.emailText = data.emailText;

                for (var j in data.exercises) {

                    if (data.exercises[j]) {
                        for (var i in $scope.exercises) {

                            if ($scope.exercises[i].id == data.exercises[j].id) {
                                $scope.exercises[i].active = true;
                                break;
                            }
                        }
                    }
                }
            }
            else {
                //Error
                $window.location.href = "/";
            }

        }, function (data, status) {
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
            if (status == 500) {
                $window.location.href = "/";
            }
        })
    });
    $scope.spacecamel = function (s) {
        return s.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
            return str.toUpperCase();
        })
    }
    $scope.saveAndEmail = function () {
        $("#save").button('loading')
        $("#send").button('loading')
        patient = $scope.exerciseList.patient.id
        if ($scope.emailText)
            $scope.exerciseList.emailText = $scope.emailText.replace(/\n\r?/g, '<br />');
        $scope.exerciseList.$save({userId: $routeParams.patientId, exerciseListId: 'prescribe'}, function (data, status) {
            if (status == 500) {
                $scope.status = "There was an issue with the server"
                $scope.showalert++;
                $("#save").button('fail')
                $("#send").button('fail')
            }
            if (data.error) {
                if (data.error == "Unauthorised") {
                    $window.location.href = "/"
                }
                $scope.status = data.error
                $scope.showalert++;
                $("#save").button('fail')
                $("#send").button('fail')
            }
            else {
                $location.path("/patient/" + patient + "/view")
            }
        });
    }

    $scope.save = function () {
        $("#save").button('loading')
        if ($scope.emailText)
            $scope.exerciseList.emailText = $scope.emailText.replace(/\n\r?/g, '<br />');
        if ($routeParams.patientId == "new" && $scope.exerciseList.patient.id) {
            patient = $scope.exerciseList.patient.id
        }
        else {
            patient = $routeParams.patientId
        }

        $scope.exerciseList.$save({userId: patient}, function (data, status) {

            if (status == 500) {
                $scope.status = "There was an issue with the server"
                $scope.showalert++;
                $("#save").button('fail')
            }
            if (data.error) {
                if (data.error == "Unauthorised") {
                    $window.location.href = "/";
                }

                $scope.status = data.error
                $scope.showalert++;
                $("#save").button('fail')
            }
            else {
                $location.path("/patient")
            }
        });
    }
    $scope.dismissAlert = function () {
        $scope.updateError = 0;
    }
    $scope.getDescription = function (value) {
        if (value.length > 300)
            return value.substr(0, 300) + "..."
        else
            return value
    }

    $scope.selected = function (exercise) {  $scope.exerciseList.exercises = selectExercise($scope.exerciseList.exercises, exercise) }
}

function PatientViewCntl($scope, $routeParams, exerciseListByUserResource, showComments, showPrescribed, practitionerResource, userResource, exerciseResource, $window, $location, $http, navData, practitionerData) {
    navData.prepForBroadcast('nav-patients')
    var self = this;

    $scope.showalert = 0;

    $scope.editPatient = new userResource();
    practitionerResource.get({time: Date.now().toString()}, function (data, error) {
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
            if(data.expired) {
                $location.path("/practitioner/subscription");
            }
            $scope.practitioner = data;
            practitionerData.prepForBroadcast(data);

            //We can now identify
            analytics.identify($scope.practitioner.id, {
                "name": $scope.practitioner.name,
                "email": $scope.practitioner.email,
                "phone": $scope.practitioner.phone,
                "photo": $scope.practitioner.photo,
                "address": $scope.practitioner.address,
                "company": $scope.practitioner.company,
                "website": $scope.practitioner.website,
                "emailText": $scope.practitioner.emailText,
                "ClinicId": $scope.practitioner.ClinicId
            });

        },
        function (data, status) {
            if (status == 500) {
                $window.location.href = "/";
            }
        })
    $scope.exerciseList = exerciseListByUserResource.get({userId: $routeParams.id, time: Date.now().toString()}, function (data, status) {
        if (data.error == "Unauthorised") {
            $window.location.href = "/";
        }
        if (!$scope.editPatient) {
            $scope.editPatient = new userResource();
        }
        $scope.editPatient.name = data.patient.name
        $scope.editPatient.email = data.patient.email
        $scope.editPatient.id = data.patient.id

        if (data.emailText) {
            $scope.emailText = data.emailText.replace(/<br \/>?/g, '\n');
        }
    })

    $scope.printList = function () {
        analytics.track("Printed the Exercise List");
        $window.location.href = "/exerciselist/" + $scope.exerciseList.randomString + "/print";
    }

    $scope.editExerciseList = function () {
        if ($scope.exerciseList.patient) {
            analytics.track("Click - Edit Exercise List (Patient View)")
            $location.path("/patient/" + $scope.exerciseList.patient.id + "/prescribe");
        }
    }

    $scope.getExerciseComments = function (exercise) {
        for (var i in exercise.prescriptionData) {
            if (exercise.prescriptionData[i].name == "Comments") {
                return exercise.prescriptionData[i].value
            }
        }
    }

    $scope.showPrescribed = function (exercise) { return showPrescribed(exercise) }

    $scope.editPatient = new userResource();

    $scope.savePatient = function () {
        $scope.saveBtnStatus = 'loading'
        $scope.editPatient.$save({}, function (response, status) {
            $scope.saveBtnStatus = 'fail'
            if (response.error) {
                if (response.error == "Unauthorised") {
                    $window.location.href = "/";
                }
                $scope.status = response.error;
                $scope.showalert++;
            } else {
                $scope.status = "Patient Updated Successfully";
                $scope.showalert++;
                $scope.exerciseList.patient = response;
                $scope.showEditPatient = false;

                analytics.track('Patient Updated (Patient View)')
            }
        });
    }

    $scope.showComments = function (exercise) { return showComments(exercise) }
    $scope.getPrescriptionText = function (prescription, noDots) {

        if (noDots) {
            if (prescription) {
                return prescription.name;
            }
            else {
                return "";
            }
        }

        if (prescription) {
            if (prescription.name && prescription.value) {
                var length = prescription.name.length + prescription.value.length;
                var dots = 100 - length;
                dots *= 1.6;
                var result = prescription.name + " ";

                for (var i = 0; i < dots; i++) {
                    result += ". "
                }
                return result
            } else {
                return ""
            }
        } else {
            return ""
        }
    }

    $scope.resendEmail = function () {
        $http.post('/user/' + $scope.exerciseList.patient.id + '/exerciselist/prescribe', $scope.exerciseList).success(function (response, status) {
            if (response.error) {
                $scope.status = response.error;
                $scope.showalert++;
                if (response.error == "Unauthorised") {
                    $window.location.href = "/";
                }
            }
            else {
                $scope.status = "";
                $scope.status = "Email sent";
                $scope.showalert++;

                analytics.track("Sent Email (Patient View)");
            }
        });
    }


    $scope.editExercise = function (exercise) {
        $scope.modalExercise = new exerciseResource(exercise);
        $scope.exerciseModalStatus = 'show'
    }

    $scope.selectExercise = function (exercise) {
        $scope.exerciseModalStatus = 'hide'
        for (var i in  $scope.exerciseList.exercises) {
            if ($scope.exerciseList.exercises[i].id == exercise.id) {
                $scope.exerciseList.exercises[i] = exercise;
            }
        }
        $scope.exerciseList.$save({userId: $routeParams.id}, function (response, status) {
            if (response.error == "Unauthorised") {
                $window.location.href = "/";
            }
            analytics.track("Updated Exercise (Patient View)", {
                id: exercise.id,
                name: exercise.name
            })
        })
    }

    $scope.editProgramNotes = false;

    $scope.removeExercise = function (exercise, modal) {
        if (confirm("Are you sure you want to remove this exercise?")) {
            $scope.exerciseList.exercises.remove($scope.exerciseList.exercises.indexOf(exercise));
            $scope.exerciseList.$save({userId: $routeParams.id}, function (response, status) {
                if (response.error == "Unauthorised") {
                    $window.location.href = "/";
                }
                analytics.track("Removed Exercise (Patient View)", {
                    id: exercise.id,
                    name: exercise.name,
                    modal: modal || false
                })
            })
            $scope.exerciseModalStatus = 'hide'
        }
    }

    $scope.saveEmailText = function () {
        if ($scope.emailText)
            $scope.exerciseList.emailText = $scope.emailText.replace(/\n\r?/g, '<br />');
        $scope.exerciseList.$save({userId: $routeParams.id}, function (response, status) {
            if (response.error == "Unauthorised") {
                $window.location.href = "/";
            }

            analytics.track("Updated Program Notes (Patient View)");

            $scope.editProgramNotes = !$scope.editProgramNotes
        })
    }

    $scope.hideModal = function () {
        $scope.exerciseModalStatus = 'hide'
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

    $scope.showVideo = function (exercise) {

        $window.open(exercise.videoMp4, '_blank');
        analytics.track('Watched a Video (Patient View)', {
            Name: exercise.name
        });
    }
}

function TemplateListCntl($scope, exerciseResource, templateListResource, templateResource, practitionerResource, practitionerData, navData, $filter, $window, navData) {
    navData.prepForBroadcast('nav-template')

    var self = this;

    $scope.setSelected = function ($this) {
        $("th.column-head").removeClass("selected");
        $("th.column-head:nth-child(" + $this + ")").addClass("selected");
    }


    $scope.editTemplate = function (id) {
        if (typeof id == 'undefined') {
            $window.location.href = "/template/edit"
        }
        else {
            $window.location.href = "/template/edit/" + id;
        }
    }

    $scope.viewTemplate = function (id) {
        $window.location.href = "/template/view/" + id;
    }

    $scope.order = 'template.name';
    $scope.setSelected(1);

    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 20;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.showalert = 0;
    $scope.sortType = '';
    $scope.sortVars = {
        name: 0,
        date: 1
    }
    $scope.templates = [];

    practitionerResource.get({time: Date.now().toString()}, function (data, error) {
            $scope.practitioner = data;
            practitionerData.prepForBroadcast($scope.practitioner);

            //We can now identify
            analytics.identify($scope.practitioner.id, {
                "name": $scope.practitioner.name,
                "email": $scope.practitioner.email,
                "phone": $scope.practitioner.phone,
                "photo": $scope.practitioner.photo,
                "address": $scope.practitioner.address,
                "company": $scope.practitioner.company,
                "website": $scope.practitioner.website,
                "emailText": $scope.practitioner.emailText,
                "ClinicId": $scope.practitioner.ClinicId
            });

            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }

        },
        function (data, status) {
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
            if (status == 500) {
                $window.location.href = "/";
            }
        })
    //TODO Add this into the practitioner call so it can be pulled with the practitioner.
    templateListResource.query(function (data) {
            $scope.templates = data;

            $scope.sortTemplates('name');

            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
        },
        function (data, status) {
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
            if (status == 500) {
                $window.location.href = "/";
            }
        })


    $scope.getDateFormat = function (updatedAt) {
        return "Last Edited - " + dateFormat(updatedAt, "ddd, dS mmmm yyyy @ H:MM");
    }


    $scope.sortTemplates = function (column) {
        var currSort = $scope.sortType.split('-');

        //Current column
        if (column == currSort[0]) {
            //reverse the sort
            currSort[1] = (parseInt(currSort[1]) + 1) % 2;
        }
        else {
            currSort[1] = $scope.sortVars[column];
            currSort[0] = column;
        }

        $scope.sortType = currSort[0] + '-' + currSort[1];
        if (currSort[0] == "name") {
            $scope.order = currSort[0];
        }
        else if (currSort[0] == "date") {
            $scope.order = 'updatedAt';
        }
        $scope.reverse = currSort[1] == 1;
        $scope.search()
    }

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        if (haystack) {
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        } else {
            false
        }
    };

    // init the filtered items
    $scope.search = function () {
        if ($scope.templates) {
            if ($scope.order !== '') {
                $scope.templates = $filter('orderBy')($scope.templates, $scope.order, $scope.reverse);
            }
            $scope.filteredItems = $filter('filter')($scope.templates, function (item) {
                if (searchMatch(item['name'], $scope.query))
                    return true;
                return false;
            });

            // take care of the sorting order

            $scope.currentPage = 0;
            // now group by pages
            $scope.groupToPages();
        }
    };

    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.getRangeText = function () {
        if ($scope.filteredItems) {
            if ($scope.filteredItems.length > 19) {
                from = ($scope.currentPage * $scope.itemsPerPage) + 1;
                if ($scope.filteredItems.length > (($scope.currentPage * $scope.itemsPerPage) + $scope.itemsPerPage)) {
                    to = ($scope.currentPage * $scope.itemsPerPage) + $scope.itemsPerPage;
                } else {
                    to = $scope.filteredItems.length;
                }
                return from + " - " + to;
            } else if ($scope.filteredItems.length == 0) {
                return "0 - " + $scope.filteredItems.length;
            } else {
                return "1 - " + $scope.filteredItems.length;
            }
        }
        else {
            return "0 - 0"
        }
    }

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.sort_by = function (newSortingOrder) {


        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;

        // icon setup
        $('th i').each(function () {
            // icon reset
            $(this).removeClass().addClass('icon-sort');
        });
        if ($scope.reverse)
            $('th.' + new_sorting_order + ' i').removeClass().addClass('icon-chevron-up');
        else
            $('th.' + new_sorting_order + ' i').removeClass().addClass('icon-chevron-down');
    };

    $scope.getReverse = function (orderBy) {
        if (orderBy == $scope.order) {
            $scope.reverse = !$scope.reverse;
        }
        else {
            if (orderBy == 'name' || orderBy == 'email') {
                $scope.reverse = false;
            }
            else {
                //We want the default order for last updated to be in descending order
                $scope.reverse = true;
            }
        }

        analytics.track('Order templates by ' + orderBy, {
            reverse: $scope.reverse
        })

        return $scope.reverse;
    }

    $scope.delete = function (templateid) {
        if (confirm('Are you sure you want to delete this template?')) {
//            var template = templateResource.get({id: templateid}, function () {
            var template = new templateResource({id: templateid})
            template.$delete(function (response, status) {
                if (response.error == "Unauthorised") {
                    $window.location.href = "/";
                }
                if (response.response == "success") {

                    for (var i in $scope.templates) {
                        if ($scope.templates[i].id == templateid) {
                            $scope.templates.remove($scope.templates.indexOf($scope.templates[i]))
                            break;
                        }
                    }

                    $scope.search();

                    $scope.status = "Template deleted successfully";
                    $scope.showalert++;

                    analytics.track('Template Delete (Template List)');

                } else {
                    $scope.status = "There has been an error deleting the template";
                    $scope.showalert++;
                }
            });
            //      })
        }
    }

}

function TemplateCntl($scope, $routeParams, selectExercise, exerciseResource, selectExercise,$http, flip, getExerciseClass, practitionerResource, formValidate, $location, templateResource, practitionerData, $window, navData, getBtnClass) {
    navData.prepForBroadcast('nav-template')
    var self = this;
    self.searchTags = ['neck', 'lower Arm', 'upper Legs', 'lower Legs', 'chest', 'abdomen', 'shoulder', 'back', 'gluets', 'upper Arm', 'none']
    $scope.showalert = 0;

    practitionerResource.get({time: Date.now().toString()}, function (data, error) {
            if(data.expired) {
                $location.path("/practitioner/subscription");
            }
            $scope.practitioner = data;
            practitionerData.prepForBroadcast(data);

            //We can now identify
            analytics.identify($scope.practitioner.id, {
                "name": $scope.practitioner.name,
                "email": $scope.practitioner.email,
                "phone": $scope.practitioner.phone,
                "photo": $scope.practitioner.photo,
                "address": $scope.practitioner.address,
                "company": $scope.practitioner.company,
                "website": $scope.practitioner.website,
                "emailText": $scope.practitioner.emailText,
                "ClinicId": $scope.practitioner.ClinicId
            });

            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }

        },
        function (data, status) {
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
            if (status == 500) {
                $window.location.href = "/";
            }
        })
    $scope.getExerciseClass = function (exercise) {return getExerciseClass(exercise)}


    $scope.getBtnClass = function(exercise){return getBtnClass(exercise)}

    $scope.dropdownText = "Body Filter"
    $scope.search = ['all', 'Anterior', 'neck'];

    $scope.trueval = false

    $scope.stretchFilter = "All"

    $scope.filters = ['All', 'Stretch', 'Strengthen']

    $scope.filterTag = function () {
        if ($scope.stretchFilter == 'Strengthen') {
            $scope.filterStrengthenTag()
        } else if ($scope.stretchFilter == 'All') {
            $scope.filterAllTag()
        } else {
            $scope.filterStretchTag()
        }
    }

    $scope.showVideo = function (exercise) {

        $window.open(exercise.videoMp4, '_blank');
        analytics.track('Watched a Video (Home Page)', {
            Name: exercise.name
        });
    }

    $scope.validateForm = function () { return formValidate($scope.exerciseList) }

    $scope.editExercise = function (exercise) {
        $scope.modalExercise = new exerciseResource(exercise);
        $scope.exerciseModalStatus = 'show'
    }

    $scope.showFilterModal = function () {
        $('#body-modal').modal({
            backdrop: true
        })
    }

    $scope.smallString = function(request, name){
        var len = 100;
        if (name.length > 22){
            len = 75;
        }
        if (request.length > len) {
            return request.substr(0, len-1) + "..."
        } else {
            return request
        }

    }

    $scope.searchFilter = function (needle) {
        if ($scope.search.indexOf(needle) != -1) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.filterAllTag = function () {
        if ($scope.search.indexOf('Strengthen') != -1)
            $scope.search.remove($scope.search.indexOf('Strengthen'))
        if ($scope.search.indexOf('Stretch') != -1)
            $scope.search.remove($scope.search.indexOf('Stretch'))

        analytics.track('Filter Exercises (Templates)', {
            filter: 'All'
        })
    }


    $scope.filterStretchTag = function () {
        if ($scope.search.indexOf('Strengthen') != -1)
            $scope.search.remove($scope.search.indexOf('Strengthen'))
        if ($scope.search.indexOf('Stretch') != -1)
            $scope.search.remove($scope.search.indexOf('Stretch'))

        $scope.search.push('Stretch')

        analytics.track('Filter Exercises (Templates)', {
            filter: 'Stretch'
        })
    }

    $scope.filterStrengthenTag = function () {
        if ($scope.search.indexOf('Stretch') != -1)
            $scope.search.remove($scope.search.indexOf('Stretch'))
        if ($scope.search.indexOf('Strengthen') != -1)
            $scope.search.remove($scope.search.indexOf('Strengthen'))
        $scope.search.push('Strengthen')

        analytics.track('Filter Exercises (Templates)', {
            filter: 'Strengthen'
        })
    }

    $scope.searchToString = function () {
        return $scope.search.toString().replace(',', ' ');
    }

    $scope.selectExercise = function (exercise) {

        var found = false
        for (var i in $scope.exerciseList.exercises) {
            if ($scope.exerciseList.exercises[i].id == exercise.id) {
                $scope.exerciseList.exercises[i] = exercise;
                found = true;
            }
        }

        for (var i in $scope.exercises) {

            if ($scope.exercises[i].id == exercise.id) {
                $scope.exercises[i].active = true;
            }
        }

        if (!found) {
            $scope.exerciseList.exercises.push(exercise)
            analytics.track("Added Exercise (Template)", {
                id: exercise.id,
                name: exercise.name
            })
        }
        else {
            analytics.track("Updated Exercise (Template)", {
                id: exercise.id,
                name: exercise.name
            })
        }

        exercise.active = true

        $scope.exerciseModalStatus = 'hide'
        $scope.modalExercise = {};
    }

    $scope.setPrescriptionValue = function (prescription, value) {
        prescription.value = value;
    }

    $scope.backOrFront = "Anterior";
    $scope.flip = function () {
        flip($scope.search, function (search, backOrFront) {
            $scope.search = search
            $scope.backOrFront = backOrFront
        })
    }

    $scope.addToSearch = function (request) {
        for (var i in self.searchTags) {
            if ($scope.search.indexOf(self.searchTags[i]) != -1) {
                $scope.search.remove($scope.search.indexOf(self.searchTags[i]))
            }
        }
        $scope.search.push(request)

    }

    $scope.getPrescriptionDataText = function (exercise) {
        var string = "";

        if (exercise.prescriptionData.length > 0) {
            for (var i = 0; i < exercise.prescriptionData.length - 1; i++) {
                if (exercise.prescriptionData[i].value != 'undefined' && exercise.prescriptionData[i].value != undefined) {
                    if (exercise.prescriptionData[i].name != "Comments") {
                        string += exercise.prescriptionData[i].value + " " + exercise.prescriptionData[i].name + ", "
                    } else {
                        string += exercise.prescriptionData[i].value + ", "
                    }
                }
            }
            if (exercise.prescriptionData[i].value != 'undefined' && exercise.prescriptionData[i].value != undefined) {
                if (exercise.prescriptionData[i].name != "Comments")
                    string += exercise.prescriptionData[exercise.prescriptionData.length - 1].value + " " + exercise.prescriptionData[exercise.prescriptionData.length - 1].name
                else {
                    string += exercise.prescriptionData[exercise.prescriptionData.length - 1].value
                }
            }
        }
        return string
    }

    $scope.hideModal = function () {
        $scope.exerciseModalStatus = 'hide'
    }

    $scope.isDisabled = function () {
        if ($scope.exerciseList) {
            if ($scope.exerciseList.exercises) {
                if ($scope.exerciseList.exercises.indexOf($scope.modalExercise) == -1) {
                    return true
                } else {
                    return false
                }
            }
            else {
                return true;
            }
        } else {
            return true;
        }
    }

    $scope.addExercise = function (exercise, isThumbnail) {

        if (!exercise.active) {
            $scope.modalExercise = new exerciseResource(exercise);
            $scope.exerciseModalStatus = 'show'
        } else {
            //REMOVED - Setting to false changes the order since there is no property
            //exercise.active = false
            delete exercise.active;


            if (!isThumbnail) {
                isThumbnail = false;
            }

            analytics.track("Removed Exercise", {
                id: exercise.id,
                name: exercise.name,
                thumbnail: isThumbnail
            })

            for (var i in $scope.exerciseList.exercises) {
                if ($scope.exerciseList.exercises[i].id == exercise.id) {
                    $scope.exerciseList.exercises.remove($scope.exerciseList.exercises.indexOf($scope.exerciseList.exercises[i]))
                }
            }
            for (var i in $scope.exercises) {
                if ($scope.exercises[i].id == exercise.id) {

                    //REMOVED - Setting to false changes the order since there is no property
                    //$scope.exercises[i].active = false;
                    delete $scope.exercises[i].active;

                }
            }
            $scope.exerciseModalStatus = 'hide'
        }
    }

    if ($routeParams.id) {


        templateResource.get({
            time: Date.now().toString(), id: $routeParams.id
        }, function (data, status) {
            if (!data) {
                $scope.exerciseList = {};
                $scope.trueval = true;
            }
            else {
                if (data.error == "Unauthorised") {
                    $window.location.href = "/";
                }
                $scope.originalName = data.name
                $scope.exerciseList = data
                if ($scope.exerciseList.emailText)
                    $scope.emailText = $scope.exerciseList.emailText.replace(/<br \/>?/g, '\n');
                $scope.trueval = true;
            }
            if (!$scope.exerciseList.exercises) {
                $scope.exerciseList.exercises = [];

            }
            else {
                for (p in $scope.exerciseList.exercises) {
                    $scope.exerciseList.exercises[p].active = true
                    if ($scope.exercises) {
                        for (i in $scope.exercises) {
                            if ($scope.exercises[i]) {
                                if ($scope.exerciseList.exercises[p].id == $scope.exercises[i].id) {
                                    $scope.exercises[i].active = true;
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    else {
        templateResource.get({ time: Date.now().toString() }, function (data, status) {
            if (data) {
                $scope.exerciseList = data
            }
        })
        $scope.newTemplate = true;
    }

    $scope.patientId = $routeParams.patientId;

    $scope.displayVideo = function (exercise) {

    }

    $scope.getSelectText = function (exercise) {
        if (exercise.selected) {
            return "Unselect"
        }
        else
            return "Select"
    }

    $http.get('/exercises.json').then(function (data) {
        $scope.exercises = data.data;
        if (!$scope.exercises)
            $scope.exercises = [];
        else {
            if ($scope.exercises && $scope.exerciseList) {
                for (var i in $scope.exercises) {
                    for (var p in $scope.exerciseList.exercises) {
                        if ($scope.exercises[i]) {
                            if ($scope.exerciseList.exercises[p].id == $scope.exercises[i].id) {
                                $scope.exercises[i].active = true;
                                // $scope.exerciseList.exercises[p] = $scope.exercises[i];
                            }
                        }
                    }
                }
            }
        }
    });


    $scope.spacecamel = function (s) {
        return s.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
            return str.toUpperCase();
        })
    }

    $scope.save = function () {
        $("#save").button('loading')
        if ($scope.emailText) {
            $scope.exerciseList.emailText = $scope.emailText.replace(/\n\r?/g, '<br />');
        }

        $scope.exerciseList.$save({id: $scope.exerciseList.id}, function (data, status) {
            if (status == 500) {
                $scope.status = "There was an issue with the server"
                $scope.showalert++;
                $("#save").button('fail')
            }
            if (data.error) {
                if (data.error == "Unauthorised") {
                    $window.location.href = "/";
                }

                $scope.status = data.error
                $scope.showalert++;
                $("#save").button('fail')
            }
            else {
                $location.path("/template")
            }
        });
    }
    $scope.dismissAlert = function () {
        $scope.updateError = 0;
    }
    $scope.getDescription = function (value) {
        if (value.length > 300)
            return value.substr(0, 300) + "..."
        else
            return value
    }

    $scope.selected = function (exercise) {  $scope.exerciseList.exercises = selectExercise($scope.exerciseList.exercises, exercise) }
}

function TemplateViewCntl($scope, templateResource, exerciseResource, showComments, practitionerResource,showPrescribed, $routeParams, $location, practitionerData, $window, navData) {
    navData.prepForBroadcast('nav-template')

    var self = this;
    $scope.exerciseList = {}
    $scope.exerciseList.name = "This is the template"


    practitionerResource.get({time: Date.now().toString()}, function (data, error) {
            $scope.practitioner = data;
            practitionerData.prepForBroadcast(data);

            //We can now identify
            analytics.identify($scope.practitioner.id, {
                "name": $scope.practitioner.name,
                "email": $scope.practitioner.email,
                "phone": $scope.practitioner.phone,
                "photo": $scope.practitioner.photo,
                "address": $scope.practitioner.address,
                "company": $scope.practitioner.company,
                "website": $scope.practitioner.website,
                "emailText": $scope.practitioner.emailText,
                "ClinicId": $scope.practitioner.ClinicId
            });

            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }

        },
        function (data, status) {
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
            if (status == 500) {
                $window.location.href = "/";
            }
        })



    templateResource.get({
        time: Date.now().toString(), id: $routeParams.id
    }, function (data, status) {
        if (!data) {
            $scope.exerciseList = {};
            $scope.trueval = true;
        }
        else {
            if (data.error == "Unauthorised") {
                $window.location.href = "/";
            }
            $scope.originalName = data.name
            $scope.exerciseList = data
            if ($scope.exerciseList.emailText)
                $scope.emailText = $scope.exerciseList.emailText.replace(/<br \/>?/g, '\n');
            $scope.trueval = true;
        }
        if (!$scope.exerciseList.exercises) {
            $scope.exerciseList.exercises = [];

        }
        else {
            for (p in $scope.exerciseList.exercises) {
                $scope.exerciseList.exercises[p].active = true
                if ($scope.exercises) {
                    for (i in $scope.exercises) {
                        if ($scope.exercises[i]) {
                            if ($scope.exerciseList.exercises[p].id == $scope.exercises[i].id) {
                                $scope.exercises[i].active = true;
                            }
                        }
                    }
                }
            }
        }
    });

    $scope.editExerciseList = function () {
        if ($scope.exerciseList.id) {
            analytics.track("Click - Edit Template (Template View)")
            $location.path("/template/edit/" + $scope.exerciseList.id);
        }
    }

    $scope.showEditProgramNotes = function () {
        $scope.editProgramNotes = !$scope.editProgramNotes
    }


    $scope.saveEmailText = function () {
        if ($scope.emailText)
            $scope.exerciseList.emailText = $scope.emailText.replace(/\n\r?/g, '<br />');
        $scope.exerciseList.$save({id: $routeParams.id}, function (response, status) {
            if (response.error == "Unauthorised") {
                $window.location.href = "/";
            }

            analytics.track("Updated Program Notes (Template View)");

            $scope.editProgramNotes = !$scope.editProgramNotes
        })
    }

    $scope.showComments = function (exercise) { return showComments(exercise) }

    $scope.editExercise = function (exercise) {
        $scope.modalExercise = new exerciseResource(exercise);
        $scope.exerciseModalStatus = 'show'
    }


    $scope.removeExercise = function (exercise, modal) {
        if (confirm("Are you sure you want to remove this exercise?")) {
            $scope.exerciseList.exercises.remove($scope.exerciseList.exercises.indexOf(exercise));
            $scope.exerciseList.$save({id: $routeParams.id}, function (response, status) {
                if (response.error == "Unauthorised") {
                    $window.location.href = "/";
                }
                analytics.track("Removed Exercise (Template View)", {
                    id: exercise.id,
                    name: exercise.name,
                    modal: modal || false
                })
            })
            $scope.exerciseModalStatus = 'hide'
        }
    }


    $scope.selectExercise = function (exercise) {
        $scope.exerciseModalStatus = 'hide'
        for (var i in  $scope.exerciseList.exercises) {
            if ($scope.exerciseList.exercises[i].id == exercise.id) {
                $scope.exerciseList.exercises[i] = exercise;
            }
        }
        $scope.exerciseList.$save({id: $routeParams.id}, function (response, status) {
            if (response.error == "Unauthorised") {
                $window.location.href = "/";
            }
            analytics.track("Updated Exercise (Template View)", {
                id: exercise.id,
                name: exercise.name
            })
        })

        $scope.exerciseModalStatus = 'hide'
        $scope.modalExercise = {};
    }

    $scope.hideModal = function () {
        $scope.exerciseModalStatus = 'hide'
    }


    $scope.setPrescriptionValue = function (prescription, value) {
        prescription.value = value;
    }


    $scope.getPrescriptionText = function (prescription, noDots) {

        if (noDots) {
            if (prescription) {
                return prescription.name;
            }
            else {
                return "";
            }
        }

        if (prescription) {
            if (prescription.name && prescription.value) {
                var length = prescription.name.length + prescription.value.length;
                var dots = 100 - length;
                dots *= 1.6;
                var result = prescription.name + " ";

                for (var i = 0; i < dots; i++) {
                    result += ". "
                }
                return result
            } else {
                return ""
            }
        } else {
            return ""
        }
    }

    $scope.showVideo = function (exercise) {

        $window.open(exercise.videoMp4, '_blank');
        analytics.track('Watched a Video (Home Page)', {
            Name: exercise.name
        });
    }

    $scope.showPrescribed = function (exercise) { return showPrescribed(exercise) }

    $scope.getExerciseComments = function (exercise) {
        for (var i in exercise.prescriptionData) {
            if (exercise.prescriptionData[i].name == "Comments") {
                return exercise.prescriptionData[i].value
            }
        }
    }

    $scope.getUpdatedAtText = function () {
        if ($scope.exerciseList) {
            return "Last edited: " + dateFormat($scope.exerciseList.updatedAt, "ddd, dS mmmm yyyy @ H:MM");
        } else {
            return "";
        }
    }

}