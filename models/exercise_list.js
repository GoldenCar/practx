async = require('async')

module.exports = function(sequelize, DataTypes) {

    return sequelize.define("ExerciseList", {
        name: { type: DataTypes.STRING, allowNull: false},
        emailText:  { type: DataTypes.TEXT, allowNull: true},
        randomString: {type: DataTypes.TEXT, unique: true},
        status: { type: DataTypes.STRING, allowNull: false, defaultValue: "None" }
    },{
        classMethods: {
        getExercises : function( id, cb ){
            sequelize.query( 'SELECT "Exercises".*, "ExerciseListsExercises"."id" as exerciseListExerciseId FROM "Exercises", "ExerciseListsExercises" WHERE "Exercises"."id" = "ExerciseListsExercises"."ExerciseId" AND "ExerciseListsExercises"."ExerciseListId" = '+id).on('success', cb).on('error', cb)
        },
            getExerciseCount : function( id, cb ){
                sequelize.query( 'SELECT count(*) as count FROM "Exercises" WHERE "id" in (SELECT "ExerciseId" FROM "ExerciseListsExercises" WHERE "ExerciseListId" = '+id+')').on('success', cb).on('error', cb)
            },
                deleteAllByPatientId : function( id, cb ){
                sequelize.query('DELETE FROM "ExerciseLists" WHERE "PatientId" = '+id).on('success', cb).on('error', cb)
            },
            getExerciseListUpdatedLastWeek: function(cb){
                sequelize.query("SELECT es.\"randomString\", u.\"name\" as \"patientName\", u.\"email\" as \"patientEmail\", p.\"name\" as \"practitionerName\", p.\"email\" as \"practitionerEmail\" FROM \"ExerciseLists\" es JOIN \"Users\" u ON es.\"PatientId\" = u.\"id\" JOIN \"Users\" p on es.\"PractitionerId\" = p.\"id\"  WHERE es.\"updatedAt\" >= current_date - interval '7 days' AND es.\"updatedAt\" < current_date - interval '6 days';").on('success', cb).on('error', cb)
            }
        },
        instanceMethods: {
        setExercises: function(exercises, cb){
            var self = this;
            sequelize.query( 'DELETE FROM "ExerciseListsExercises" where "ExerciseListId" = '+self.id).on('success', function(){
                async.forEach(exercises, function(exercise, newCallback){
                sequelize.query('INSERT INTO "ExerciseListsExercises" ("ExerciseListId", "ExerciseId", "createdAt", "updatedAt") VALUES ('+self.id+', '+exercise.id+', to_timestamp('+Date.now()+'), to_timestamp('+Date.now()+'))').on('success', function(){
                    if (exercise.prescriptionData != undefined) {
                        console.log('exercise.prescriptionData : ------------------------ ', exercise.prescriptionData );

                        async.forEach(exercise.prescriptionData, function(prescriptionData, prescriptionCallback){
                            if(prescriptionData.value){
                                sequelize.query('INSERT INTO "PrescriptionInfoValues" ("value", "ExerciseListsExerciseId", "PrescriptionInfoId", "createdAt", "updatedAt") VALUES (\''+prescriptionData.value+'\', (SELECT "id" FROM "ExerciseListsExercises" WHERE "ExerciseListId" = '+self.id+' AND "ExerciseId" = '+exercise.id+'), '+prescriptionData.id+', to_timestamp('+Date.now()+'), to_timestamp('+Date.now()+'))').on('success', function(){
                                    prescriptionCallback();
                                }).on('error', prescriptionCallback)
                            }else{
                                prescriptionCallback();
                            }
                        }, function(){
                            newCallback();
                        })
                    }
                }).on('error', newCallback)
                }, function(){
                    this.exercises = exercises;
                    cb(exercises);
                })
            }).on('error', cb)
        }
    }})
}