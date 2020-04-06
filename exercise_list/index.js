var async = require('async')
    ,  SendGrid = require('sendgrid').SendGrid
    ,  sendgrid = new SendGrid('support@practx.com', 'WHAtrBK4gGk8&7jkhl*(&(')
    ,  mandrill = require('mandrill-api/mandrill')
    ,  md = new mandrill.Mandrill('dOeyEBsxxN_4880AJCuz0g');

function ExerciseList(model, clinic) {
    ExerciseList.conn = model;
    ExerciseList.clinic = clinic;
}

ExerciseList.prototype.conn;


ExerciseList.prototype.saveExerciseList = function (body, practitionerId, patientId, done) {
    exerciseList = ExerciseList.conn.ExerciseList_model.build({})
    exerciseList.PractitionerId = practitionerId
    exerciseList.emailText = body.emailText
    exerciseList.PatientId = patientId
    exerciseList.randomString = require('crypto').createHash('md5').update(Date.now() + " " + exerciseList.PatientId).digest("hex");
    exerciseList.name = body.name
    exerciseList.attributes = ['name',
        'emailText',
        'randomString',
        'status',
        'id',
        'createdAt',
        'updatedAt',
        'PatientId',
        'PractitionerId']
    if (body.exercises.length > 0) {
        exerciseList.status = "Draft";
        delete exerciseList.patient
        delete exerciseList.exercises
        delete exerciseList.exerciseCount
        exerciseList.attributes = ['name',
            'emailText',
            'randomString',
            'status',
            'id',
            'createdAt',
            'updatedAt',
            'PatientId',
            'PractitionerId']
        exerciseList.save().success(function (exerciseList) {
            exerciseList.setExercises(body.exercises, function (exercises) {
                exerciseList.exercises = exercises
                exerciseList.attributes.push('exercises')
                if(exerciseList.PatientId){
                    ExerciseList.conn.User_model.find(exerciseList.PatientId).success(function(patient){
                        exerciseList.patient = patient;
                        exerciseList.attributes.push('patient')
                        done(exerciseList)
                    }).error(function(){
                            done(exerciseList)
                        })
                }else{
                    done(exerciseList)
                }

            })
        }).error(function (error) {
                console.log(error)
                done({error:"An error has occurred"})
            })
    } else {
        exerciseList.status = "Draft";
        delete exerciseList.patient
        delete exerciseList.exercises
        exerciseList.attributes = ['name',
            'emailText',
            'randomString',
            'status',
            'id',
            'createdAt',
            'updatedAt',
            'PatientId',
            'PractitionerId']
        exerciseList.save().success(function (exerciseList) {
            if(exerciseList.PatientId){
                ExerciseList.conn.User_model.find(exerciseList.PatientId).success(function(patient){
                    exerciseList.patient = patient;
                    exerciseList.attributes.push('patient')
                    done(exerciseList)
                }).error(function(){
                        done(exerciseList)
                    })
            }else{
                done(exerciseList)
            }
        }).error(function (error) {
                console.log(error)
                done({error:"An error has occurred"})
            })
    }
}

ExerciseList.prototype.saveTemplate = function (body, practitionerId, done) {
    ExerciseList.conn.ExerciseList_model.find({where: {id: body.id}}).on('success', function(exerciseList){
        if (!exerciseList){  //if the record doesn't exist
            exerciseList = ExerciseList.conn.ExerciseList_model.build({})
        }
        exerciseList.PractitionerId = practitionerId
        exerciseList.emailText = body.emailText
        exerciseList.PatientId = practitionerId
        exerciseList.randomString = require('crypto').createHash('md5').update(Date.now() + " " + exerciseList.PatientId).digest("hex");
        exerciseList.name = body.name
        exerciseList.status = "Template";
        delete exerciseList.patient
        delete exerciseList.exercises
        exerciseList.attributes = ['name',
            'emailText',
            'randomString',
            'status',
            'id',
            'createdAt',
            'updatedAt',
            'PatientId',
            'PractitionerId']
        exerciseList.save().success(function (exerciseList) {
            exerciseList.setExercises(body.exercises, function (exercises) {
                exerciseList.exercises = exercises
                exerciseList.attributes.push('exercises')
                done(exerciseList)
            })
        }).error(function (error) {
                console.log(error)
                done({error:"An error has occurred"})
            })

    })
}


