'use strict';

/* jasmine specs for controllers go here */

describe('Test Patient Controller', function () {

    var $httpBackend, scope;

    //you need to indicate your module in a test

    beforeEach(module('patientModule'))
    beforeEach(inject(function ($injector, $rootScope) {
        $httpBackend = $injector.get('$httpBackend');
    }));

    beforeEach(inject(function ($rootScope, $controller, exerciseListResource, practitionerData, $location, $window) {
        $httpBackend.expect('GET', '/api/exerciselist').respond({"name": "New Patient one one's exercise list", "emailText": "asasas", "randomString": "eb4683e4e10a639f481cefa9d9ba83cd", "status": "Sent", "id": 66, "createdAt": "2013-03-18T23:20:07.639Z", "updatedAt": "2013-03-18T23:20:09.567Z", "PatientId": 166, "PractitionerId": 1, "exercises": [
            {"name": "Single Leg Raises", "videoWebM": "https://s3.amazonaws.com/practx/videos/single-leg-raise.webm", "videoMp4": "https://s3.amazonaws.com/practx/videos/single-leg-raise.mp4", "thumbnail": "https://s3.amazonaws.com/practx/thumbnails/single-leg-raise.png", "description": "Lie on your back with your arms by your side and your palms facing upwards.  Begin by drawing in your stomach and gently flattening your spine against the ground. Begin to raise your right leg whilst keeping your leg straight.  Raise it up to a comfortable position  and relax.  Repeat as prescribed.  If you notice any tingling, numbness or pain stop and discuss with your health therapist.", "videoLength": "5138008", "id": 63, "createdAt": "2013-03-10T22:54:15.260Z", "updatedAt": "2013-03-10T22:54:16.925Z", "exerciselistexerciseid": 7656, "tags": [
                {"name": "Anterior", "id": 12, "createdAt": "2013-03-10T22:54:14.638Z", "updatedAt": "2013-03-10T22:54:14.638Z"},
                {"name": "Abdomen", "id": 14, "createdAt": "2013-03-10T22:54:14.639Z", "updatedAt": "2013-03-10T22:54:14.639Z"},
                {"name": "Strengthen", "id": 2, "createdAt": "2013-03-10T22:54:14.630Z", "updatedAt": "2013-03-10T22:54:14.631Z"},
                {"name": "Upper Legs", "id": 10, "createdAt": "2013-03-10T22:54:14.637Z", "updatedAt": "2013-03-10T22:54:14.637Z"}
            ], "prescriptionData": [
                {"name": "Comment", "sentence": "Comments", "id": 8, "value": "This is a commentr"},
                {"name": "Repetitions", "sentence": "Reps", "id": 1, "value": "8"},
                {"name": "Sets", "sentence": "Sets", "id": 2, "value": "3"},
                {"name": "Frequency (per day)", "sentence": "x Per Day", "id": 3, "value": "3"},
                {"name": "Side", "sentence": "Side(s)", "id": 7, "value": "Right"}
            ]},
            {"name": "Scalenes Posterior", "videoWebM": "https://s3.amazonaws.com/practx/videos/scalenes-posterior.webm", "videoMp4": "https://s3.amazonaws.com/practx/videos/scalenes-posterior.mp4", "thumbnail": "https://s3.amazonaws.com/practx/thumbnails/scalenes-posterior.png", "description": "Whilst upright, rotate your head away to the left and gently look towards your left armpit.  You may also use your left arm to gently pull your head away.  Remember to avoid compressing your neck.   To further increase the stretch you may hold your breath out.  This stretch will be felt to the side of your neck towards the back. Hold for the prescibed time.", "videoLength": "5138008", "id": 2, "createdAt": "2013-03-10T22:54:14.906Z", "updatedAt": "2013-03-10T22:54:16.195Z", "exerciselistexerciseid": 7657, "tags": [
                {"name": "Anterior", "id": 12, "createdAt": "2013-03-10T22:54:14.638Z", "updatedAt": "2013-03-10T22:54:14.638Z"},
                {"name": "Neck", "id": 3, "createdAt": "2013-03-10T22:54:14.631Z", "updatedAt": "2013-03-10T22:54:14.631Z"},
                {"name": "Stretch", "id": 1, "createdAt": "2013-03-10T22:54:14.629Z", "updatedAt": "2013-03-10T22:54:14.629Z"}
            ], "prescriptionData": [
                {"name": "Side", "sentence": "Side(s)", "id": 7, "value": "Right"}
            ]}
        ], "practitioner": {"name": "null null", "email": "thomas1bunting@gmail.com", "phone": null, "emailText": null, "photo": null, "permission": "Practitioner", "authicId": "1", "id": 1, "createdAt": "2013-01-03T05:17:29.190Z", "updatedAt": "2013-03-20T04:10:15.961Z", "ClinicId": 31, "clinic": {"name": "null null", "address": "2 Tea Tree Place", "phone": "0438568274", "website": null, "id": 31, "createdAt": "2013-01-03T05:17:29.210Z", "updatedAt": "2013-03-20T04:10:15.964Z"}}});
        scope = $rootScope.$new();
        var ctrl = $controller(PatientExerciseListCntl, {
            exerciseListResource: exerciseListResource,
            $scope: scope,
            practitionerData: practitionerData,
            $location: $location,
            $window: $window
        });
        $httpBackend.flush();
    }))


    it('should set the practitioners name', function () {
        expect(scope.practitioner.name).toEqual("null null");
    });

    it('should set current exercise to the first exercise', function(){
        expect(scope.currentExercise.name).toEqual('Single Leg Raises')
    })


    it('should select current Exercise', function () {
        scope.showMobileExercise(1)
        expect(scope.currentExercise.name).toEqual("Scalenes Posterior");
    })

    it('should get exercise comment', function () {
        expect(scope.getExerciseComments({"name": "Single Leg Raises", "prescriptionData": [
            {"name": "Comments", "sentence": "Comments", "id": 8, "value": "This is a commentr"},
            {"name": "Repetitions", "sentence": "Reps", "id": 1, "value": "8"},
            {"name": "Sets", "sentence": "Sets", "id": 2, "value": "3"},
            {"name": "Frequency (per day)", "sentence": "x Per Day", "id": 3, "value": "3"},
            {"name": "Side", "sentence": "Side(s)", "id": 7, "value": "Right"}
        ]})).toEqual("This is a commentr")
    })

    it('should equal undefined if no comment in exercise', function(){
        expect(scope.getExerciseComments({name: "Name"})).toEqual(undefined)
    })

    it('should not display prescribed data', function(){
        expect(scope.showPrescribed({prescriptionData: {}})).toEqual(false)
    })

    it('should display prescribed data', function(){
        expect(scope.showPrescribed({"name": "Single Leg Raises", "prescriptionData": [
            {"name": "Comments", "sentence": "Comments", "id": 8, "value": "This is a commentr"},
            {"name": "Repetitions", "sentence": "Reps", "id": 1, "value": "8"},
            {"name": "Sets", "sentence": "Sets", "id": 2, "value": "3"},
            {"name": "Frequency (per day)", "sentence": "x Per Day", "id": 3, "value": "3"},
            {"name": "Side", "sentence": "Side(s)", "id": 7, "value": "Right"}
        ]})).toEqual(true)
    })

    it('should not display comments', function(){
        expect(scope.showComments({})).toEqual(false)
    })

    it('should display comments', function(){
        expect(scope.showComments({"name": "Single Leg Raises", "prescriptionData": [
            {"name": "Comments", "sentence": "Comments", "id": 8, "value": "This is a comment"},
            {"name": "Repetitions", "sentence": "Reps", "id": 1, "value": "8"},
            {"name": "Sets", "sentence": "Sets", "id": 2, "value": "3"},
            {"name": "Frequency (per day)", "sentence": "x Per Day", "id": 3, "value": "3"},
            {"name": "Side", "sentence": "Side(s)", "id": 7, "value": "Right"}
        ]})).toEqual(true)
    })

    it('returns formatted text', function(){
        expect(scope.getUpdatedAtText()).toEqual('Last sent: Tue, 19th March 2013')
    })

});



