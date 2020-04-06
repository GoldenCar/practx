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


async.series([
    populate.cleanDB,
    populate.newTagObjects,
    populate.newPrescriptionObjects,
    populate.newPrescriptionDefaultObjects,
    populate.newExerciseObjects
]);
