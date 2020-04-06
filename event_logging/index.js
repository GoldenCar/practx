var db = require('../models')
, Sequelize = require('sequelize')
, Config = require('../config/config.js')
, config = new Config()
, PatientView = require('../patient_view')
, sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {host:config.database.host, dialect:config.database.dialect, port:config.database.port, logging: false, native: true})
, db = new db(sequelize);
PatientView = new PatientView(db);

module.exports = function(User){
    var config = new Config();
   // var statsdb = monk(config.mongo_session.username+":"+config.mongo_session.password+"@"+config.mongo_session.host+":"+config.mongo_session.port+"/"+config.mongo_session.db);

    var stats = {};

    var isMobile = function(request){
        var r = require('ua-parser').parse(request.headers['user-agent']);
        var suffix = ".html";

        var ua = request.headers['user-agent'];

        if (/mobile/i.test(ua) || /tablet/i.test(ua)) {
            return true;
        }
        else{
            return false;
        }
    }

    return {
       logPatient: function(request, data){
           //Don't log if an error or a practitioner
           if (data.error || request.isAuthenticated()){
               return;
           }
           var mobile = isMobile(request);
           //var patientViews = statsdb.get('patient_views');

           User.getPatient(data.practitioner.clinic.id, data.PatientId,function (patient) {
               //patientViews.insert(
                   stats = {
                        patientName: patient.name,
                        patientEmail: patient.email,
                        patientId: patient.id,
                        practitionerName: data.practitioner.name,
                        practitionerEmail: data.practitioner.email,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        exerciseCount: data.exercises.length,
                        randomString: data.randomString,
                        clinicName: data.practitioner.clinic.name,
                        clinicAddress: data.practitioner.clinic.address,
                        clinicPhone: data.practitioner.clinic.phone,
                        clinicWebsite: data.practitioner.clinic.website
                    }

                    PatientView.save(stats, function (result) {
                        if(!result.error){
                            console.log("Log successfully created");
                        }else{
                            console.error("Error creating the log!")
                        }
                    })
            //);

           })
       }
    };
};
