var db = require('./index.js')
    , Config = require('../config/config.js')
    , async = require('async')
    , config = new Config()
    , Sequelize = require('sequelize')
    , sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {host:config.database.host, dialect:config.database.dialect, port:config.database.port, logging:console.log})
    , db = new db(sequelize)

module.exports = function () {
	this.newExerciseObjectsFeb2015 = function (done) {
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
                    name:'Active ROM Circumduction', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Active+Range+Circumdation+ankle-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Active+Range+Circumdation+ankle-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/active-rom-circumduction.png', description:'Begin seated with the indicated leg held up off the floor.  Slowly roll your foot clockwise in a circular motion. You may also roll your foot anti-clockwise.  Perform as prescribed.', videoLength:"5138008"
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
            },
            function (callback) {
                db.Exercise_model.build({
                    name:'Ankle Glide', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Ankle+Glides-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Ankle+Glides-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/ankle-glide.png', description:'Start standing upright with feet shoulder width apart.  If necessary remain supported, then take a small step forward with your indicated foot.  Attempt to bend your indicated  knee keeping it on the ground and lean forward. Continue to lean so that your knee moves over your foot. Reach a  comfortable position then hold for 2-3 seconds and slowly return back.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Lower Legs', 'Strengthen', 'Stretch', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Brettzel Stretch', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Bretzel+Stretch-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Bretzel+Stretch-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/brettzel-stretch.png', description:'Lie on the non indicated side with your legs partially bent and knees together.  Bring the top leg up towards your torso so you knee becomes bent.  Rest that knee on the hand of the arm on the floor.  Then with your free arm, attempt to grab the leg closest to the ground.  You will need to swing that leg back  so your heel comes close to your buttock.  Once you are in this position begin rolling your upper shoulder and neck  backwards towards the ground in sync with deep breaths out.  Each out breath should take the stretch slightly further.  Hold for the prescribed time.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Back', 'Stretch', 'Abdomen', 'Anterior', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Bridge Bilateral Legs', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Bridge+Both+Legs-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Bridge+Both+Legs-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/bridge-bilateral-legs.png', description:'Begin on your back, palms facing upwards by your side.  Bend both your knees keeping them hip width apart.  Then draw in your stomach muscles and lift your hips and pelvis off the ground.  Hold this for the prescribed time and / or repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Back', 'Gluets', 'Abdomen', 'Strengthen', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)']}}).success(function (data) {
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
                    name:'Cervical extension', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Cervical+Extension-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Cervical+Extension-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/cervical-extension.png', description:'Lie face down with your head supported against a small rolled towel. Attempt to look upwards extending your neck.  Stop where comfortable and be cautious not to over extend.  Return to the start position and repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Neck', 'Strengthen', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Cervical Side Bending', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Cervical+Lateral+Flexion-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Cervical+Lateral+Flexion-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/cervical-side-bending.png', description:'Lie comfortably on the non indicated side, supporting your head and neck with a pillow or your arm.  Slowly lift your head away from the ground stopping where comfortable and holding for 2-3 seconds.   Slowly return to the start.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Neck', 'Strengthen', 'Posterior', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Cervical protraction prone', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Cervical+Supination+Prone-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Cervical+Supination+Prone-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/cervical-protraction-prone.png', description:'Lie face down with your head supported against a small rolled towel and your arms by your side.  Attempt to roll your arms outwards, tightening  your shoulder blades whilst lifting your head off the towel. Hold for 2-3 seconds.  Do not extend your neck and stay looking down.  Relax and repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Neck', 'Strengthen', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Clam Side Lying', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/CLAM+SIDE+LYING-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/CLAM+SIDE+LYING-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/clam-side-lying.png', description:'Begin lying on your side supporting your head with your arm. Bend both your knees and drawing your stomach muscles in attempt to lift your leg outwards rotating it at the hip.  You may use a pillow between your knees for added comfort.  Increase the range to a comfortable position and repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Abdomen', 'Posterior', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Eccentric flexors', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/CONCENTRIC+WRIST+TENNIS+ELBOW-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/CONCENTRIC+WRIST+TENNIS+ELBOW-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/eccentric-flexors.png', description:'Begin seated with your indicated hand off the  edge of a bench or table palm facing upwards whilst holding a dumbbell or weight. Using the strength of your free hand lift your hand upwards.  Then allow the weight to return back without the assistance of your free hand.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Lower Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Resistance', 'Side']}}).success(function (data) {
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
                    name:'Hip Lift with Tennis Ball', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Cook+Hip+Lift-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Cook+Hip+Lift-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/hip-lift-with-tennis-ball.png', description:'Begin on your back, arms out by your side, palms facing up and knees bent.  Raise the indicated knee up and tuck a tennis ball between your hip and abdomen.  Attempt to lift your pelvis off the floor without letting the ball fall out.  Raise high enough so your spine and legs line up.  Hold for 2-3 seconds.  Keeping the ball locked in position, drop your pelvis down and repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Gluets', 'Posterior', 'Anterior', 'Back', 'Upper Legs', 'Abdomen' ]}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Cross Supermans ', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Cross+Supermans-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Cross+Supermans-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/cross-supermans.png', description:'Lying face down, extend your arms out in front of you. Slowly lift your one arm and your opposite leg off the ground extending your spine. Hold for 2-3  seconds, then relax.  Then swap over and do the other arm and leg. Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Posterior', 'Upper Legs', 'Gluets', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Deadlift', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Deadlift-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Deadlift-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/deadlift.png', description:'Begin standing with the dumbbells or weight by your side and your feet hip width apart.  Bend your knees whilst leaning forward through your hips without bending your spine.   Keep your chest out and use your leg muscles to begin straightening up, pushing through your heels.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Upper Legs', 'Gluets', 'Back', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)']}}).success(function (data) {
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
                    name:'Diaphragm Breathing', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Diagpram+Breathing-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Diagpram+Breathing-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/diaphragm-breathing.png', description:'Begin on your back with a pillow under your knees.  Rest a light object like a book on your stomach and on your chest as demonstrated.  Attempt to breath in through your nose over 4 seconds, noticing only the book on your stomach lifting upwards.  Make sure you minimize movement at your chest.  Then breath out over 4 seconds noticing the book on your stomach lowering.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Abdomen', 'Chest', 'Posterior', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)']}}).success(function (data) {
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
                    name:'Eccentric Flexion 2', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Eccentric+Flexion+Golfers+Elbow-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Eccentric+Flexion+Golfers+Elbow-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/eccentric-flexion-2.png', description:'Begin with your indicated hand holding one end of a flex bar with that palm facing you and your elbow bent.  Then hold the other end of the bar on its other side, with your palm facing away and thumb pointing down.    Using the non indicated hand twist the bar so both arms are now in a similar position, extended out in front.  You will feel tension in the involved forearm. Begin to slowly release the tension over 4 seconds allowing the bar to unwind.  Then let go and return to the start.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Lower Arm', 'Posterior', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side', 'Resistance']}}).success(function (data) {
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
                    name:'Eccentric Extensors', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Eccentric+Forearm+Contraction+with+DB-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Eccentric+Forearm+Contraction+with+DB-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/eccentric-extensors.png', description:'Begin seated with your indicated hand off the edge of a bench or table palm facing downward, whilst holding a dumbbell or weight. Using the strength of the other hand lift your hand upwards.  Then allow the weight to return back without the assistance of your free hand. Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Lower Arm', 'Posterior', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side', 'Resistance']}}).success(function (data) {
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
                    name:'Childs Pose', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/FD+Childs+Pose-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/FD+Childs+Pose-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/childs-pose.png', description:'Begin on all fours on the ground. Widen your knees so they extend out past your torso. Slowly move your body weight back, keeping your reach out in front.  As you move further back attempt to lengthen your arms further.  You may feel this stretch through your hips, shoulders and back.  Hold for the prescribed time.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Lower Legs', 'Upper Legs', 'Posterior', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)']}}).success(function (data) {
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
                    name:'Shoulder Ts ', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/FD+Shoulder+Ts-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/FD+Shoulder+Ts-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/shoulder-ts.png', description:'Lie face down on a exercise ball with your arms on the ground supporting your weight. Begin by bringing your arms back evenly felling your shoulder blades squeezing together.  Hold this for 2-3 seconds, repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Shoulder', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)']}}).success(function (data) {
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
                    name:'Finger Extension', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Finger+Strength-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Finger+Strength-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/finger-extension.png', description:'Begin by placing a rubber band  over your fingers, close to the tips as demonstrated.  Now attempt to open your hand, then relax and return to the start position. Keep the movement slow and steady to avoid the band slipping off.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Lower Arm', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side', 'Resistance']}}).success(function (data) {
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
                    name:'Eccentric Extensor 2', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/FLEX+BAR+TENNIS+ELBOW-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/FLEX+BAR+TENNIS+ELBOW-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/eccentric-extensor-2.png', description:'Begin holding the flex bar with the indicated side using the same grip as holding a glass.  Use the opposite arm to hold the other end of the bar with your palm facing out and your thumb pointing down as demonstrated.  Begin to straighten your elbows and twist the bar so the bar is in front of you about waist height. Over a 4 second period release the tension in the indicated arm .  To repeat this exercise hold the bar as is and roll back the indicated hand like you were riding a motorcycle.  Then release again over 4 seconds.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Lower Arm', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side', 'Resistance']}}).success(function (data) {
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
                    name:'Flexion Resisted', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Flexion+Active+Resisted-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Flexion+Active+Resisted-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/flexion-resisted.png', description:'Begin in a comfortable upright position.  Rest one hand on your forehead and attempt to push into your hand with your head,  resisting any motion.  Hold for 3-5 seconds then relax.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Neck']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Flexion Supine', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Flexion+Supine-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Flexion+Supine-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/flexion-supine.png', description:'Lie on your back, knees bent and arms by your side. Lift you head of the ground, stopping where comfortable. Hold for 2-3 seconds then return to the start.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Neck']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Foam Rolling - Forearm', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Forearm-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Forearm-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/foam-rolling-forearm.png', description:'Lying face down with your forearm resting on the foam roller.  Attempt to move over the roller increasing your body weight pressure to increase the intensity. Alternatively roll your arm back and forth adding rotation of the forearm to identify other Areas of tension. Perform as prescribed', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Anterior', 'Posterior', 'Lower Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Foam Roller - Calf', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Calve-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Calve-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/foam-roller-calf.png', description:'Begin seated with a  roller or spikey ball  placed under your knee.  Move slightly to find a position of tension on your calf and hold that position for the prescribed time.  You may use your arms and body to move,  finding another position of tension.  Repeat this motion as prescribed.  Alternatively you may roll your body continuously as demonstrated.   ', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Lower Legs', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Foam Roller - Glutes', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Glutes-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Glutes-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/foam-roller-glutes.png', description:'Begin sitting on a foam roller or spikey ball. Move slightly to find a position of tension and hold that position for the prescribed time.  You may use your legs to move,  finding another position of tension.  Repeat this motion as prescribed.  Alternatively you may roll your body continuously as demonstrated.  ', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Gluets', 'Posterior', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Foam Roller - Adductors', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Groin-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Groin-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/foam-roller-adductors.png', description:'Begin lying face down with the foam roller or spikey ball near your groin.  Lift your body weight off the ground and try to anchor pressure onto the roller.  Lift that foot off the ground, so now you are leaning mostly on the roller. Hold the position of tension for the prescribed time.  Alternatively continue to roll back and forth over the roller for the specified amount of time.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Upper Legs', 'Posterior', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Foam Roller - Hamstrings', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Hamstrings-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Hamstrings-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/foam-roller-hamstrings.png', description:'Begin sitting on the roller or spikey ball, placing it under your indicate leg close to your sitting bones.  Move slightly to find a position of tension and hold that position for the prescribed time.  You may use your arms to move,  finding another position of tension down the back of your leg.  Repeat this motion as prescribed.  Alternatively you may roll your body continuously as demonstrated.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Upper Legs', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Foam Roller - Latissimus Dorsi', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Lats-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Lats-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/foam-roller--latissimus-dorsi.png', description:'Begin lying on your back with the roller on the indicated side near your ribcage.  Slowly attempt to roll backwards whilst twisting your torso so the roller can get closer to your armpit.  Keep your body balanced.  You may find areas of tension and hold for the prescribed time or roll gently back and forth.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Back', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Foam Roller - Lower Back', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Lower+Back-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Lower+Back-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/foam-roller-lower-back.png', description:'Lying on the foam roller placed under your low back with your knees bent and feet on the floor.   Keeping comfortable and balanced, gently lean over the roller being careful not to extend too far. You may also lift your arm in front of you or even further above your head to increase the intensity.   Then finding the areas of tension hold the roller for the prescribed time.  Alternatively you may also gently roll back and forth for the required time.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Back', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)']}}).success(function (data) {
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
                    name:'Foam Rolling - Piriformis', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Piriformis-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Piriformis-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/foam-rolling-piriformis.png', description:'Begin seated on the foam roller or spikey ball with it placed on the indicated buttock. Roll your body weight over the roller identifying areas of tension.  You may either hold for the prescribed time or rock back and forth for the indicated time.  If you notice any tingling or numbness in your leg stop and consult with your health professional.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Gluets', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Foam Roller - Rotator Cuff', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+SHoulder+Blades-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+SHoulder+Blades-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/foam-roller-rotator-cuff.png', description:'Place a foam roller on the floor at an angle to the body. slightly rotate your torso so that your back and shoulder blade sit comfortably on the roller. Lift your arms out in front or even hold them above your head.  Find the areas of tension and hold the roller for the prescribed time.  You may also gently roll back and forth for the required time.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Back', 'Upper Arm', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Foam Roller - Tricep', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Tricep-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Foam+Roller+Tricep-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/foam-roller-tricep.png', description:'Lie on your side with your arm out palm facing up resting on the roller or spikey ball.  Keeping your balance, gently roll your arm over the roller finding areas of tension and holding for the prescribed time. You may also roll gently back and forth for the prescribed time.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Upper Arm', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Achilles / Calf', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Foot+Ankle+Band+Drill+-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Foot+Ankle+Band+Drill+-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/achilles-calf.png', description:'Begin in a seated position on the floor, with your legs out in front of you.  Place a band around your foot securing it with your hands.  Keeping your knee straight, attempt to point your toes away pushing your foot downwards.  Relax and return to the start. This should be felt at the back of the leg or calf. Repeat this exercise as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Strengthen', 'Lower Legs', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side', 'Resistance']}}).success(function (data) {
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
                    name:'Glute Abdominal Stabilization', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Gluteal+Abdominal+Stabilsation-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Gluteal+Abdominal+Stabilsation-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/glute-abdominal-stabilization.png', description:'Begin by tying a band around your foot and tying the other end of the band somewhere secure as demonstrated. Lift your foot off the ground, bending your knee and hip.  Now attempt to make small circles with your foot, both clockwise and counter clockwise whilst keeping your balance.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Gluets', 'Back', 'Abdomen', 'Lower Legs', 'Posterior', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Grip Strength', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Grip+Strength-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Grip+Strength-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/grip-strength.png', description:'Begin holding a  towel or sock with the indicated hand.  Slowly begin to squeeze down remaining comfortable through your hand and forearm.  You may also perform this exercise one finger at a time as demonstrated. Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Lower Arm', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side', 'Resistance']}}).success(function (data) {
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
                    name:'Wrist / Thumb Abduction', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Hand+Elbow+Forearm-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Hand+Elbow+Forearm-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/wrist-thumb-abduction.png', description:'Begin in a seated position holding a dumbbell or weight in your indicated hand.  Rest your forearm on a table with your thumb pointing up and the weight clear of the edge. Attempt to lift the weight upwards whilst keeping your arm on the table.  Stop where comfortable and allow your hand to return to the start position. Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Lower Arm', 'Posterior', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side', 'Resistance']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
				},
            	function (callback) {
                db.Exercise_model.build({ //check the next two
                    name:'Finger Extension 2', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Hand+Finger+ROM-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Hand+Finger+ROM-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/finger-extension-2.png', description:'Begin by placing your palms together. Slowly attempt to separate your fingers, making sure to keep your palms joined.  Return to the start position and repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Stretch', 'Posterior', 'Lower Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Finger Push / Stretch', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Hand+Finger+Exercise-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Hand+Finger+Exercise-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/finger-push-stretch.png', description:'Begin by placing your palms together. Slowly attempt to separate your fingers, making sure to keep your palms joined.  Return to the start position and repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Stretch', 'Posterior', 'Posterior', 'Lower Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side', 'Range of Motion']}}).success(function (data) {
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
                    name:'High Stepping With Resistance', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/High+Step+with+Theroband-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/High+Step+with+Theroband-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/high-stepping-with-resistance.png', description:'Begin by tying a band around your foot on the indicated side. Tie the other end of the band somewhere secure.  Lift your foot off the ground and swing your knee forward in one movement whilst keeping your arms out for balance.  Allow the band to return you to the start position.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Back', 'Gluets', 'Abdomen', 'Lower Legs', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side', 'Resistance']}}).success(function (data) {
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
                    name:'Bridge Single Leg', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Hip+Bridge+Single+Leg-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Hip+Bridge+Single+Leg-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/bridge-single-leg.png', description:'Begin on your back, palms facing upward by your side.  Bend both your knees, then straighten your indicated leg keeping your knees in line. Draw in your stomach muscles lifting your pelvic floor, then lift your hips off the ground.  Hold this for the prescribed time and / or repeat as necessary.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Back', 'Abdomen', 'Gluets', 'Posterior', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Hip Flexion and Rotation', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Hip+Flexion+Rotation-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Hip+Flexion+Rotation-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/hip-flexion-and-rotation.png', description:'Start lying on your back, with your arms by your side.  Slowly bring your knee towards your chest assisting with your hands.  Rotate your hip three times making small circles clockwise then anticlockwise.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Upper Legs', 'Posterior', 'Abdomen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Internal / External ROM prone', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Hip+internal+external+rotation-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Hip+internal+external+rotation-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/internal-external-rom-prone.png', description:'Lie face down with your indicated leg bent 90 degrees at the knee.  Begin by rotating your foot inwards holding for 2-3 seconds then rotating your foot outwards holding for 2-3 seconds.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Upper Legs', 'Posterior', 'Anterior', 'Abdomen', 'Range of Motion']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Isometric lateral ', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Jaw+Exercise+Deviation-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Jaw+Exercise+Deviation-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/isometric-lateral.png', description:'Begin in an upright position.  Start with one hand against your chin on the indicated side and gently push your jaw towards your hand without allowing movement of your jaw. Hold this contraction for 3-5 seconds, then relax.   Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Strengthen', 'Anterior', 'Neck']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Ball stabilization', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Kinetic+Ball+Roll-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Kinetic+Ball+Roll-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/ball-stabilization.png', description:'Stand upright and hold a small ball against a wall using your indicated hand as shown.  Be sure not to bend your elbows and begin by making small circles keeping the ball under control.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior', 'Shoulder']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Knee Stabilizing - Star', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Knee+Stabiliser+Pattern-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Knee+Stabiliser+Pattern-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/knee-stabilizing-star.png', description:'Using some tape outline a star pattern on the floor. With the prescribed leg stand in the middle of the star.  Slightly bend your opposite knee, maintain good balance,  then attempt to move your leg around the star one point at a time. Complete a full circle then repeat increasing your reach slightly further.  Perform as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior', 'Lower Legs', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Knee Stabilizing', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Knee+Stabilising+1-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Knee+Stabilising+1-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/knee-stabilizing.png', description:'Begin seated with you knee free from the edge of the chair and your leg at 90 degrees. With your foot firmly on the ground attempt to push your heel down contracting your leg muscle.  Hold this for 2-3 seconds then relax.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior', 'Lower Legs', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'VMO Activation - Advanced', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Knee+Strengthening+VMO-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Knee+Strengthening+VMO-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/vmo-activation-advanced.png', description:'Begin seated with a rolled towel or your hand under your thigh of the indicated leg close to your knee.  Whilst pushing the towel down with your leg attempt to straighten your knee.  Hold for 2-3 seconds then return to the starting position.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior', 'Lower Legs', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Knee Strengthening', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Knee+Strengthening-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Knee+Strengthening-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/knee-strengthening.png', description:'Begin seated on the ground with your legs out in front.  Slowly attempt to push your heel and knee of the indicated leg downwards, contracting the muscles around your knee.  Hold for 2-3 seconds then relax.  Repeat as prescribed', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior', 'Lower Legs', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Side Bending Resisted', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Lateral+Flexion+Active+Resisted-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Lateral+Flexion+Active+Resisted-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/side-bending-resisted.png', description:'Begin in a comfortable upright position.  Rest one hand on the side of your head and attempt to push into your hand with your head, whilst your hand resists any motion.  Hold for 3-5 seconds then relax.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior', 'Neck']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Lateral lunge Crossover', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Lateral+Lunge+Crossover-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Lateral+Lunge+Crossover-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/lateral-lunge-crossover.png', description:'Begin standing upright and take a large step left keeping your toes pointing foreword.  Shift your body weight to the left leg, bending the left knee whilst keeping the right knee straight.  As you spring back to the start, pivot your  foot to cross over and move your left leg to 45 degrees in front and to your right, leaning forward bending both your knees.  When repeating as prescribed there is no need to return to the start position rather step back to the left as demonstrated.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior', 'Upper Legs', 'Lower Legs', 'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Leg Extension With Roller', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/LEG+EXTENSION+OVER+ROLLER-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/LEG+EXTENSION+OVER+ROLLER-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/leg-extension-with-roller.png', description:'Begin seated on the floor with a foam roller under your indicated knee. Attempt to straighten your knee, lifting your foot off the ground. Hold the contraction for 2-3 seconds then relax.  Repeat as prescribed.  ', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Upper Legs', 'Lower Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Lumbar Rolls With Feet On Floor', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Lumbar+rolls+with+feet+on+the+floor-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Lumbar+rolls+with+feet+on+the+floor-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/lumbar-rolls-with-feet-on-floor.png', description:'Begin on your back with your palms facing up and  knees bent. Draw in your stomach muscles whilst rolling  your legs to one side, stopping where comfortable, then rolling back towards the other side.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Posterior', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Neck Extension Resisted', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Neck+Extension+Active+Resisted-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Neck+Extension+Active+Resisted-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/neck-extension-resisted.png', description:'Begin in a comfortable upright position.  Rest one hand on the back of your head and attempt to push into your hand with your head, whilst your hand resists any motion.  Hold for 3-5 seconds then relax.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Posterior', 'Neck']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)']}}).success(function (data) {
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
                    name:'Pelvic Curl', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/PELVIC+FLOOR-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/PELVIC+FLOOR-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/pelvic-curl.png', description:'Begin lying on your back with your arms by your side, palms facing upwards and your knees bent. Attempt to lift through your pelvic floor so it feels like you lower abdomen is raising towards your head.  Draw your navel down to the floor, then curl your pelvis under so your low back  becomes flat and your bottom feels like it is pulling away from your spine.  As the pelvic floor contracts it should feel like it would stop the flow of urine. Relax back to the start and repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Posterior', 'Posterior', 'Abdomen', 'Back', 'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)']}}).success(function (data) {
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
                    name:'Plantar Arch', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/PEN+OR+PENNY+DRILL-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/PEN+OR+PENNY+DRILL-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/plantar-arch.png', description:'Start seated with your shoes off and feet on the ground.  Place a large coin under the base of your big toe and a pen under your arch.  Attempt to lift your arch away from the pen without lifting your toes or heel off the ground.  Hold for 2-3 seconds then relax.  repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Lower Legs', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Pendulum Swing', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Pendulum+Swings-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Pendulum+Swings-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/pendulum-swing.png', description:'Begin bent over with your non indicated arm supporting your body weight against a chair or table. Allow the indicated arm to relax and hang towards the ground, holding a weight if necessary.  Slowly move your arm in 3 small circular motions. Stop and perform the action in the other direction.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Shoulder', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side', 'Resistance']}}).success(function (data) {
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
                    name:'Pronation / Supination', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Pronation+Supernation+Seated+Forearm-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Pronation+Supernation+Seated+Forearm-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/pronation-supination.png', description:'Begin seated with your indicated arm off the edge of a bench or table, palm facing down, whilst holding a dumbbell or weight.  Slowly roll your hand outwards stopping where comfortable, the return back to the start.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Lower Arm', 'Posterior', 'Anterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side', 'Resistance', 'Range of Motion']}}).success(function (data) {
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
                    name:'Prone cobra', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Prone+Cobra-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Prone+Cobra-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/prone-cobra.png', description:'Lie face down with your arms by your side.   Arch your back lifting your chest and arms off the ground.  Try to reach behind you whilst keeping your elbows straight, arms rolled out and your thumbs pointing up.  Make sure your neck is straight.  Do not tilt your head back.  Hold and repeat for the prescribed amount of time.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Strengthen', 'Posterior', 'Gluets', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)']}}).success(function (data) {
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
                    name:'Thoracic Spine Rotation', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Quadrupted+Thoracic+Spine+Rotation-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Quadrupted+Thoracic+Spine+Rotation-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/thoracic-spine-rotation.png', description:'Start on all fours.  Place your indicated hand behind your head and neck.  Rotate your spine by pointing your indicated elbow towards the sky.  Hold for 2-3 seconds, then move it towards to opposite elbow and hold for another  2-3 seconds. Remember to keep your pelvis and low back still.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Stretch', 'Back', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Reverse Lunge With Swing', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Reverse+Lunge+with+swing-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Reverse+Lunge+with+swing-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/reverse-lunge-with-swing.png', description:'Stand upright with your feet shoulder width apart. Take a step backward with your indicated leg, bending your knees, lowering your body towards the ground. Cross the indicated sides arm over your front knee and keep your balance by simultaneously raising opposite arm above your head.   Return back to the starting upright position. Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Lower Legs', 'Upper Legs', 'Gluets', 'Anterior', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Rotating Lunges', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Rotating+Lunge-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Rotating+Lunge-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/rotating-lunges.png', description:'Begin standing with your knees hip width apart, holding a small ball or object straight out in front of you.  Take a step forward with your indicated leg coming up onto your toes on the back leg.  Bend your knees, keeping your back upright, whilst lowering your body.  Stop where comfortable holding for 2-3 seconds and slowly returning to the start position.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Lower Legs', 'Upper Legs', 'Gluets', 'Anterior', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'External Rotation and Adduction', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Active+ROM-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Active+ROM-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/external-rotation-and-adduction.png', description:'Begin upright with your arms by your side.  Using the indicated arm, attempt to reach back over the same shoulder with you fingers pointing downwards. Hold for 2-3 seconds and return to the start position. Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Shoulder', 'Anterior', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side', 'Range of Motion']}}).success(function (data) {
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
                    name:'Horizontal Adduction', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Extension+-HD+720p-1.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Extension+-HD+720p-1.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/horizontal-adduction.png', description:'Stand upright with your indicated arm out by your side at shoulder height.  Attempt to swing your arm out across your body in front of you, bending your elbow and reaching the opposite shoulder. Hold where comfortable for 2-3 seconds and return back to the start position.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Shoulder', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side', 'Range of Motion']}}).success(function (data) {
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
                    name:'Active Extension', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Extension+-HD+720p-1.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Extension+-HD+720p-1.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/active-extension.png', description:'Stand upright with your arms comfortably by your side.  Attempt to reach the indicated arm back behind you stopping where comfortable or prescribed.  Allow the arm to slowly return to the start position.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Shoulder', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side', 'Range of Motion']}}).success(function (data) {
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
                    name:'Active Flexion', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Flexion+-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Flexion+-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/active-flexion.png', description:'Stand with your arms comfortably at your side, then begin to raise the indicated arm upwards stopping where comfortable or prescribed.  Allow the arm to return to the start position.  Full range is demonstrated.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Anterior', 'Posterior', 'Shoulder', 'Strengthen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side', 'Range of Motion']}}).success(function (data) {
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
                    name:'Internal Rotation and Adduction', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Internal+Rotation+Adduction-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Internal+Rotation+Adduction-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/internal-rotation-and-adduction.png', description:'Begin upright with your arms by your side.  Using the indicated arm reach behind your back and gently attempt to raise your hand as high as is comfortable. Hold for 2-3 seconds and return to the start position.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Anterior', 'Posterior', 'Shoulder', 'Strengthen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side', 'Range of Motion']}}).success(function (data) {
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
                    name:'Protraction with Resistance', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Protraction+with+Resistance-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Protraction+with+Resistance-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/protraction-with-resistance.png', description:'Begin lying of the floor with your body over the band, stabilizing it with the other hand. Whilst keeping your arm directly out in front of you attempt to reach out even further.  Hold at the end range for 2-3 seconds then allow your arm to return back whilst maintaining control. Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Anterior', 'Posterior', 'Shoulder', 'Strengthen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side', 'Duration (secs)', 'Range of Motion', 'Resistance']}}).success(function (data) {
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
                    name:'Reach Retract Roll and Lift', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Retract+roll-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Retract+roll-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/reach-retract-roll-and-lift.png', description:'Stand facing a wall. Place your arms against the wall with your elbows at shoulder height and bent at 90 degrees. Begin to pull back your shoulder blades so that your hands are no longer touching the wall.  Then roll your hands outwards so your thumbs are pointing behind you.  Slowly reach upwards stopping where comfortable.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Anterior', 'Posterior', 'Shoulder', 'Strengthen', 'Stretch', 'Upper Arm', 'Back']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side', 'Range of Motion']}}).success(function (data) {
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
                    name:'Scapular Retraction', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+retraction+lying+down-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+retraction+lying+down-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/scapular-retraction-lying-down.png', description:'Begin lying face down with a rolled towel supporting your head. Keeping your arms out by your side, elbows bent and your thumbs pointing upwards.  Pinch your shoulder blades together then lift your arms off the ground holding for 2-3 seconds. Slowly drop your arms down and relax your shoulder blades.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Anterior', 'Posterior', 'Shoulder', 'Strengthen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Range of Motion']}}).success(function (data) {
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
                    name:'Shoulder Wall Glides', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Wall+Glides-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Wall+Glides-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/shoulder-wall-glides.png', description:'Begin standing facing a wall, holding a towel placed flat against the wall at shoulder height.  Slowly raise your hand upwards sliding it against the wall.  Be sure to remain in contact with the wall.  Avoid any pain and slowly return to the start position keeping contact through the exercise.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Anterior', 'Posterior', 'Shoulder', 'Strengthen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Shoulder Wall Slides', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Wall+Slides-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Shoulder+Wall+Slides-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/shoulder-wall-slides.png', description:'Start with your back against a wall, your arms out and your elbows bent at 90 degrees. Commence by sliding your hands upwards, making sure your back and arms remain firmly against the wall. Stop where comfortable and return to the starting position.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Anterior', 'Posterior', 'Shoulder', 'Strengthen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side', 'Range of Motion']}}).success(function (data) {
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
                    name:'Side Step', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Side+Step-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Side+Step-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/side-step.png', description:'Stand on a step or platform, ensuring you have free space around you.  Begin by moving your non indicated leg off the step and to your side whilst bending your indicated knee slightly.  Touch the ground and return back to the step. Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior', 'Upper Legs', 'Lower Legs', 'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Single Leg Chair Squat', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Single+leg+chair+squat-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Single+leg+chair+squat-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/single-leg-chair-squat.png', description:'Begin seated with both your feet on the floor, hip width apart.  Extend the non indicated knee out in front then using the strength of the other leg stand up.  Keep your arms out in front for balance.  Repeat as prescribed.  For a more advanced version, attempt to sit back down using only the indicated leg as demonstrated.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior', 'Upper Legs', 'Lower Legs', 'Gluets', 'Back', 'Abdomen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Single Leg Deadlift', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Single+Leg+Dead+lift-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Single+Leg+Dead+lift-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/single-leg-deadlift.png', description:'Stand upright with the weights in your hands feet shoulder width apart. Slowly begin to lean forward keeping your indicated leg straight, whilst allowing your opposite leg to swing behind you.  Ensure your spine is straight through the exercise, slowly return your leg back to the ground.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior', 'Upper Legs', 'Lower Legs', 'Back', 'Abdomen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Single Leg Stand', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Single+let+standing+drill+balance-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Single+let+standing+drill+balance-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/single-leg-stand.png', description:'Begin in an upright position with your feet hip width apart. Keep close to wall or chair for support.  Raise your arms out in front. Now raise your non indicated knee up in front so you are standing on one leg.  Hold and repeat for the prescribed time.  To make the exercise more advanced attempt it with your eyes closed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Posterior', 'Upper Legs', 'Lower Legs', 'Back', 'Abdomen', 'Gluets']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Side']}}).success(function (data) {
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
                    name:'Wall Push Up', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Standing+Wall+Push+Up-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Standing+Wall+Push+Up-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/wall-push-up.png', description:'Begin standing near a wall with your feet about 1/4 of your body length off the wall.  Reach out placing both palms on the wall at about shoulder height and shoulder width.  Lean towards the wall coming up on your toes, allowing your elbows to bend.  When you are about to make contact with your head stop and hold for 2-3  seconds. Push back and return to the start position.  Repeat as prescribed.  You may Increase the distance from the wall to increase the difficulty of this exercise.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Chest', 'Anterior', 'Shoulder']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)']}}).success(function (data) {
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
                    name:'Stiff-Legged Deadlift', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Stiff+Leg+Dead+Lift-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Stiff+Leg+Dead+Lift-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/stiff-legged-deadlift.png', description:'Begin standing with the dumbbells or weight by your side and your feet hip width apart.  Bend your hips leaning forward without bending your spine keeping your legs straight. Return to the start position by slowly extending your back to straighten up.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Posterior', 'Upper Legs', 'Gluets', 'Back', 'Strengthen']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)']}}).success(function (data) {
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
                    name:'Thumb Extension / Abduction', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Thumb+Extension+Abduction-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Thumb+Extension+Abduction-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/thumb-extension-abduction.png', description:'Begin seated with a rubber band over your indicated thumb, between your nail and first joint.  Secure the band with your  other hand, keep your wrist straight and attempt to perform a thumbs up,  lifting your thumb against the resistance.  Return to the start position.  Repeat as prescribed.  ', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Posterior', 'Strengthen', 'Lower Arm']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Duration (secs)', 'Resistance', 'Side']}}).success(function (data) {
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
                    name:'TMJ Isometric Close to Open', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/TMJ+CLOSE+OPEN-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/TMJ+CLOSE+OPEN-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/isometric-close-to-open.png', description:'Begin in an upright position.  With your mouth closed lightly,  place your hands under your jaw on your chin and attempt to open your mouth for 3-5 seconds resisting movement with your hands.   Then relax and repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Stretch', 'Anterior', 'Neck']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)']}}).success(function (data) {
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
                    name:'TMJ Isometric Open to Close', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/TMJ+Open+Close-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/TMJ+Open+Close-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/isometric-open-to-close.png', description:'Begin in an upright position.  Slightly open your mouth and place 2-3 fingers inside resting on your lower front teeth.  Begin trying to close your jaw whilst resisting with your fingers.  Minimize movement at the jaw and hold for 3-5 seconds.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Stretch', 'Anterior', 'Neck']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)']}}).success(function (data) {
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
                    name:'TMJ Protraction', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/TMJ+Protraction-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/TMJ+Protraction-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/tmj-protraction.png', description:'In an upright position gently attempt to move the lower part of your jaw and mouth away from your head and neck in a forward motion.  Then slowly tilt your head backwards extending your neck slightly, noticing the stretch under your jaw.  Hold for the prescribed time.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Stretch', 'Anterior', 'Neck']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)']}}).success(function (data) {
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
                    name:'Toe Curls', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Toe+Curls-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Toe+Curls-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/toe-curls.png', description:'Begin in a seated position with a towel laid flat under your foot.  Attempt to slowly grasp the towel with you toes.  Notice your arch increasing whilst your curl the towel up.  Avoid contracting too hard and keep your heel on the ground.  Release the towel and repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Stretch', 'Lower Legs', 'Anterior', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'Toe Extension', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/Toe+Extension-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/Toe+Extension-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/toe-extension.png', description:'Begin in a seated position keeping your foot flat on the floor.  Attempt to lift your toes upwards without allowing the sole of your foot to lift off the ground.  Try to keep your toes separated.  Repeat as prescribed. ', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Lower Legs', 'Anterior', 'Posterior']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)', 'Side']}}).success(function (data) {
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
                    name:'VMO extension', videoMp4:'https://d2bjomctld7cul.cloudfront.net/videos/VMO+EXTENSION+WITH+PILLOW-HD+720p.mp4.mp4', videoWebM:'https://d2bjomctld7cul.cloudfront.net/videos/VMO+EXTENSION+WITH+PILLOW-HD+720p.webmhd.webm', thumbnail:'https://d2bjomctld7cul.cloudfront.net/thumbnails/vmo-extension.png', description:'Begin seated with a pillow, towel or ball placed between your thighs squeezing slightly.  Slowly begin to straighten your legs keeping your toes pointing up and towards you.  Hold for 2-3 seconds then relax to the start position whilst maintaining the tension between your thighs.  Repeat as prescribed.', videoLength:"5138008"
                }).save().success(function (exercise) {
                        db.Tag_model.findAll({where:{name:['Strengthen', 'Anterior', 'Upper Legs']}}).success(function (tags) {
                            exercise.setTags(tags)
                            db.PrescriptionInfo_model.findAll({where:{name:['Comments', 'Repetitions', 'Sets', 'Frequency (per day)']}}).success(function (data) {
                                exercise.setPrescriptionInfoes(data)
                                exercise.save().success(function (success) {
                                    callback();
                                })
                            })
                        })
                    })
				}], function () {
            //done();
        })
	}

	return this;
}

module.exports().newExerciseObjectsFeb2015();
