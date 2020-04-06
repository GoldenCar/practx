
var db = require('../models')
    , async = require('async')
    , Sequelize = require('sequelize')
    , Config = require('../config/config.js')
    , config = new Config()
    , sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {host:config.database.host, dialect:config.database.dialect, port:config.database.port, logging: true})
    , db = new db(sequelize)
    , ExerciseList = require('../exercise_list')
    , ExerciseList = new ExerciseList(db)
    , populateData = require('../models/populateData.js')
    , populate = new populateData();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000
var templates;
var template;
describe('Run Tests', function () {
    it ("should setup the database", function(callback){

        async.series([
            function(done){populate.cleanFullDB(function(){done(null,"")})},
            function(done){populate.newPrescriptionObjects(function(){done(null,"")})},
            function(done){populate.newPrescriptionDefaultObjects(function(){done(null,"")})},
            function(done){populate.newExerciseObjects(function(){done(null,"")})},
            function(done){populate.newTagObjects(function(){done(null,"")})},
            function(done){populate.newClinicObjects(function(){done(null,"")})},
            function(done){populate.newUserObjects(function(){done(null,"")})},
            function(done){populate.newTemplateObjects(function(){done(null,"")})}
        ],
            function(err, results){
                if (err){
                    return;
                }
                callback();
            }
        )
    }, 50000)

    it ("should grab the templates and template", function(callback){

        async.series([
                function(done){
                    ExerciseList.getTemplates( 3, function(result){
                        templates = result; done(null, "")
                    })
                },
                function(done){
                    ExerciseList.getTemplate( 1, function(result){
                        template = result; done(null, "")
                    })
                }
            ],
            function(err, result){
                if (err){
                    return;
                }
                runTests();
                callback();
            }
        )
    })

})


function runTests(){
    describe ("Testing templates", function(){
        it ('checks the number of templates', function(done){
            expect(templates.length).toBe(2);
            done();
        })

        var result;
        var exercise;
        for (var i in templates){
            if (templates[i].id == 1){
                result = templates[i];
                break;
            }
        }

        it ('checks that we have found the template', function(done){
            expect (result).toBeDefined();
            done()
        })

        //Making sure we have the correct template
        if (result){
            it ('checks the number of exercises', function(done){
                expect(result.exercises.length).toBe(3)
                done();
            })

            for (var i in result.exercises){
                if (result.exercises[i].id == 58){
                    exercise = result.exercises[i];
                    break;
                }
            }

            it ('checks that we have found the exercise', function(done){
                expect (exercise).toBeDefined()
                done()
            })


            it ('checks an arbitrary exercise', function(done){

                if (exercise){
                    expect(exercise.id).toBe(58);
                    expect(exercise.name).toBe('Bridge');
                }

                expect(result.selectedValues.id).toBe(1);
                done();
            })


            it ('checks an arbitrary default prescription value of the exercise', function(done){

                if (exercise){
                    expect(exercise.prescriptionData[1].name).toBe('Frequency (per day)');
                    expect(exercise.prescriptionData[1].id).toBe(3);
                    expect(exercise.prescriptionData[1].values.length).toBe(4)
                    expect(exercise.prescriptionData[1].values[0]).toBe('1')
                }

                done();
            })

            it ('checks the arbitrary prescription\'s values', function(done){
                if (exercise){
                    expect(exercise.prescriptionData[1].value).toBe('30')
                }

                done();
            })
        }
    })

    describe('Getting information about template 1', function () {
        var exercise;

        it ('checks that we have found the template', function(done){
            expect (template).toBeDefined();
            done()
        })

        //Making sure we have the correct template
        if (template){
            it ('checks the number of exercises', function(done){
                expect(template.exercises.length).toBe(3)
                done();
            })

            for (var i in template.exercises){
                if (template.exercises[i].id == 58){
                    exercise = template.exercises[i];
                    break;
                }
            }

            it ('checks that we have found the exercise', function(done){
                expect (exercise).toBeDefined()
                done()
            })


            it ('checks an arbitrary exercise', function(done){

                if (exercise){
                    expect(exercise.id).toBe(58);
                    expect(exercise.name).toBe('Bridge');
                }

                expect(template.selectedValues.id).toBe(1);
                done();
            })


            it ('checks an arbitrary default prescription value of the exercise', function(done){

                if (exercise){
                    expect(exercise.prescriptionData[1].name).toBe('Frequency (per day)');
                    expect(exercise.prescriptionData[1].id).toBe(3);
                    expect(exercise.prescriptionData[1].values.length).toBe(4)
                    expect(exercise.prescriptionData[1].values[0]).toBe('1')
                }

                done();
            })

            it ('checks the arbitrary prescription\'s values', function(done){
                if (exercise){
                    expect(exercise.prescriptionData[1].value).toBe('30')
                }

                done();
            })
        }
    });
}