ExerciseList.prototype.prescribe = function (body, exerciseList, user, done) {
    //console.log(user);
    //console.log('user: '+ JSON.stringify(user));
    ExerciseList.clinic.getClinic(user.ClinicId, function (res) {
        // console.log(res);
        // console.log('res++++++++++++++++++');
        if (exerciseList.status != "Template"){
            //console.log('body: '+ JSON.stringify(body));
            var htmlemail = '<p align="right">' + user.name+'<br/>'+res.name+'<br/>Ph: '+res.phone+'<br/>E: '+user.email+'</p>\
            <b>Hello ' + body.patient.name + ',</b></p>\
                \
                <p stylze="font-family:Lucida Grande,Arial,sans-serif;font-size:13px;color:#1b1b1b;margin:10px 0 0">Included below is a list of exercises that have been prescribed to you by ' + user.name + '. Simply follow this link:</p>\
                <a href="https://www.practx.com/exerciselist/' + exerciseList.randomString + '">View Your Exercise Prescription</a><br/>\
                <p stylze="font-family:Lucida Grande,Arial,sans-serif;font-size:13px;color:#1b1b1b;margin:10px 0 0">The exercise videos can be easily followed and repeated as prescribed. Please remember the following when you are preforming your exercise:</p>\
            <ul>\
                <li>Pain other than the region specified, should be a clear indication to stop and attempt to consult with your health care professional.</li>\
                <li>If you are unsure of any of the video content consult with your health care provider and request an in clinic demonstration.</li>\
                <li>The exercises in the videos are usually demonstrated on the right hand side. If the left side has been prescribed you will have to replicate the exercises for the left side.</li>\
                <li>The use of any equipment should be done safely and with care. It is your responsibility to ensure all bands are secured safely to avoid injury.</li></ul>\
                \
            <p>Once again view your exercises by clicking below: <br/> <a href="https://www.practx.com/exerciselist/' + exerciseList.randomString + '"> http://practx.com/exerciselist/' + exerciseList.randomString + '</a>\
            <br/><br/>Regards.<br/>\
            PracTx.com<br/>\
            On behalf of '+ user.name +'.<p><br/>\
            <img src="' + res.logo + '" height="150">';
            // Begin sendgrid
            sendgrid.send({
                to: body.patient.email,
                //from: user.name.replace(/[\.,-\/#'!$%\^&\*;:{}=\-_`~()\s]/gi, '.')+'@practx.com',
                //from: user.email,
                from: 'prescriptions@practx.com',
                fromname: user.name,
                //fromname: "Exercise Prescription",
                replyto: user.email,
                subject:  "Your Exercise List Prescription - From " + user.name,
                html: htmlemail
            }, function (success, message) {
                if (!success) {
                    console.log(message)
                    console.log('start mandrill send');
                    htmlemail = '<img style="width:100%;" src="https://www.practx.com/img/email_head2.png" alt="My image"/><p style="font-family:Lucida Grande,Arial,sans-serif;font-size:14px;color:#1b1b1b;margin:8px 0 0">' + htmlemail
                        var message = {
                            "html": htmlemail,
                            "subject": "Your Exercise List Prescription - From " + user.name,
                            "from_email": "prescriptions@practx.com",
                            "from_name": user.name,
                            "to": [{
                                    "email": body.patient.email,
                                    "name": body.patient.name,
                                    "type": "to"
                                }],
                            "headers": {
                                "Reply-To": user.email
                            }
                        };
                        var async = false;
                        md.messages.send({"message": message, "async": async, "ip_pool": null, "send_at": null}, function(result) {
                            console.log(result);
                            exerciseList.status = "Sent";
                            delete exerciseList.patient
                            delete exerciseList.exercises
                            if(exerciseList.attributes){
                                if(exerciseList.attributes.indexOf('patient') != -1){
                                    exerciseList.attributes.splice(exerciseList.attributes.indexOf('patient'), 1)
                                }
                                if(exerciseList.attributes.indexOf('exercises') != -1){

                                    exerciseList.attributes.splice(exerciseList.attributes.indexOf('exercises'), 1)
                                }
                                exerciseList.attributes = ['name',
                                    'emailText',
                                    'randomString',
                                    'status',
                                    'id',
                                    'createdAt',
                                    'updatedAt',
                                    'PatientId',
                                    'PractitionerId']
                                exerciseList.save().success(function (exerciselist2) {
                                    done({
                                        db:exerciselist2,
                                        email:message
                                    })
                                }).error(function (error) {
                                        console.log(error)
                                        done({error:"An error has occurred"})
                                    })
                            }else{
                                done({
                                    email:message
                                })
                            }
                        }, function(e) {
                            // Mandrill returns the error as an object with name and message keys
                            console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                            done({error:"An error has occurred"});
                            // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
                        });
                        console.log('end mandrill send');
                        // end mandrill
                }
                else {
                    exerciseList.status = "Sent";
                    delete exerciseList.patient
                    delete exerciseList.exercises
                    if(exerciseList.attributes){
                        if(exerciseList.attributes.indexOf('patient') != -1){
                            exerciseList.attributes.splice(exerciseList.attributes.indexOf('patient'), 1)
                        }
                        if(exerciseList.attributes.indexOf('exercises') != -1){

                            exerciseList.attributes.splice(exerciseList.attributes.indexOf('exercises'), 1)
                        }
                        exerciseList.attributes = ['name',
                            'emailText',
                            'randomString',
                            'status',
                            'id',
                            'createdAt',
                            'updatedAt',
                            'PatientId',
                            'PractitionerId']
                        exerciseList.save().success(function (exerciselist2) {
                            done({
                                db:exerciselist2,
                                email:message
                            })
                        }).error(function (error) {
                                console.log(error)
                                done({error:"An error has occurred"})
                            })
                    }else{
                        done({
                            email:message
                        })
                    }
                }
            });
        }
        else{
            done({error:"An error has occurred"})
        }
    });
}

