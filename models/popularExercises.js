var db = require('../models')
    , async = require('async')
    , Sequelize = require('sequelize')
    , Config = require('../config/config.js')
    , config = new Config()
    , sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {host:config.database.host, dialect:config.database.dialect, port:config.database.port, logging: true})
    , db = new db(sequelize)
    , Exercise = require('../exercise')
    , Exercise = new Exercise(db)
    , populateData = require('../models/populateData.js')
    , populate = new populateData();



Exercise.getAllExercises(function(exercises){
    async.forEach(exercises, function (exercise, callback) {
        db.ExerciseListExercise_model.count({ where: {ExerciseId: exercise.id}}).success(function(count){
            exercise.exerciseListCount = count;
            //console.log(exercise.name + ", " + count)
            var val = "";
            var tagArray = []
            for(tag in exercise.tags){
                tagArray[exercise.tags[tag].id] = exercise.tags[tag].name;
            }

            for(var tag = 0; tag < tagArray.length; tag++){
                if (tagArray[tag])
                    val += tagArray[tag] + ", ";
                else
                    val += ","
            }

            console.log(exercise.name + ", " + count + ", " + val)
            callback();
        })
    }, function(){
        console.log('program end')
    })
})