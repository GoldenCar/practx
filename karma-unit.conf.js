// Testacular configuration
// Generated on Sat Oct 27 2012 10:46:36 GMT+1100 (EST)


// base path, that will be used to resolve files and exclude
basePath = './';

// list of files / patterns to load in the browser
files = [
    JASMINE,
    JASMINE_ADAPTER,
    'public/javascripts/angular.min.js'
    ,'public/javascripts/angular-resource.min.js'
    ,'test/lib/angular/angular-mocks.js'
    ,'test/unit/controllersSpec.js'
    , 'public/javascripts/angular/catalogueControllers.js'
    , 'public/javascripts/angular/practitionerControllers.js'
    , 'public/javascripts/angular/directives.js'
    , 'public/javascripts/angular/catalogueFilters.js'
    , 'public/javascripts/angular/services.js'
    , 'public/javascripts/date.format.js'
];

// list of files to exclude
exclude = [
];

// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['dots', 'junit'];

//junitReporter = {
//    outputFile: 'catalougeResults.xml'
//}


// web server port
port = 8081;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Firefox'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
//singleRun = true;

singleRun = true;