describe('Testing MenuCntl', function () {

    var $httpBackend, scope;
    var analytics=analytics||[];analytics.load=function(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"===document.location.protocol?"https://":"http://")+"d2dq2ahtl5zl1z.cloudfront.net/analytics.js/v1/"+e+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);var r=function(e){return function(){analytics.push([e].concat(Array.prototype.slice.call(arguments,0)))}},i=["identify","track","trackLink","trackForm","trackClick","trackSubmit","pageview","ab","alias","ready"];for(var s=0;s<i.length;s++)analytics[i[s]]=r(i[s])};
    analytics.load("aq5kapao5v");
    //you need to indicate your module in a test

    beforeEach(module('practitioner'))
    beforeEach(inject(function ($injector, $rootScope) {
        $httpBackend = $injector.get('$httpBackend');
    }));

    beforeEach(inject(function ($rootScope, $controller, exerciseListResource, practitionerData, $location, $window, analytics) {
        $httpBackend.expect('POST', '/user/patient').respond({error: "an error"});
        scope = $rootScope.$new();
        var ctrl = $controller(MenuCntl, {
            exerciseListResource: exerciseListResource,
            $scope: scope,
            practitionerData: practitionerData,
            $location: $location,
            $window: $window,
            analytics: analytics
        });

    }))

    it('Saves and has an error', function(){
        scope.saveAndRedirect();
        $httpBackend.flush();
        expect(scope.status).toEqual('an error')
    })


});



describe('Testing PractitionerEditCntl', function () {

    var $httpBackend, scope, $navData;

    //you need to indicate your module in a test

    beforeEach(module('practitioner'))
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
    }));

    beforeEach(inject(function ($rootScope, $controller, practitionerData, userResource, $location, navData, $window, analytics) {
        $navData = navData;
        $httpBackend.expect('GET', '/user/self').respond({
            "name": "Thomas Bunting",
            "email": "thomas1bunting@gmail.com",
            "id": 39
        });

        scope = $rootScope.$new();
        var ctrl = $controller(PractitionerEditCntl, {
            userResource: userResource,
            $scope: scope,
            practitionerData: practitionerData,
            $location: $location,
            $window: $window,
            navData: navData,
            analytics: analytics
        });
        $httpBackend.flush();
    }))

    it('Expect practitioner to be pulled', function(){
        expect(scope.practitioner.name).toEqual('Thomas Bunting')
    })

    it('expect navdata to equal account', function(){
        expect($navData.data).toEqual('account')
        expect(scope.content).toEqual('#popover-content')
    })

    it('expect bodyparts to be initialized', function(){
        $httpBackend.expect('POST', '/user/self').respond({
            "data":"success"
        });
        scope.register()
        $httpBackend.flush();
        expect(scope.saveBtnStatus).toEqual('loading')
    })
});