ExerciseList.prototype.getBasicInformationExerciseListByPatientAndPractitioner = function (practitionerId, patientId, done) {
    ExerciseList.conn.ExerciseList_model.find({where:{PractitionerId:practitionerId, PatientId:patientId}, order:'updatedAt DESC'}).success(function (exerciseList) {
        if (exerciseList) {
            ExerciseList.conn.ExerciseList_model.getExerciseCount(exerciseList.id, function (count) {
                if (count) {
                    if (count[0]) {
                        exerciseList.exerciseCount = count[0].count;
                        exerciseList.attributes.push('exerciseCount')
                    } else {
                        exerciseList.exerciseCount = 0;
                        exerciseList.attributes.push('exerciseCount')
                    }
                } else {
                    exerciseList.exerciseCount = 0;
                    exerciseList.attributes.push('exerciseCount')
                }
                done(exerciseList);
            })
        } else {
            done({})
        }
    }).error(function (error) {
            done({error:"An error has occurred"})
        })

}

ExerciseList.prototype.getTemplateByPractitioner = function (practitionerId, done) {
    ExerciseList.prototype.getExerciseListByPatientAndPractitioner(practitionerId, "Template", function(result){
        if (result.practitionerId == result.patientId){
            done(result);
        }
        else{
            done({error:"An error has occurred"})
        }
    })
}

