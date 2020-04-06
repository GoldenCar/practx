/*var db = require('../models')
    , async = require('async')
    , Sequelize = require('sequelize')
    , Config = require('../config/config.js')
    , config = new Config()
    , sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {host:config.database.host, dialect:config.database.dialect, port:config.database.port, logging: false})
    , db = new db(sequelize)
    , User = require('../user')
    , User = new User(db)
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

describe('Creating a user', function(){
    it('Should create a user', function(done){
        user = {
            name:"Thomas Bunting",
            email: "Thomas1bunting@gmail.com",
            id: 5
           }
        User.saveNewUser(user, function(result){
            expect(result.error).toBe(undefined)
            done();
        })
    })

    it('should fail to create a new user with different parameters', function(done){
        globalUser = {}
        user = {}
        User.saveSelf(globalUser, user, function(result){
            expect(result.error).toBe("An error occurred")
            done();
        })
    })

    it('should create a new user with different parameters', function(done){
        globalUser = {id: '5',
            ClinicId: 1 }
        user = { name:"Thomas Bunting",
            email: "Thomas1bunting@gmail.com",
            emailText: "This is a new email text",
            phone: "0435519526",
            company: "IndustrieIT",
            website: "http://www.google.com",
            address: "2 tea Tree place"
        }
        User.saveSelf(globalUser, user, function(result){
            expect(result.error).toBe(undefined)
            done();
        })
    })

    it('Should delete a user', function(done){
        User.deleteUser(3, function(result){
            expect(result.response).toBe('success')
            done();
        })
    })

    it('should be able to recreate the user', function(done){
        user = { name:"Thomas Bunting",
            email: "Thomas1bunting@gmail.com",
            emailText: "This is a new email text",
            phone: "0435519526",
            company: "IndustrieIT",
            website: "http://www.google.com",
            address: "2 tea Tree place",
            id:5
        }
        User.saveNewUser(user, function(result){
            expect(result.error).toBe(undefined)
            done();
        })
    })

})

describe('Get a user', function(){
    it("Should get a user by his authic id", function(done){
        User.getByAuthicId(28, function(result){
            expect(result).toBe(null)
            done();
        })
    })

    it("Should get all users", function(done){
        User.getAllUsers(function(result){
            expect(result.length).toBe(4)
            done();
        })
    })

    it("Should get user by his id", function(done){
        User.getUser(1, function(result){
            expect(result.name).toBe('Thomas Bunting')
            done();
        })
    })

    it("Should get a patient", function(done){
        User.getPatient(1, 1, function(result){
            expect(result.name).toBe("Thomas Bunting")
            done();
        })
    })
})               */