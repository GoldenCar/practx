     /*
var db = require('../models')
    , async = require('async')
    , Sequelize = require('sequelize')
    , Config = require('../config/config.js')
    , config = new Config()
    , sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {host:config.database.host, dialect:config.database.dialect, port:config.database.port, logging: false})
    , db = new db(sequelize)
    , ExerciseList = require('../exercise_list')
    , ExerciseList = new ExerciseList(db)
    , populateData = require('../models/populateData.js')
    , populate = new populateData();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000

describe('clean database', function () {
    it("Setup database", function (done) {
        populate.cleanFullDB(done);
    });

    it("populate with tags", function(done){
        async.series([
            populate.newTagObjects,
            populate.newPrescriptionObjects,
            populate.newPrescriptionDefaultObjects,
            populate.newExerciseObjects,
            done()
        ]);
    })

    it("populate with clinic", function(done){
        populate.newClinicObjects(done)
    })

    it("populate with user", function(done){
        populate.newUserObjects(done)
    })

    it("populate with el Objs", function(done){
        populate.newExerciseListObjects(done)
    })
});

describe('find exercise', function () {
    it('shdold find by users', function(done){
        ExerciseList.getExerciseListByPatientAndPractitioner(1, 3, function(result){
            console.log(result)
            //expect(result.patient.name).toBe("Foo Barr")
            done();
        })

    })
})
   */