describe('Testing PatientCntl', function () {

    var $httpBackend, scope, $navData;

    //you need to indicate your module in a test

    beforeEach(module('practitioner'))
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
    }));

    beforeEach(inject(function ($rootScope, $controller, practitionerData, practitionerResource,  userResource, $location, navData, $window, analytics, $filter, $http) {
        $navData = navData;
        $httpBackend.expect('GET', '/user/self').respond({
            "name": "Thomas Bunting",
            "email": "thomas1bunting@gmail.com",
            "id": 39
        });

        scope = $rootScope.$new();
        var ctrl = $controller(PatientCntl, {
            userResource: userResource,
            $http: $http,
            practitionerResource: practitionerResource,
            $filter: $filter,
            $scope: scope,
            practitionerData: practitionerData,
            $location: $location,
            $window: $window,
            navData: navData,
            analytics: analytics
        });
        $httpBackend.flush();
    }))

    it('Expect all initialized code', function(){
        expect(scope.practitioner.name).toEqual('Thomas Bunting')
        expect($navData.data).toEqual('nav-patients')
        expect(scope.reverse).toEqual(false)
        expect(scope.filteredItems).toEqual([])
        expect(scope.groupedItems).toEqual([])
        expect(scope.itemsPerPage).toEqual(20)
        expect(scope.pagedItems).toEqual([])
        expect(scope.currentPage).toEqual(0)
        expect(scope.sortType).toEqual('status-0')
        expect(scope.order).toEqual('exerciseList.status')
    })
});