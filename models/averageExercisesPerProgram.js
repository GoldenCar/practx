var db = require('../models')
    , async = require('async')
    , Sequelize = require('sequelize')
    , Config = require('../config/config.js')
    , config = new Config()
    , sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {host:config.database.host, dialect:config.database.dialect, port:config.database.port, logging: false, native: true})
    , db = new db(sequelize)
    , Exercise = require('../exercise')
    , Exercise = new Exercise(db)
    , populateData = require('../models/populateData.js')
    , populate = new populateData();

var sum = 0;


db.ExerciseList_model.findAll().success(function(programs){
    async.forEach(programs, function (program, callback) {
        db.ExerciseList_model.getExerciseCount(program.id, function(count){
            sum += count[0].count;
            callback()
        })
    }, function(){
        console.log(sum / programs.length)
    })
})