ExerciseList.prototype.getExerciseListByPatientAndPractitioner = function (practitionerId, patientId, done) {
    async.parallel([
        function (callback) {
            if (patientId == "Template"){
                ExerciseList.conn.ExerciseList_model.find({where:{PractitionerId:practitionerId, status:"Template"}, order:'updatedAt DESC'}).success(function (exerciseList) {
                    callback(null, exerciseList)
                }).error(function (error) {
                        callback(error, null)
                    })
            }
            else{
                ExerciseList.conn.ExerciseList_model.find({where:{PractitionerId:practitionerId, PatientId:patientId}, order:'updatedAt DESC'}).success(function (exerciseList) {
                    callback(null, exerciseList)
                }).error(function (error) {
                        callback(error, null)
                    })
            }

        },
        function (callback) {
            ExerciseList.conn.User_model.find({where:{id:patientId}}).success(function (patient) {
                callback(null, patient)
            }).error(function (error) {
                    callback(error, null)
                })
        }
    ], function (err, results) {
        if (err) {
            done({error:"An error has occurred"})
        }
        if (!results[0]) {
            done({patient:results[1]})
        } else {

            results[0].patient = results[1]

            results[0].attributes.push('patient')
            ExerciseList.conn.ExerciseList_model.getExercises(results[0].id, function (exercises) {

                results[0].exercises = exercises;
                results[0].attributes.push('exercises')
                async.forEach(exercises, function (exercise, newCallback) {
                    async.parallel([function (exerciseCallback) {

                        ExerciseList.conn.Exercise_model.getTags(exercise.id,
                            function (tags) {
                                exercise.tags = tags;
                                exerciseCallback();
                            }
                        )
                    }, function (exerciseCallback) {
                        ExerciseList.conn.Exercise_model.getPrescriptionData(exercise.id, function(data){
                            var prescriptions = []
                            for(var i = 0; i < data.length; i++){
                                if(data[i]){
                                    if(JSON.stringify(prescriptions).indexOf(JSON.stringify(data[i].name)) == -1){
                                        prescriptions.push({name: data[i].name,
                                            sentence: data[i].sentence
                                            , values: [data[i].value]
                                            , id: data[i].id})
                                    }else{
                                        for(var p in prescriptions){
                                            if(prescriptions[p].name == data[i].name){
                                                prescriptions[p].values.push(data[i].value)
                                            }
                                        }
                                    }
                                }
                            }
                            exercise.prescriptionData = prescriptions;
                            ExerciseList.conn.Exercise_model.getPrescribedInfo(exercise.exerciselistexerciseid, function (values) {
                                for(var i in values){
                                    for(var p in exercise.prescriptionData){
                                        if(values[i].id == exercise.prescriptionData[p].id){
                                            exercise.prescriptionData[p].value = values[i].value
                                        }
                                    }
                                }
                                exerciseCallback();
                            })
                        })
                    }], function () {
                        newCallback();
                    })
                }, function (error) {
                    done(results[0])
                })
            })
        }
    })
}

ExerciseList.prototype.getTemplates = function (practitionerId, done) {
    var query = ExerciseList.conn.ExerciseList_model.findAll({where:{PractitionerId:practitionerId, status:"Template"}, order:'updatedAt DESC'}).success(function (exerciseLists) {

        async.forEach(exerciseLists, function(exerciseList, finished){

            ExerciseList.conn.ExerciseList_model.getExercises(exerciseList.id, function (exercises) {
                exerciseList.exercises = exercises;
                exerciseList.attributes.push('exercises');

                async.forEach(exercises, function (exercise, newCallback) {
                    if (!exercise){
                        newCallback();
                    }
                    else{
                        async.parallel([function (exerciseCallback) {

                            ExerciseList.conn.Exercise_model.getTags(exercise.id,
                                function (tags) {
                                    exercise.tags = tags;
                                    exerciseCallback();
                                }
                            )
                        }, function (exerciseCallback) {
                            ExerciseList.conn.Exercise_model.getPrescriptionData(exercise.id, function(data){
                                var prescriptions = []
                                for(var i = 0; i < data.length; i++){
                                    if(data[i]){
                                        if(JSON.stringify(prescriptions).indexOf(JSON.stringify(data[i].name)) == -1){
                                            prescriptions.push({name: data[i].name,
                                                sentence: data[i].sentence
                                                , values: [data[i].value]
                                                , id: data[i].id})
                                        }else{
                                            for(var p in prescriptions){
                                                if(prescriptions[p].name == data[i].name){
                                                    prescriptions[p].values.push(data[i].value)
                                                }
                                            }
                                        }
                                    }
                                }
                                exercise.prescriptionData = prescriptions;

                                ExerciseList.conn.Exercise_model.getPrescribedInfo(exercise.exerciselistexerciseid, function (values) {

                                    for(var i in values){
                                        for(var p in exercise.prescriptionData){
                                            if(values[i].id == exercise.prescriptionData[p].id){
                                                exercise.prescriptionData[p].value = values[i].value
                                            }
                                        }
                                    }
                                    exerciseCallback();
                                })
                            })
                        }], function () {
                            newCallback();
                        })
                    }
                }, function (error) {
                    finished(null, exerciseList);
                })

            }, function(error){
                //TODO Do somtething with error
                finished();//forEach
            })

        }, function(error){
            //TODO Do somtething with error
            if (error){}
            done(exerciseLists);
        })

    }).error(function(error){
            done({error:"An error has occurred"})
        })
}

