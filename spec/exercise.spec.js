/*var db = require('../models')
    , async = require('async')
    , Sequelize = require('sequelize')
    , Config = require('../config/config.js')
    , config = new Config()
    , sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {host:config.database.host, dialect:config.database.dialect, port:config.database.port, logging: false})
    , db = new db(sequelize)
    , Exercise = require('../exercise')
    , Exercise = new Exercise(db)
    , populateData = require('../models/populateData.js')
    , populate = new populateData();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000
//needed to be run in e2e now.
describe('clean database', function () {
    it("Setup database", function (done) {
        populate.cleanDB(done);
    });

    it("populate with tags", function(done){
        populate.newTagObjects(done)
    })

    it("populate with exercises", function(done){
        populate.newExerciseObjects(done)
    })

    it("populate with exercises", function(done){
        populate.newClinicObjects(done)
    })

    it("populate with exercises", function(done){
        populate.newUserObjects(done)
    })
});

describe('Creating an exercise', function () {

    it('Should fail because the database cannot find the exercise id', function (done) {
        exercise = {name:"Value",
            video:"http:/google.com",
            thumbnail:"http://google.com",
            description:"Here is a description",
            videoLength:"24",
            id:100}
        Exercise.saveExercise(exercise, function (result) {
            expect(result.error).toBe('Can not find exercise')
            done()w
        })
    })

    it('Should create a new exercise', function (done) {
        exercise = {name:"Value",
            video:"http:/google.com",
            thumbnail:"http://google.com",
            description:"Here is a description",
            videoLength:"24"}
        Exercise.saveExercise(exercise, function (result) {
            expect(result.name).toBe("Value")
            done()
        })
    })
})

describe("Get an exercise", function () {
    it("Should get and exercise", function (done) {
        Exercise.getExercise(1, function (result) {
            expect(result.name).toBe('Scalenes Anterior')
            done();
        })
    })

    it("Should get all exercises", function(done){
        Exercise.getAllExercises(function(result){
            expect(result.length).toBe(23)
            done();
        })
    })
})*/