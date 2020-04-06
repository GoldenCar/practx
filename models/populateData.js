var db = require('./index.js')
    , Config = require('../config/config.js')
    , async = require('async')
    , config = new Config()
    , Sequelize = require('sequelize')
    , sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {host:config.database.host, dialect:config.database.dialect, port:config.database.port, logging:console.log})
    , db = new db(sequelize)

module.exports = function () {
    this.newUserObjects = function (done) {
        async.series([
            function (callback) {
                db.User_model.build({
                    name:"Thomas Bunting",
                    email:"thomas1bunting@gmail.com",
                    phone:"0435519322",
                    emailText:"Here is the new email text",
                    photo:"No Photo to Display",
                    permission:"None",
                    ClinicId:1
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.User_model.build({
                    name:"Myriam Lambert",
                    email:"Thomas.bunting@industrieIT.com",
                    phone:"0435519322",
                    emailText:"Here is the new email text",
                    photo:"No Photo to Display",
                    permission:"Admin",
                    authicId:10,
                    ClinicId:3 }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.User_model.build({
                    name:"Foo Barr",
                    email:"thomas.bunting2@facebook.com",
                    phone:"0435519322",
                    emailText:"Here is the new email text",
                    photo:"No Photo to Display",
                    permission:"Practitioner",
                    authicId:28,
                    ClinicId:2
                }).save().success(function () {
                        callback();
                    })
            }], function () {
            done();
        })
    }

    this.newClinicObjects = function (done) {
        async.series([
            function (callback) {
                db.Clinic_model.build({
                    name:"IndustrieIT",
                    address:"2 tea Tree Place",
                    phone:"0435519322",
                    website:"https://d2bjomctld7cul.cloudfront.net/thumbnails/lady_image.png"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.Clinic_model.build({
                    name:"ZOOKD",
                    address:"Zookd",
                    phone:"0123456789",
                    website:"http://www.industrieit.com"
                }).save().success(function () {
                        callback();
                    })
            }], function () {
            done();
        })
    }

    this.newExerciseListObjects = function (done) {
        async.series([
            function (callback) {
                db.ExerciseList_model.build({
                    name:"Neck Exercises",
                    emailText:"here is a new exercise text",
                    PatientId:1,
                    PractitionerId:3
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfo_model.build({
                    name:"Rep",
                    sentence: "scfsdfsd"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoValue_model.build({
                    value:"1",
                    ExerciseListsExerciseId:1,
                    PrescriptionInfoId:1
                }).save().success(function () {
                        callback();
                    })
            }], function () {
            done();
        })
    }


    this.newTemplateObjects = function (done) {
        async.series([
            function (callback) {
                db.ExerciseList_model.build({
                    name:"Neck Exercises",
                    emailText:"here is a new exercise text",
                    PractitionerId:3,
                    PatientId:3,
                    status: "Template"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.ExerciseList_model.build({
                    name:"Other Exercises",
                    emailText:"here is a other exercise text",
                    PractitionerId:3,
                    PatientId:3,
                    status: "Template"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.ExerciseListExercise_model.build({
                    ExerciseListId: 1,
                    ExerciseId: 58
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.ExerciseListExercise_model.build({
                    ExerciseListId: 1,
                    ExerciseId: 33
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.ExerciseListExercise_model.build({
                    ExerciseListId: 1,
                    ExerciseId: 80
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.ExerciseListExercise_model.build({
                    ExerciseListId: 2,
                    ExerciseId: 22
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.ExerciseListExercise_model.build({
                    ExerciseListId: 2,
                    ExerciseId: 43
                }).save().success(function () {
                        callback();
                    })
            },

            function (callback) {
                db.ExerciseListExercise_model.build({
                    ExerciseListId: 2,
                    ExerciseId: 1
                }).save().success(function () {
                        callback();
                    })
            },

            function (callback) {
                db.PrescriptionInfoValue_model.build({
                    value:'30',
                    ExerciseListsExerciseId:1,
                    PrescriptionInfoId:3
                }).save().success(function () {
                        callback();
                    })
            }], function () {
            done();
        })
    }

    this.newPrescriptionObjects = function (done) {
        async.series([
            function (callback) {
                db.PrescriptionInfo_model.build({
                    name:"Repetitions",
                    sentence: "Reps"
                }).save().success(function () {
                        callback();
                    })
            },function (callback) {
                db.PrescriptionInfo_model.build({
                    name:"Sets",
                    sentence: "Sets"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.PrescriptionInfo_model.build({
                    name:"Frequency (per day)",
                    sentence: "x Per Day"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfo_model.build({
                    name:"Duration (secs)",
                    sentence: "Seconds"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfo_model.build({
                    name:"Resistance",
                    sentence: "Resistance"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfo_model.build({
                    name:"Range of Motion",
                    sentence: "Range of Motion"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfo_model.build({
                    name:"Side",
                    sentence: "Side(s)"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfo_model.build({
                    name:"Comments",
                    sentence: ""
                }).save().success(function () {
                        callback();
                    })
            }, function(){
                done();
            }])
    }

    this.newPrescriptionDefaultObjects = function (done) {
        async.series([
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"6",
                    PrescriptionInfoId:"1"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"8",
                    PrescriptionInfoId:"1"
                }).save().success(function () {
                        callback();
                    })
            }
            ,
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"12",
                    PrescriptionInfoId:"1"
                }).save().success(function () {
                        callback();
                    })
            }
            ,
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"20",
                    PrescriptionInfoId:"1"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"1",
                    PrescriptionInfoId:"3"
                }).save().success(function () {
                        callback();
                    })
            }
            ,
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"2",
                    PrescriptionInfoId:"3"
                }).save().success(function () {
                        callback();
                    })
            }
            ,
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"3",
                    PrescriptionInfoId:"3"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"4",
                    PrescriptionInfoId:"3"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"5",
                    PrescriptionInfoId:"4"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"15",
                    PrescriptionInfoId:"4"
                }).save().success(function () {
                        callback();
                    })
            }
            ,
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"30",
                    PrescriptionInfoId:"4"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"45",
                    PrescriptionInfoId:"4"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"1",
                    PrescriptionInfoId:"2"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"2",
                    PrescriptionInfoId:"2"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"3",
                    PrescriptionInfoId:"2"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"4",
                    PrescriptionInfoId:"2"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"Easy",
                    PrescriptionInfoId:"5"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"Medium",
                    PrescriptionInfoId:"5"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"Hard",
                    PrescriptionInfoId:"5"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"Left",
                    PrescriptionInfoId:"7"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"Right",
                    PrescriptionInfoId:"7"
                }).save().success(function () {
                        callback();
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.build({
                    value:"Both",
                    PrescriptionInfoId:"7"
                }).save().success(function () {
                        callback();
                    })
            }
        ], function () {
            done();
        })
    }

    this.newTagObjects = function (done) {
        async.series([
            function (callback) {
                db.Tag_model.build({
                    name:"Stretch"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.Tag_model.build({
                    name:"Strengthen"
                }).save().success(function () {
                        callback();
                    })
            }
            , function (callback) {
                db.Tag_model.build({
                    name:"Neck"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.Tag_model.build({
                    name:"Back"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.Tag_model.build({
                    name:"Shoulder"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.Tag_model.build({
                    name:"Upper Arm"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.Tag_model.build({
                    name:"Chest"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.Tag_model.build({
                    name:"Lower Arm"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.Tag_model.build({
                    name:"Gluets"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.Tag_model.build({
                    name:"Upper Legs"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.Tag_model.build({
                    name:"Lower Legs"
                }).save().success(function () {
                        callback();
                    })
            }
            , function (callback) {
                db.Tag_model.build({
                    name:"Anterior"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.Tag_model.build({
                    name:"Posterior"
                }).save().success(function () {
                        callback();
                    })
            }, function (callback) {
                db.Tag_model.build({
                    name:"Abdomen"
                }).save().success(function () {
                        callback();
                    })
            }], function () {
            done();
        })
    }

    this.newExerciseObjects = function (done) {
        async.series([
            function (callback) {
                db.Exercise_model.build({
                    name:"Scalenes Anterior", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/scalenes-anterior.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/scalenes-anterior.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/scalenes-anterior.png", description:"Whilst upright, rotate your head away to the left and slowly look behind yourself tilting your head backwards.  To increase the stretch use your left hand to gently hold down your chest. Alternatively, you may anchor your right arm down. You should feel this stretch on the side of your neck towards the midline or front.  If you begin to feel dizzy or nauseas stop immediately.  Hold for the prescibed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Neck', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Scalenes Posterior",videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/scalenes-posterior.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/scalenes-posterior.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/scalenes-posterior.png", description:"Whilst upright, rotate your head away to the left and gently look towards your left armpit.  You may also use your left arm to gently pull your head away.  Remember to avoid compressing your neck.   To further increase the stretch you may hold your breath out.  This stretch will be felt to the side of your neck towards the back. Hold for the prescibed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Neck', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Cervial Spine - Rotation", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/neck-rotation.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/neck-rotation.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/neck-rotation.png", description:"In an upright position, rotate your head to the left.     Be sure not to bend your neck or tilt your head.  You should feel this stretch on your right side. Hold for the prescibed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Neck', 'Anterior', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Cervical Spine - Sidebending", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/neck-side-bending.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/neck-side-bending.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/neck-side-bending.png", description:"In an upright position, bend your neck towards the left.  Try not to turn your neck.  You should feel this stretch on your right side. To increase the stretch gently anchor down your right arm. Hold the stretch as prescribed.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Neck', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Levator Scapulae", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/levator-scapulae.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/levator-scapulae.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/levator-scapulae.png", description:"Whilst upright, bend your neck away to the left and then look towards the ground.  To increase the stretch,  use your left arm to gently pull your head forward.  You can also slightly depress your right shoulder. Remember to avoid compressing your neck. You will notice the stretch at the back of the neck and towards the shoulder blade. Hold the stretch as prescribed by your therapist.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Neck', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Trapezius - Unilateral", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/trapezius-one-side.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/trapezius-one-side.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/trapezius-one-side.png", description:"To stretch the right side, place your right arm behind your back.  Bend your neck to the left, looking down slightly.  Use your left arm to gently pull your head forward. Be careful not to compress your neck.  This stretches the right side of your neck towards the back. Hold for the prescibed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Neck', 'Shoulder', 'Back', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Upper Trapezius - Bilateral", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/upper-trapezius.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/upper-trapezius.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/upper-trapezius.png", description:"Stand upright and look towards the ground.  Place both of your hands on the back of your head. Gently pull your head towards the ground.  Be cautious not to compress your neck.  This stretch is felt at the back of your neck. Hold this stretch for the prescribed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Neck', 'Shoulder', 'Back', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Anterior Cervial Fascia", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/anterior-cervical-fascia.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/anterior-cervical-fascia.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/anterior-cervical-fascia.png", description:"Whilst upright, tilt your head backwards. Then use both hands to hold down your chest. You should only feel this stretch through the front of your neck.  If you begin to feel dizzy or nauseas stop immediately.  Hold this stretch for the prescribed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Neck', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Stenocleidomastoid - SCM", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/scm.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/scm.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/scm.png", description:"Whilst upright, look in an upwards direction. Gently start to look away to the left.  Slightly tilt your head back. If necessary to further increase the stretch, use your left arm to gently hold down your chest. The stretch should be noticed at the front and side of the neck only.  If you begin to feel dizzy or nauseas stop immediately.  Hold this stretch for the prescribed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Neck', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Deltoids - Posterior Capsule", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-post-capsule.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-post-capsule.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/deltoids-post-capsule.png", description:"In an upright position, place your right arm in front and across your body.  Using your left arm gently pull the right arm towards you. This stretch should be localised to the back of your shoulder. Hold this position for the prescribed amount of time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Shoulder', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Shoulder - Inferior Capsule", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-inferior-capsule.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-inferior-capsule.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/deltoids-inferior-capsule.png", description:"Start in an upright position.  Place your right arm on or towards your right shoulder blade. Raise your right elbow upwards.  Using the left arm add a slight pressure to the elbow, thus increasing the stretch.  This stretch will be felt on the under and outer surface of your armpit. Hold this stretch for the prescribed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Shoulder', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Rotator Cuff", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/rotator-cuff.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/rotator-cuff.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/rotator-cuff.png", description:"Start in an upright position.  Place your right arm behind your head towards your left shoulder blade.  Using your left arm, gently pull your elbow towards the left. Stretching this muscle group will be felt at the outer back surface of your right shoulder. Hold this stretch for the prescribed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Shoulder', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Biceps Brachii", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/biceps-brachii.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/biceps-brachii.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/biceps-brachii.png", description:"Straighten your right arm out infront of you with your palm facing up. Using your left hand,  hold your fingers and palm and bend your hand downwards.  Then, very slightly rotate your right hand so that your fingers point inwards.  This stretch should be felt from your elbow to the middle of the arm and through your biceps. Maintain this position for the required time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Upper Arm', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Pectoralis Major / Minor", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/pectoralis-major-minor.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/pectoralis-major-minor.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/pectoralis-major-minor.png", description:"Place your right arm against a wall or door frame.  Using your body weight and keeping upright,  lean forward until a stretch is felt. You may modify the intensity of this technique by lowering or raising your right arm until the stretch is noticable.  This should be felt through the  right chest muscle and front of your right shoulder.  Hold this position for the prescribed time", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Chest', 'Shoulder', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Latismus Dorsi", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/lat-stretch.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/lat-stretch.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/lat-stretch.png", description:"Stand upright and reach out with both of your hands, keeping them held together.  Bend your knees slightly and slowly lean forward.  Now push your hands away from your body feeling the stretch under your arms and towards the armpits.  This may be done seated.  Hold this stretch for the prescribed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Shoulder', 'Back', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Forearm Flexors", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/forearm-flexors.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/forearm-flexors.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/forearm-flexors.png", description:"Extend your right arm out in front of you palm up. Using your left hand, hold your right hand and bend your wrist back. To increase the stretch  you could rotate you arm slightly and slowly, in either direction. The stretch should be felt through the top facing surface of your forearm.  Hold as prescribed.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Lower Arm', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Forearm Extensors", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/forearm-extensors.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/forearm-extensors.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/forearm-extensors.png", description:"Extend your right arm out in front of you.  Using your left hand, bend your wrist down to the floor.  You may increase the stretch by rotating your arm slightly in either direction. This stretch should be felt on the top surface of your forearm to the elbow. Hold the strecth for the prescribed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Lower Arm', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Finger Flexors", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/finger-flexors.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/finger-flexors.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/finger-flexors.png", description:"Join both of your hands then, slowly separate your palms keeping your fingers touching whilst pushing your fingers together. This should be felt on the  inner surface of all of your fingers. Hold as prescribed by your therapist.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Lower Arm', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Lumbar Spine Flexion", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/lumbar-spine-flexion.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/lumbar-spine-flexion.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/lumbar-spine-flexion.png", description:"Stand upright with your feet hip width apart.  Slowly bend forwards. Keeping your knees straight attempt to touch your toes.  Reach as far as is comfortable. This should be felt at the low back and back of your upper thighs. Hold this stretch for the prescribed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Upper Legs', 'Posterior', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Quadratus Lumborum",videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/lumbar-spine-side-flexion.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/lumbar-spine-side-flexion.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/lumbar-spine-side-flexion.png", description:" Stand upright with your feet hip width apart.  Slowly bend forwards and to your left foot.  Reach as far as is comfortable. This stretch will be felt at your right side of your low back. Hold the strecth for the prescribed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Upper Legs', 'Posterior', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Lumbar Spine Sidebending", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/lumbar-spine-side-bending.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/lumbar-spine-side-bending.webm",thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/lumbar-spine-side-bending.png", description:"Stand upright with your feet hip width apart.  Raise your right arm above your head and lean  towards the left. Make sure you do not rotate your torso. This stretch will be felt on your right side.  Hold the strecth for the requested time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Lunge", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/lunge.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/lunge.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/lunge.png", description:"Standing with your feet shoulder width apart, take one step forward and slightly outward with your right leg. Now, keeping the right foot firmly on the ground,  bend your knees whilst keeping your torso upright.  Stop your left knee before it hits the ground.  Begin to stand upright again by using your right leg to push your body upwards. Repeat in a fluid motion as prescribed.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Posterior', 'Anterior', 'Upper Legs', 'Lower Legs', 'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Neck Retraction",videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/neck-retraction.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/neck-retraction.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/neck-retraction.png", description:"Make sure you are in an upright position.  Place your tongue on the roof of your mouth.  Slowly glide your head backwards and hold for 2-3 seconds.  Then bring your head back to the start position.  Be cautious not to tilt your head up or down. Repeat as prescribed.  You should feel this at the back of your neck.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Posterior', 'Neck']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Squat", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/squat.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/squat.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/squat.png", description:"Stand upright with your feet pointing forward, slightly wider than your hips. Begin to bend your knees, leading with your bottom so that you begin to squat. Keep your arms out in front of you for balance and keep your heels on the ground. Get as low as you feel is comfortable.  Then, pushing through your heels,  begin to straighten your legs returning to the upright position.  Repeat as necessary. You may include some weights or dumbbells for increased resistance.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Posterior', 'Anterior', 'Upper Legs', 'Lower Legs', 'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Range of Motion']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Rotator Cuff - Assisted With Towel", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/rotator-cuff-stretch.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/rotator-cuff-stretch.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/rotator-cuff-stretch.png", description:"Holding a towel with your left hand, place it behind your back.  Grab the towel with your right hand.  Using the strength of your left arm pull in an upwards direction. This will increase the stretch on the back right shoulder blade. Hold this position for as prescribed", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Shoulder']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Duration (secs)', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Hamstring", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/hamstring-stretch-standing.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/hamstring-stretch-standing.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/hamstring-stretch-standing.png", description:"Stand close to a low level object such as a chair or coffee table.  Make sure you are facing it with both feet.  Place your right foot on the table and gently lean forward.  You may slightly push down with your right foot to increase the stretch.  Be cautious not to bend your back excessively.  This stretch should be felt in the back of the leg. Hold this stretch for the requested time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Duration (secs)', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Gastrocnemius - Step",videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/calf-stretch-step.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/calf-stretch-step.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/calf-stretch-step.png", description:"Stand with your feet off the edge of a step.  Keeping your left foot still, slowly lower your right heel off the step towards the ground. This stretch will be felt at the back of your lower leg and towards the back of your ankle. Hold this position for the required time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Lower Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Duration (secs)', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Adductors", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/adductor-longus.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/adductor-longus.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/adductor-longus.png", description:"Stand facing a chair and place your right leg up on the chair. Maintain an upright posture.  Keeping your right foot pointing upwards, rotate your body to the left.  Gently push your right heel into the chair and notice the stretch through your inner thigh.  Hold this position for the requested time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Anterior', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Duration (secs)', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Calf Raise", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/calf-raises.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/calf-raises.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/calf-raises.png", description:"Stand on a step with your left heel over the edge in an upright position.  Let your right heel hang off the edge, then slowly stand on your left toes.  Repeat as necessary.   This exercise should be felt in the calf muscle or at the back of your lower leg.  It is also possible to perform this exercise with both legs at the same time as demonstrated.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Posterior', 'Lower Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Gluet Stretch Seated",videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/glute-stretch-seated.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/glute-stretch-seated.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/glute-stretch-seated.png", description:"Whilst seated, cross you right leg over your left placing your heel/foot on the floor or a chair.  Using your left arm, hold onto your knee and pull it towards you whilst simultaneously rotating your torso to the right.  This should be felt in the right buttock.  Hold the stretch for the requested time.  ", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Duration (secs)', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Tibialis Posterior", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/tibialis-posterior.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/tibialis-posterior.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/tibialis-posterior.png", description:"Sitting down, cross your right leg over your left knee and bring your foot towards you and using your left hand anchor your heel.  Using your right hand, hold the top of your toes and pull them towards your shin.  This stretch is felt on the back part of your lower leg.  Hold this for the prescibed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Lower Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Duration (secs)', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Tibialis Anterior", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/tibialis-anterior.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/tibialis-anterior.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/tibialis-anterior.png", description:"Sitting down, cross your right leg over your left knee and bring your foot towards you. Using your left hand, hold the top of your foot and pull it upwards and towards you.  This stretch is felt on the front of your lower leg.  Maintain this position for the requested time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Anterior', 'Lower Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Duration (secs)', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Plantar Fascia", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/plantar-fascia-stretch.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/plantar-fascia-stretch.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/plantar-fascia-stretch.png", description:"In a seated position without shoes on, position a golf ball or a firm round ball underneath your foot.  Gently apply enough downwards pressure so that a moderate stretch sensation is felt.  Continue to roll your foot, in even foreward and backwards motions to massage the bottom of your foot.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Anterior', 'Lower Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Duration (secs)', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Abdominal Brace", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/adbominal-brace-seated.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/adbominal-brace-seated.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/adbominal-brace-seated.png", description:"Sitting upright, make sure your head and neck is positioned over your shoulders.  Without holding your breath or using breathing,  try to draw your stomach towards your spine. Minimise the movement of your spine and feel your stomach muscles tighten.   Your belly button should feel like it is now closer to your back.  Hold and reapeat as prescribed.   Remember to use this position to improve your seated posture. ", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Abdomen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Duration (secs)', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Gluet Medius / TFL", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/glute-medius-tfl.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/glute-medius-tfl.webm",thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/glute-medius-tfl.png", description:"Supporting your bodyweight against a wall or chair, cross your left leg over your right foot.    Maintain an upright posture and slowly lean towards the left whilst pushing your right hip towards the wall.  This stretch is felt through your  right outer hip and thigh.  Hold  this position as presrcibed.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Anterior', 'Posterior','Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Quadricep", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/quadriceps-stretch.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/quadriceps-stretch.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/quadriceps-stretch.png", description:"Stand upright with a wall or support close by.  Whilst holding on with the left arm, bend your right knee and reach around to hold your ankle.  Bring your knee backwards.  This should be felt on the front of your leg.  Hold the stretch for as long as prescribed.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Anterior', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Soleus", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/soleus-stretch-modified-calf.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/soleus-stretch-modified-calf.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/soleus-stretch-modified-calf.png", description:"Standing with your left leg in front, support your weight with a chair or wall. Lean forward with the hips, slightly bending your right knee whilst trying to keep your right foot on the ground.  This should be felt through the back of your lower leg.  Hold this position for the prescribed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Lower Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Calf", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/calf-stretch.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/calf-stretch.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/calf-stretch.png", description:"Stand facing a wall. Step your right foot back.  Press your hands against the wall and press your right heel down towards the ground. You will feel the stretch at the back of your lower leg.  Hold this stretch for the required time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Lower Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Lumbar Spine - Rotation", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/rotation-lumbar-spine.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/rotation-lumbar-spine.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/rotation-lumbar-spine.png", description:"Begin on your back. Bend your right knee and place your right foot over your left knee. Slowly lower your right knee to the ground. Use your right arm to increase the stretch. Keep your shoulders on the ground. To further increase the stretch, try straghtening your right leg. This should be felt through your lower back and buttock region.  Hold this position for the prescribed time.", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Back', 'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Lumbar Spine Knee Tuck", description:"Whilst lying on your back,  bend both of your knees.  Using your arms, pull your knees towards your chest.  Stretching in this case should be felt on both sides of the lower  back.  Hold this position for the allocated time.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/lumbar-spine-knee-tuck.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/lumbar-spine-knee-tuck.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/lumbar-spine-knee-tuck.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Back', 'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Lumbar Spine Extension", description:"Lying face down bring youself to your forearms. Then slowly arch your back and lift your body off the ground extending your spine.  Hold as prescribed by your therapist.  Take a deep breath in to increase the stretch.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/lumbar-spine-extension.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/lumbar-spine-extension.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/lumbar-spine-extension.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Anterior', 'Abdomen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Thoracic Spine Extension", description:"Place you hands and knees on the floor. Drop your belly and arch your back so that your chest pushes outwards and towards the floor.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/thoracic-spine-cat-stretch-extension.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/thoracic-spine-cat-stretch-extension.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/thoracic-spine-cat-stretch-extension.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Thoracic Spine Flexion", description:"Place your hands and knees on the floor. Arch your back so that your chest drops to the floor.  Hold the stretch for the requested time.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/thoracic-spine-cat-stretch-flexion.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/thoracic-spine-cat-stretch-flexion.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/thoracic-spine-cat-stretch-flexion.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Hip Flexors", description:"Kneeling down,  place your left foot in front of you on the floor.  Gently lean forward keeping your torso upright.  To increase the stretch modify the position of the right foot by moving it away from your body.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/hip-flexors.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/hip-flexors.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/hip-flexors.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Anterior', 'Upper Legs', 'Abdomen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Adductors Seated", description:"Sitting on the floor, bend your knees and place your feet together in front of you. Gently pull your feet towards you and gently push down on your knees with your forearms.  You will notice the stretch through the inner groin. You may find this easier to do with the support of a wall behind you.  Hold this position for the requested time.",videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/adductors-seated.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/adductors-seated.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/adductors-seated.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Anterior', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Piriformis", description:"Lying on your back, bend your left knee.  Place your right foot over your left knee.  Using both of your hands, reach under your left knee and pull your knee towards you.  Use the strength of your left leg to assist.  This stretch is felt deep in the right buttock.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/piriformis.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/piriformis.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/piriformis.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Glueteal Stretch", description:"Kneeling on your hands and knees, swing both of your legs to the left.  Keeping the right leg still, take your left leg straight back behind you. Kneel forward. You will end up sitting on your right leg. This stretch will be felt deep in the right buttock. Hold the stretch as prescribed by your therapist.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/gluteal-stretch-kneeling.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/gluteal-stretch-kneeling.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/gluteal-stretch-kneeling.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Upper Legs', 'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Hamstring Supine", description:"Lie on your back. Slowly bend your right knee. Hold your thigh under your right knee and lift it up towards you.  Keep hold. Slowly straighten your right leg so it is pointing towards the ceiling.  Be sure to relax your shoulders and neck.  This stretch should be felt at the back of the leg or hamstring.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/hamstrings-stretch-supine-beginner.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/hamstrings-stretch-supine-beginner.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/hamstrings-stretch-supine-beginner.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Hamstring Supine Assisted", description:"Lie on your back and place towel as shown under your right ankle.  Use the strength of your leg and both arms to pull the towel towards you, raising your leg until a stretch is felt on the back of your leg between your hip and knee or your hamstring.  Hold this position for the prescribed time.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/hamstring-stretch-supine-towel.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/hamstring-stretch-supine-towel.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/hamstring-stretch-supine-towel.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },//
            function (callback) {
                db.Exercise_model.build({
                    name:"Thoracic Extension", description:"Roll a towel and place it on the floor under your upper back. Slowly lower yourself over the towel, so that your spine is rocking over the towel.  Extend your arms over your head. You will feel the towel pushing up against your spine. This stretch should be felt at the upper spine near the towel's location. Hold this position for the requested time period.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/thoracic-spine-rolled-towel.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/thoracic-spine-rolled-towel.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/thoracic-spine-rolled-towel.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Posterior', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },function (callback) {
                db.Exercise_model.build({
                    name:"Quadriceps Sidelying", description:"Begin by lying on your left side.  Reach back to grab your right ankle and gently pull your heel towards your back.  You should begin to feel the stretch on the front of your thigh.  Hold the stretch for the prescribed time.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/quadriceps-stretch-modified-sideling.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/quadriceps-stretch-modified-sideling.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/quadriceps-stretch-modified-sideling.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Anterior', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"ITB - TFL Foam Roller", description:"Lying on your left side, place a firm round object like a rolling pin or foam roller under your right outer thigh.  Support your body weight with your left forearm. Gently roll the foam roller back and forth against your outer leg from your hip to your knee.  repeat the motion for 30-45 seconds or as long as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/itb-tfl-foam-roller.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/itb-tfl-foam-roller.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/itb-tfl-foam-roller.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Anterior', 'Posterior', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments', 'Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Push Up", description:"Lie face down on your hands shoulder width apart and your legs extended out .  Ensure your body is straight and avoid arching your spine.  Slowly lower your body to the ground, then push up to return to the start position.  Make sure you are looking downwards.  Repeat as necessary.  For a beginner, modify this exercise by  kneeling.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/chest-push-up.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/chest-push-up.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/chest-push-up.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Chest', 'Shoulder']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Spine Extension - Superman", description:"Lying face down, extend your arms out in front of you.  Slowly lift your legs and arms off the ground, extending your spine.  Hold for 2 seconds, then relax.  Repeat as prescribed. ", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/superman.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/superman.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/superman.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Posterior', 'Back', 'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Crunch", description:"Lying on your back, bend your knees.  Reach around and support your neck. Be careful not to pull on it through the exercise.  Begin to lift your body off the ground, focusing the contraction on your abdominal area.  Repeat as prescibed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/crunch.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/crunch.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/crunch.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Abdomen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Sit Up", description:"Lying on your back, bend your knees.  Reach around and support your neck. Be careful not to pull on it through the exercise.  Begin to lift your body off the ground until you are sitting upright.  Repeat the exrecise  as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/sit-up.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/sit-up.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/sit-up.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Abdomen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Plank", description:"Lying face down, prop yourself up onto your forearms and feet as shown.  Keep your arms shoulder width apart and keep looking downwards.  Drawing your belly towards your spine, lift your pelvis off the ground, supporting your weight.  Hold this position as long as prescribed. ", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/plank.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/plank.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/plank.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior', 'Abdomen', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Sets', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Bridge", description:"Lying on your right side, bend your elbow and prop yourself up, leaning on your forearm.  Keeping your feet together,  lift your hips off the ground and try to keep your body in a straight line.  Attempt to draw in your belly or stomach so that it is taught. Hold this position as long as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/bridge.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/bridge.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/bridge.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Abdomen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Duration (secs)', 'Comments', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Cross Crawl", description:"Kneel on all fours, hips shoulder width apart and knees hip width apart.  Draw your belly inwards towards your spine.  At the same time extend one leg behind you and the opposite arm in front of you.  All whilst minimising movement at your hips and pelvis.  Remember to relax your neck and keep your stomach flat.  Repeat the action as directed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/cross-crawl.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/cross-crawl.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/cross-crawl.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Abdomen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Oblique Crunch", description:"Lie on your back with your knees bent. Reach around and support your neck. Be careful not to pull on it throughout the exercise. Lift your shoulders off the ground aiming to reach out in front of you and to the left knee.  You should feel a contraction on your front right side.  Repeat the exercise as prescribed.",videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/oblique-crunch.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/oblique-crunch.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/oblique-crunch.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Abdomen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Lumbar Rotation", description:"Lie on your back with your hips and knees bent.  Keeping your feet horizontal to the ground, raise your legs off the ground and place your arms out by your side with palms facing upward.  Begin to rotate your torso and knees towards the left side, stopping before hitting the ground. Slowly rotate back in the oppostie direction. Repeat as prescribed. ", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/wipers-low-back.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/wipers-low-back.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/wipers-low-back.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Posterior', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Leg Raise - Bilateral", description:"Lie on your back with your arms by your side and your  palms facing up. Tuck your belly in,  drawing your spine gently to the ground.  Start with slowly raising your legs up and stop where it is comfortable.  Relax and go back to the start position.  Repeat as prescribed.  If you feel any tingling, numbness or pain please consult with your therapist.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/leg-raise-bilateral.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/leg-raise-bilateral.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/leg-raise-bilateral.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Abdomen', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Single Leg Raises", description:"Lie on your back with your arms by your side and your palms facing upwards.  Begin by drawing in your stomach and gently flattening your spine against the ground. Begin to raise your right leg whilst keeping your leg straight.  Raise it up to a comfortable position  and relax.  Repeat as prescribed.  If you notice any tingling, numbness or pain stop and discuss with your health therapist.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/single-leg-raise.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/single-leg-raise.webm",thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/single-leg-raise.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Abdomen', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Bent Knee Leg Raises", description:"Begin by lying on your back with your arms by your side and your palms up.  Bend both of your knees so that your hips  are bent to 90 degrees and your knees are bent to 90 degrees, as shown.  Slowly start to straighten your right leg so that it comes close to the floor.  Without resting it on the ground,  return it to the start position.  Remember to keep the opposite leg at 90 degrees through the entire exercise.  The intensity of this exercise can be modified to include both legs at the same time as demonstrated.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/knee-bent-eg-raise-single.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/knee-bent-eg-raise-single.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/knee-bent-eg-raise-single.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Abdomen', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Bicycle - Leg Kick", description:"Begin by lying on your back with your arms by your side and your palms up.  Bend both your knees so that your hips are bent to 90 degrees and your knees are bent to 90 degrees, as shown.  Make sure you tighten your stomach muscles by flattening your belly towards your spine.  Slowly start to straighten your right leg so that it comes close to the floor and as you bring it back towards your torso, begin to lower your left leg.  This should produce a cycling action.   Repeat as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/bicycle.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/bicycle.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/bicycle.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Abdomen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Gluetus Medius", description:"Lie on your left side with your feet together.  Lift your right leg up just behind your left foot, then slowly lift it away from you. Relax and return to the start position. You should feel this contract your outer hip muscles.  Repeat as directed.",videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/glute-medius-tfl-itb.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/glute-medius-tfl-itb.webm",thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/glute-medius-tfl-itb.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior',  'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Gluet Medius - Resistance", description:"Tie an exercise band around your ankles. Lie on your left side with your feet together.  Lift your right leg up just behind your left foot, then slowly lift it away from you. Relax and return to the start position. You should feel this contract your outer hip muscles.",videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/glute-medius-tfl-itb-band.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/glute-medius-tfl-itb-band.webm",thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/glute-medius-tfl-itb-band.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior',  'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Hamstring Curl", description:"Securely attach one end of the of the band near the floor. Lie on your stomach and place the other end of the loop around your ankle. Begin with your knee straight and bend your  knee against the band. Hold and slowly return.",videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/knee-flexion.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/knee-flexion.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/knee-flexion.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Upper Trapezius - Bilateral - Resistance", description:"Begin standing upright with your arms by your side.  Step on the band with both of your feet and  hold the band with both your arms. Evenly, shrug your shoulders upwards. This exercise should be felt on your shoulders close to the base of your neck. Repeat as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/upper-trapezius-band.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/upper-trapezius-band.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/upper-trapezius-band.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior',  'Neck', 'Shoulder', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Upper Trapezius - Dumbell", description:"Begin standing upright with your arms by your side holding a dumbbell in each hand. Evenly shrug your shoulders upwards then relax. This exercise should be felt on your shoulders close to the base of your neck.  Repeat as prescribed. ", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/upper-trapezius-dumbell.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/upper-trapezius-dumbell.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/upper-trapezius-dumbell.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior',  'Neck', 'Shoulder', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Biceps Curl", description:"Stand on the stretch band as shown, holding it with your right arm.  Begin by bending your elbow and bringing your hand towards you.  After completing the contraction, allow your elbow to extend and let  your hand rest by your side. Keep your elbow against your body. Repeat as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/biceps-curls.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/biceps-curls.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/biceps-curls.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Anterior', 'Upper Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Biceps Curl - Dumbell", description:"Begin in an upright position with your arm by your side holding a dumbbell. Bend your elbow and bring your hand towards you.  After completing the contraction, allow your elbow to extend and let  your hand rest by your side.   Keep your elbow against your body.  Repeat as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/biceps-curls-dumbell.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/biceps-curls-dumbell.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/biceps-curls-dumbell.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Anterior', 'Upper Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Triceps Extension", description:"Stand on the stretch band as shown.  Hold it with both hands so that the tension is adjusted.  Slowly, extend your arms behind you.  You will feel a contraction at the back of your arms or triceps muscle.  After reaching full range,  allow your arms to go back to the starting position.  Repeat the exercise as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/triceps-extention-bilateral.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/triceps-extention-bilateral.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/triceps-extention-bilateral.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Upper Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Deltoids - Lateral Raise 90", description:"Stand on the exercise band as shown.  Begin by slowly raising your arm out to the side as shown, stopping at 90 degrees.  This exercise is felt on the top of the shoulder. Repeat as directed by your therapist.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-lateral-raise-90.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-lateral-raise-90.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/deltoids-lateral-raise.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Anterior','Upper Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Range of Motion']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Deltoids - Lateral Raise 180", description:"Stand on the exercise band as shown.  Begin by slowly raising your arm out to the side towards your head, stopping when comfortable. This exercise is felt on the top of the shoulder. Repeat this exercise as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-lateral-raise-full-ext.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-lateral-raise-full-ext.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/deltoids-lateral-raise-full-ext.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Anterior','Shoulder']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Range of Motion']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Deltoids - Lateral Raise Dumbbell - 180", description:"Begin in an upright position with your arm by your side holding a dumbbell. Slowly raise your arm out to the side towards your head, stopping when comfortable. This exercise is felt on the top of the shoulder.  Repeat the exercise as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-lateral-raise-dumbell-full-ext.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-lateral-raise-dumbell-full-ext.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/deltoids-lateral-raise-dumbell-full-ext.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Anterior','Shoulder']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side', 'Range of Motion']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Deltoids - Lateral Raise Dumbbell - 90", description:"Begin in an upright position with your arm by your side holding a dumbbell. Slowly raise your arm out to the side as shown, stopping at 90 degrees. This exercise is felt on the top of the shoulder.  Repeat the exercise as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-lateral-raise-dumbell-90.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-lateral-raise-dumbell-90.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/deltoids-lateral-raise-dumbell-90.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Upper Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side', 'Range of Motion']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Triceps Extension - Resistance", description:"Stabilise the band in front of you preferably above your eyes in height.  Stand upright and hold onto the band with your elbow bent as shown.  Keeping your elbow tucked in close to your body, begin to draw you hand towards the ground so that it finishes by your side.  Allow the band to slowly return to the start position.  This exercise should be felt in the triceps muscle at the back of the arm.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/triceps-extension-unilateral.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/triceps-extension-unilateral.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/triceps-extension-unilateral.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Shoulder', 'Upper Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Shoulder - External Rotation - Resistance", description:"Stabilise the band by your side on a door handle or a secure object.  Keep your right arm against your body and your elbow bent at a 90 degree right angle. Begin by rotating your arm away from your torso, whilst keeping your body straight and your elbow tucked in.  Maintain the angle at the elbow through the entire exercise.  This should be felt at the back of the shoulder blade. Repeat as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/rotator-cuff-externalrotation-band.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/rotator-cuff-externalrotation-band.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/rotator-cuff-external-rotation-band.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Shoulder']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Shoulder - External Rotation - Dumbbell", description:"Begin in an upright position with a dumbbell in your hand.  Keep your right arm against your body and your elbow bent at a 90 degree right angle. Begin by rotating your arm away from your torso, whilst keeping your body straight and your elbow tucked in.  Maintain the angle at the elbow through the entire exercise.  This should be felt at the back of the shoulder blade.  Repeat as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/rotator-cuff-external-rotation-dumbell.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/rotator-cuff-external-rotation-dumbell.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/rotator-cuff-external-rotation-dumbell.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Shoulder']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Shoulder - Internal Rotation - Resistance", description:"Stabilise the exercise band on a door handle.  Keep your arm against your body and your elbow bent at a 90 degree right angle. Begin by rotating your arm towards your torso whilst keeping your body straight and your elbow tucked in.  Maintain the angle at the elbow through the entire exercise.  This should be felt at the back of the shoulder blade.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/rotator-cuff-internal-rotation.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/rotator-cuff-internal-rotation.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/rotator-cuff-internal-rotation.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Shoulder']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Shoulder - Front Raise 90", description:"Stand on the band as shown. Slowly lift the band out in front of you to 90 degrees. Relax and repeat as directed.This should be felt on the top and front of the shoulder.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-front-raise-90.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-front-raise-90.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/deltoids-front-raise-90.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Anterior', 'Shoulder']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side', "Range Of Motion"]}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Shoulder - Front Raise 180", description:"Stand on the band as shown. Slowly lift the band out in front of you and above your head, stopping when comfortable.  Relax and repeat as directed. This should be felt on the top and front of the shoulder.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-front-raise-180.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/deltoids-front-raise-180.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/deltoids-front-raise-180.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Anterior', 'Shoulder']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side', "Range Of Motion"]}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Chest Press - Resistance", description:"Secure the middle of the band at shoulder height behind you.  Stand with one leg forward, slightly bending your front leg.  Keep your elbows straight and bring your hands together so that your palms approximate. This should be felt at the front of your chest.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/chest.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/chest.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/chest.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Anterior', 'Shoulder', 'Chest']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Hip Extension - Resistance", description:"Stabilise the band as shown and secure it to your lower leg.  Stand in an upright position, holding onto something for support.  Keep your knee straight and pull your hip backwards whilst remaining upright. This exercise will be felt in the outer thigh or buttock. Relax to the start position.  Repeat as required.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/hip-extension.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/hip-extension.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/hip-extension.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Gluets', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Upper Back", description:"Begin standing with your arms out in front  of you, shoulder width apart.  Hold the exercise band with both hands evenly, then separate your arms until they end up in line with the side of your body.   This should be felt at the back of both shoulder blades.  Repeat the exercise as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/back-upper.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/back-upper.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/back-upper.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Shoulder', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Knee Extension", description:"In a seated upright position, secure the band directly behind your right leg and over your right foot.  Attempt to straighten your leg until your knee is straight.  You should feel a contraction in your thigh above your knee.  Relax your leg and repeat as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/leg-extension.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/leg-extension.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/leg-extension.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Anterior', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Forearm Extensors - Resistance", description:"Sit down with your foot securing the band.  Place your arm on your knee or a table with your palm facing down and your hand over the edge.  Start with your hand pointing down and pull the band up without lifting your arm off your knee or the table.  This will be felt through your forearm. Repeat as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/forearm-extensions-band.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/forearm-extensions-band.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/forearm-extensions-band.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Lower Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Forearm Extensors - Dumbbell", description:"Sit in an upright position with a dumbbell in your hand. Place your arm on your knee or a table, with your palm facing down and your hand over the edge.  Start with your hand pointing down, and lift the dumbbell up without lifting your forearm off your knee or the table.  This will be felt through your forearm. Repeat as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/forearm-extensions-dumbell.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/forearm-extensions-dumbell.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/forearm-extensions-dumbell.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Lower Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Forearm Flexors - Dumbbell", description:"Sit in an upright position with a dumbbell in your hand. Place your arm on your knee or a table with your palm facing up and your hand over the edge.  Start with your hand pointing down and lift the dumbbell up towards you without lifting your arm off your knee or the table.  This will be felt through your forearm.  Repeat the exercise as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/forearm-flexors-dumbell.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/forearm-flexors-dumbell.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/forearm-flexors-dumbell.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Anterior', 'Lower Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Forearm Flexors - Resistance Band", description:"Sit down with your foot securing the band.  Place your arm on your knee or a table with your palm facing up and your hand over the edge.  Start with your hand pointing down and pull the band up without lifting your arm off your knee or the table.  This will be felt through your forearm.  Repeat the motion as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/forearm-flexors-band.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/forearm-flexors-band.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/forearm-flexors-band.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Anterior', 'Lower Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Head Nod", description:"Stand in an upright position. Gently glide your head back over your neck, being careful not to tilt your head. Stop when a tightness is felt and then gently look down only slightly. Hold for as long as prescribed. This should be felt at the back of the head between the head and neck.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/head-nod.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/head-nod.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/head-nod.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Neck']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments','Duration (secs)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Trunk Rotation", description:"Seated in an upright position, reach both your arms behind your neck and bring your elbows forward. Gently begin to rotate your body to the left without pulling on your neck. Hold for the duration prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/thorasic-rotation.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/thorasic-rotation.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/thorasic-rotation.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch','Posterior', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Frequency (per day)', 'Comments','Duration (secs)', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            },
            function (callback) {
                db.Exercise_model.build({
                    name:"Bent Over Row - Dumbell", description:"Stand facing a chair or support. Place your left leg in front of your right and bend forward using your left arm to stabilise your weight. Keeping your back straight, let the dumbbell drop towards the floor. Then slowly lift the dumbbell towards your body, stopping when your elbow is by your side. This exercise is felt on your back between your spine and shoulder.  Repeat as prescribed.", videoMp4:"https://d2bjomctld7cul.cloudfront.net/videos/8bent-over-row.mp4", videoWebM:"https://d2bjomctld7cul.cloudfront.net/videos/8bent-over-row.webm", thumbnail:"https://d2bjomctld7cul.cloudfront.net/thumbnails/bent-over-row.png", videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen','Posterior', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Repetitions', 'Comments', 'Sets', 'Frequency (per day)', 'Resistance', 'Side']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
            }], function () {
            done();
        })
    }

    this.cleanDB = function (done) {
        async.series([

            function (callback) {
                db.Tag_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.Exercise_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.PrescriptionInfo_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
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
            }
            , function (callback) {
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
            }
        ], function (errors, results) {
            done();
        })
    }

    this.cleanFullDB = function (done) {
        async.series([
            function (callback) {
                db.Clinic_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
                db.User_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
                db.Tag_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }
            , function (callback) {
                db.Exercise_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
                db.ExerciseList_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
                db.ExerciseListExercise_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.PrescriptionInfo_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.PrescriptionInfoValue_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }




            , function (callback) {
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
    }
            , function (callback) {
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
            }, function (callback) {
                db.ExerciseListExercise_model.sync().success(function (data) {
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
            }
        ], function (errors, results) {
            done();
        })
    }

    this.cleanFullDB = function (done) {
        async.parallel([
            function (callback) {
                db.Clinic_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
                db.User_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
                db.Tag_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }
            , function (callback) {
                db.Exercise_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
                db.ExerciseList_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.PrescriptionInfo_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.PrescriptionInfoDefault_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            },
            function (callback) {
                db.PrescriptionInfoValue_model.drop().success(function (data) {
                    callback(null, data)
                }).error(function (error) {
                        callback(error, null)
                    })
            }, function (callback) {
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
            }
            , function (callback) {
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
            }
        ], function (errors, results) {
            done();
        })
    }

    return this;
}