ExerciseList.prototype.getExerciseListByRandomString = function (exerciseListId, done) {
    ExerciseList.conn.ExerciseList_model.find({where:{randomString:exerciseListId}}).success(function (exerciseList) {
        if(exerciseList){
            async.parallel([
                function (callback) {
                    ExerciseList.conn.ExerciseList_model.getExercises(exerciseList.id, function (exercises) {
                        exerciseList.exercises = exercises;
                        exerciseList.attributes.push('exercises')
                        async.forEach(exercises, function (exercise, newCallback) {
                            async.parallel([function (exerciseCallback) {

                                ExerciseList.conn.Exercise_model.getTags(exercise.id,
                                    function (tags) {
                                        exercise.tags = tags;
                                        exerciseCallback();
                                    }
                                )
                            }, function (exerciseCallback) {
                                ExerciseList.conn.Exercise_model.getPrescribedInfo(exercise.exerciselistexerciseid, function (values) {
                                    exercise.prescriptionData = values;
                                    exerciseCallback();
                                })
                            }], function () {
                                newCallback();
                            })
                        }, function (error) {
                            callback(null, exercises)
                        })
                    })
                },
                function (callback) {
                    ExerciseList.conn.User_model.find({where:{id:exerciseList.PractitionerId}}).success(function (practitioner) {
                        ExerciseList.conn.Clinic_model.find({where:{id:practitioner.ClinicId}}).success(function (clinic) {
                            if (practitioner.attributes) {
                                practitioner.attributes.push('clinic')
                            }
                            practitioner.clinic = clinic
                            callback(null, practitioner)
                        }).error(function (error) {
                                callback(error, null)
                            })

                    }).error(function (error) {
                            callback(error, null)
                        })
                }
            ], function (error, results) {
                if (!error) {
                    exerciseList.exercises = results[0]
                    if (exerciseList.attributes) {
                        exerciseList.attributes.push('exercises')
                    }
                    exerciseList.practitioner = results[1]
                    if (exerciseList.attributes) {
                        exerciseList.attributes.push('practitioner')
                    }
                    done(exerciseList)
                }
                else {
                    console.log(error)
                    done({error:"An error has occurred"})
                }
            })
        }else{
            done({error:"An error has occurred"})
        }}).error(function (error) {
            console.log(error)
            done({error:"An error has occurred"})
        })
}

ExerciseList.prototype.getTemplate = function(templateId, done){
    ExerciseList.prototype.getExerciseList(templateId, function(result){
        if (result.practitionerId == result.patientId){
            done(result)
        }
        else{
            done({error:"An error has occurred"});
        }
    });
}

