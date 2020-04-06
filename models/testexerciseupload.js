var db = require('./index.js')
    , Config = require('../config/config.js')
    , async = require('async')
    , config = new Config()
    , Sequelize = require('sequelize')
    , sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {host:config.database.host, dialect:config.database.dialect, port:config.database.port, logging:console.log})
    , db = new db(sequelize)

module.exports = function () {
	// console.log('++++++++++++++++++++++++');
	this.newExerciseObjectsTwo = function (done) {
        async.series([
        	function (callback) {
                db.Clinic_model.sync().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
                db.User_model.sync().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
                db.Tag_model.sync().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
                db.Exercise_model.sync().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
                db.ExerciseList_model.sync().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.PrescriptionInfo_model.sync().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.sync().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.PrescriptionInfoValue_model.sync().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:'Active ROM Circumduction', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Active+Range+Circumdation+ankle-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Active+Range+Circumdation+ankle-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/active-rom-circumduction.png', description:'Begin seated with the indicated leg held up off the floor.  Slowly roll your foot clockwise in a circular motion. You may also roll your foot anti-clockwise.  Perform as prescribed.', videoLength:'5138008'
                }).save().success(function (exercise) { 
                        db.Tag_model.findAll({where:{name:['Lower Legs', 'Strengthen', 'Stretch', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side', 'Range of Motion']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            }], function () {
            // done();
        })
    }

    // this.syncDB = function (done) {
    //     async.series([
    //         function (callback) {
    //             db.Clinic_model.sync().success(function (data) {
    //                 callback(null, data)
    //             }).error(function (error) {
    //                     callback(error, null)
    //                 })
    //         }, function (callback) {
    //             db.User_model.sync().success(function (data) {
    //                 callback(null, data)
    //             }).error(function (error) {
    //                     callback(error, null)
    //                 })
    //         }, function (callback) {
    //             db.Tag_model.sync().success(function (data) {
    //                 callback(null, data)
    //             }).error(function (error) {
    //                     callback(error, null)
    //                 })
    //         }
    //         , function (callback) {
    //             db.Exercise_model.sync().success(function (data) {
    //                 callback(null, data)
    //             }).error(function (error) {
    //                     callback(error, null)
    //                 })
    //         }, function (callback) {
    //             db.ExerciseList_model.sync().success(function (data) {
    //                 callback(null, data)
    //             }).error(function (error) {
    //                     callback(error, null)
    //                 })
    //         },
    //         function (callback) {
    //             db.PrescriptionInfo_model.sync().success(function (data) {
    //                 callback(null, data)
    //             }).error(function (error) {
    //                     callback(error, null)
    //                 })
    //         },
    //         function (callback) {
    //             db.PrescriptionInfoDefault_model.sync().success(function (data) {
    //                 callback(null, data)
    //             }).error(function (error) {
    //                     callback(error, null)
    //                 })
    //         },
    //         function (callback) {
    //             db.PrescriptionInfoValue_model.sync().success(function (data) {
    //                 callback(null, data)
    //             }).error(function (error) {
    //                     callback(error, null)
    //                 })
    //         }
    //     ], function (errors, results) {
    //         done();
    //     })
    //}

    return this;
}
// module.exports().syncDB();
module.exports().newExerciseObjectsTwo();