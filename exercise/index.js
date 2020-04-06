var async = require('async')

function Exercise(model) {
    Exercise.conn = model
}

Exercise.prototype.conn;

Exercise.prototype.getAllExercises = function (done) {
    var query = Exercise.conn.Exercise_model.findAll().success(function (exercises) {
        async.forEach(exercises, function (exercise, callback) {
            async.parallel([
            function(exerciseCallback){
                exercise.getTags().success(function (tags) {
                    exercise.tags = tags;
                    exercise.attributes.push('tags')
                    exerciseCallback();
                }).error(exerciseCallback)
            },
             function(exerciseCallback){
                 Exercise.conn.Exercise_model.getPrescriptionData(exercise.id, function(data){
                     var prescriptions = []
                     for(var i = 0; i < data.length; i++){
                         if(data[i]){
                        if(JSON.stringify(prescriptions).indexOf(JSON.stringify(data[i].name)) == -1){
                            prescriptions.push({name: data[i].name
                            , sentence: data[i].sentence
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
                     exercise.attributes.push('prescriptionData');
                     exerciseCallback();
                 })
             }], function(){
                callback();
            })
        }, function (err) {
            if (err) {
                console.log(err)
                done({error:"An error has occurred"})
            }
            else {
                done(exercises)
            }
        });
    })
};

Exercise.prototype.getExerciseByUserId = function (userId, done) {
    Exercise.conn.Exercise_model.getExercisesByUserId(userId, function(exercises){
        async.forEach(exercises, function (exercise, callback) {
            async.parallel([
                function(exerciseCallback) {
                    Exercise.conn.Exercise_model.getTags(exercise.id, function(tags) {
                        exercise.tags = tags;
                        exerciseCallback();
                    });
                },
                function(exerciseCallback) {
                    Exercise.conn.Exercise_model.getPrescriptionData(exercise.id, function(data) {
                        var prescriptionList = [];

                        data.forEach(function(prescription){
                            var result = prescriptionList.filter(function(item){
                                            return (item.id == prescription.id);
                                         });

                            // exist in the list
                            if (result.length > 0 ) {
                                result[0].values.push(prescription.value);
                            }
                            else {
                                var object = {
                                    "name": prescription.name,
                                    "sentence": prescription.sentence ,
                                    "values":[prescription.value],
                                    "id": prescription.id
                                }
                                prescriptionList.push(object);
                            }
                        });
                        exercise.prescriptionData = prescriptionList;
                        exerciseCallback();
                    });
                }
            ], function(){
                callback();
            });
        }, function (err) {
            if (err) {
                console.log(err);
                done({error:"An error has occurred"})
            }
            else {
                done({data: exercises});
            }
        });
    },
    function(error){

    });
};

Exercise.prototype.createExercise = function(body, done){
    Exercise.conn.Exercise_model
    .create({
        name: body.name,
        videoMp4: body.videoUrl,
        thumbnail: body.thumbnail,
        description: body.description,
        videoLength: body.videoLength,
        userId: body.userId
    })
    .then(function(exercise) {
        done(exercise);
    });
};

Exercise.prototype.saveExercise = function (body, done) {
    if (body.id) {
        Exercise.conn.Exercise_model.find(body.id)
            .success(function (exercise) {
                if(exercise){
                exercise.name = body.name
                exercise.videoNumber = body.videoNumber
                exercise.description = body.description
                exercise.tags = body.tags
                exercise.save().success(function (exercise) {
                    done(exercise)
                })
                }else{
                    done({error:"Can not find exercise"})
                }
            }).error(function(error){
                console.log(error)
                done({error:"An error has occurred"})
            })
    }
    else {
        var exercise = Exercise.conn.Exercise_model.build(body)
        exercise.save().success(function (savedExercise) {
            done(savedExercise)
        }).error(function (error) {
            done({error:"An error has occurred"})
        })
    }
};

Exercise.prototype.addExerciseTags = function (body, done) {
    var exerciseId = body.exerciseId;
    var tags = body.tags;
    var exerciseTags = [];

    async.forEach(tags, function (tag, callback) {
        async.parallel([
            function(exerciseCallback) {
                Exercise.conn.Exercise_model.setExercisesTags({exerciseId: exerciseId, tagId: tag}, function(exerciseTag){
                    Exercise.conn.Tag_model.findAll({ where: { id: tag} }) .success(function (resultTag) {
                        exerciseTags.push(resultTag);
                        exerciseCallback();
                    })
                });
            }
        ], function(){
            callback();
        });
    }, function (err) {
        if (err) {
            console.log(err);
            done({error:"An error has occurred"})
        }
        else {
            var result = {
                data: []
            };

            exerciseTags.forEach(function(exerciseTag){
                result.data.push(exerciseTag[0]);
            });

            done({data: result});
        }
    });
};

Exercise.prototype.addExercisePrescriptionInfoes = function (body, done) {
    var exerciseId = body.exerciseId;
    var prescriptionInfoes = body.prescriptionInfoes;
    var infoList = [];

    async.forEach(prescriptionInfoes, function (prescriptionInfo, callback) {
        async.parallel([
            function(exerciseCallback) {
                Exercise.conn.Exercise_model.setExercisePrescriptionInfo({exerciseId: exerciseId, prescriptionInfoId: prescriptionInfo}, function(exPreInfo){
                    Exercise.conn.Exercise_model.getPrescriptionInfoData(prescriptionInfo, function(prescriptionList){
                        var prescription = {
                            id: prescriptionList[0].id,
                            name: prescriptionList[0].name,
                            sentence: prescriptionList[0].sentence
                        };
                        var values = [];
                        prescriptionList.forEach(function(item){
                            values.push(item.value);
                        });

                        prescription.values = values;
                        infoList.push(prescription);
                        exerciseCallback();
                    });
                });
            }
        ], function(){
            callback();
        });
    }, function (err) {
        console.log("Reach");

        if (err) {
            console.log(err);
            done({error:"An error has occurred"})
        }
        else {
            var result = {
                data: infoList
            };

            done(result);
        }
    });
};

Exercise.prototype.getExercise = function (id, done) {
    Exercise.conn.Exercise_model.find(id).success(function (exercise) {
        done(exercise)
    }).error(function (error) {
            done({error:"An error has occurred"})
        })
};

module.exports = Exercise;