ExerciseList.prototype.getExerciseList = function (exerciseListId, done) {
ExerciseList.conn.ExerciseList_model.find({where:{id:exerciseListId}}).success(function (exerciseList) {
    if(exerciseList){
    async.parallel([
            function (callback) {
                ExerciseList.conn.ExerciseList_model.getExercises(exerciseList.id, function (exercises) {
                    exerciseList.exercises = exercises;
                    exerciseList.attributes.push('exercises')
                    async.forEach(exercises, function (exercise, newCallback) {
                        async.parallel([function (exerciseCallback) {
                            ExerciseList.conn.Exercise_model.getTags(exercise.id, function (tags) {
                                    exercise.tags = tags;
                                    exerciseCallback();
                            })
                        }, function (exerciseCallback) {
                            ExerciseList.conn.Exercise_model.getPrescriptionData(exercise.id, function(data){
                                var prescriptions = []
                                for(var i = 0; i < data.length; i++){
                                    if(data[i]){
                                        if(JSON.stringify(prescriptions).indexOf(JSON.stringify(data[i].name)) == -1){
                                            prescriptions.push({name: data[i].name,
                                                sentence: data[i].sentence
                                                , values: [data[i].value]
                                                , id: data[i].id})
                                        }else{
                                            for(var p in prescriptions){
                                                if(prescriptions[p].name == data[i].name){
                                                    prescriptions[p].values.push(data[i].value)
                                                }
                                            }
                                        }
                                    }
                                }
                                exercise.prescriptionData = prescriptions;
                                ExerciseList.conn.Exercise_model.getPrescribedInfo(exercise.exerciselistexerciseid, function (values) {
                                    for(var i in values){
                                        for(var p in exercise.prescriptionData){
                                            if(values[i].id == exercise.prescriptionData[p].id){
                                                exercise.prescriptionData[p].value = values[i].value
                                            }
                                        }
                                    }
                                    exerciseCallback();
                                })
                            })
                        }], function () {
                            newCallback();
                        })
                    }, function (error) {
                        callback(null, exercises)
                    })
                })
            },
            function (callback) {
                ExerciseList.conn.User_model.find({where:{id:exerciseList.PractitionerId}}).success(function (practitioner) {
                    ExerciseList.conn.Clinic_model.find({where:{id:practitioner.ClinicId}}).success(function (clinic) {
                        if (practitioner.attributes) {
                            practitioner.attributes.push('clinic')
                        }
                        practitioner.clinic = clinic
                        callback(null, practitioner)
                    }).error(function (error) {
                            callback(error, null)
                        })

                }).error(function (error) {
                        callback(error, null)
                    })
            }
        ], function (error, results) {
            if (!error) {
                exerciseList.exercises = results[0]
                if (exerciseList.attributes) {
                    exerciseList.attributes.push('exercises')
                }
                exerciseList.practitioner = results[1]
                if (exerciseList.attributes) {
                    exerciseList.attributes.push('practitioner')
                }
                done(exerciseList)
            }
            else {
                console.log(error)
                done({error:"An error has occurred"})
            }
        })
}else{
        done({error:"ExerciseList not found"})
    }
}).error(function (error) {
            console.log(error)
            done({error:"An error has occurred"})
        })

}

ExerciseList.prototype.deleteTemplateByPractitioner = function (templateId, userId, done) {
    if (userId && templateId) {
        ExerciseList.conn.ExerciseList_model.find({
            where:{id:templateId, PractitionerId:userId, status:"Template"}
        }).success(function (template) {
                template.destroy().success(function () {
                    done({response:"success"})
                }).error(function (error) {
                        done({error:"An error occurred"})
                    })
            })
    }
    else {
        done({error:"An error occurred"})
    }
}

ExerciseList.prototype.deleteTemplate = function (templateId, done) {
    if (templateId) {
        ExerciseList.conn.ExerciseList_model.find({
            where:{id:templateId, status:"Template"}
        }).success(function (template) {
                if (template.practitionerId == template.patientId){
                    template.destroy().success(function () {
                        done({response:"success"})
                    }).error(function (error) {
                            done({error:"An error occurred"})
                        })
                }
                else{
                    done({error:"An error occurred"})
                }

            })
    }
    else {
        done({error:"An error occurred"})
    }
}

module.exports = ExerciseList