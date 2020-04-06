var db = require('../models')
    , async = require('async')
    , Sequelize = require('sequelize')
    , Config = require('../config/config.js')
    , config = new Config()
    , sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {host:config.database.host, dialect:config.database.dialect, port:config.database.port, logging: false})
    , db = new db(sequelize)
    , ExerciseList = require('../exercise_list')
    , ExerciseList = new ExerciseList(db)
    ,  SendGrid = require('sendgrid').SendGrid
    ,  sendgrid = new SendGrid('support@practx.com', 'WHAtrBK4gGk8&7jkhl*(&(');


    db.ExerciseList_model.getExerciseListUpdatedLastWeek(function(exerciseLists) {
        async.forEach(exerciseLists, function (exerciseList, finished) {

            var email = '<p style="font-family:Lucida Grande,Arial,sans-serif;font-size:14px;color:#1b1b1b;margin:8px 0 0"><b>Dear ' + exerciseList.patientName + ',</b></p>\
                                        \
                                        <p style="font-family:Lucida Grande,Arial,sans-serif;font-size:13px;color:#1b1b1b;margin:10px 0 0">Welcome to PracTx.  PracTx is a revolutionary way to improve your health and get you to your best sooner.  Simply follow the link below an you will be directed to your personalised and prescribed exercise list.\
                                        Here is some important information about PracTx.</p>\
        <ul>\
            <li>\
         Most of the exercises are demonstrated on the right side of your body.  If you have been asked to perform the exercise on your left you will have to replicate the exercise for the left hand side.</li>\
            <li>Remember to follow to exercises carefully and any concerns should be raised with your health care professional prior to completing the exercises.</li>\
            <li>Pain other than the region specified, should be a clear indication to stop and attempt to consult with your health care provider.</li>\
            <li>If you are unsure of any of the video content consult with your health care provider and request an in clinic demonstration.</li>\
            <li>You may need to improvise with securing exercise bands around the home or office.  It is your responsibility to ensure the bands are secured to avoid injury.</li>\
            <li>This Application works best in chrome and does not support Internet explorer below version 9.</li>\
     <br/><br/> To View your Exercise List, visit this URL: <br/> <a href="https://www.practx.com/exerciselist/' + exerciseList.randomString + '"> http://practx.com/exerciselist/' + exerciseList.randomString + '</a>\
        <p>We hope you enjoy using PracTx.</p>\
        <p>Best of health,<br/>\
        The PracTx team.<p>';

            sendgrid.send({
                to: exerciseList.patientEmail,
                from: exerciseList.practitionerName.replace(/ /gi, '.') + '@practx.com',
                fromname: exerciseList.practitionerName,
                replyto: exerciseList.practitionerEmail,
                subject: "Your Exercise List Prescription - From " + exerciseList.practitionerName,
                html: email
            }, function (success, message) {

            })
            finished();
        })
    })