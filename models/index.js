module.exports = function(sequelize) {
    var db = {}
    db.Clinic_model = sequelize.import(__dirname + "/clinic.js")
    db.Tag_model = sequelize.import(__dirname + "/tag.js")
    db.Exercise_model = sequelize.import(__dirname + "/exercise.js")
    db.ExerciseList_model = sequelize.import(__dirname + "/exercise_list.js")
    db.ExercisesTag_model = sequelize.import(__dirname + "/exercises_tag.js")
    db.ExerciseListExercise_model = sequelize.import(__dirname + "/exercise_list_exercise.js")
    db.ExercisePrescriptionInfo_model = sequelize.import(__dirname +"/exercise_prescription_info.js")
    db.User_model = sequelize.import(__dirname +"/users.js")
    db.PrescriptionInfoDefault_model = sequelize.import(__dirname +"/prescription_info_default.js")
    db.PrescriptionInfo_model = sequelize.import(__dirname +"/prescription_info.js")
    db.PrescriptionInfoValue_model = sequelize.import(__dirname +"/prescription_info_value.js")
    db.PatientView_model = sequelize.import(__dirname + "/patientViews.js")    

    db.Plan_model = sequelize.import(__dirname +"/plans.js")

    db.User_model.hasMany(db.ExerciseList_model, {foreignKey:'PatientId'})
    db.User_model.hasMany(db.ExerciseList_model, {foreignKey:'PractitionerId'})

    db.PrescriptionInfo_model.hasMany(db.PrescriptionInfoValue_model)

    db.PrescriptionInfo_model.hasMany(db.PrescriptionInfoDefault_model)

    db.Exercise_model.hasMany(db.PrescriptionInfo_model)

    db.PrescriptionInfo_model.hasMany(db.Exercise_model)
    db.ExerciseListExercise_model.hasMany(db.PrescriptionInfoValue_model)
    db.Exercise_model.hasMany(db.ExerciseListExercise_model)

    db.ExerciseList_model.hasMany(db.ExerciseListExercise_model)

    db.Exercise_model.hasMany(db.Tag_model)

    db.Tag_model.hasMany(db.Exercise_model)

    db.Clinic_model.hasMany(db.User_model)

    db.PrescriptionInfoDefault_model.sync()
    db.PrescriptionInfo_model.sync()
    db.Clinic_model.sync()
    db.User_model.sync()
    db.Tag_model.sync()
    db.Exercise_model.sync()
    db.ExerciseList_model.sync()
    db.PrescriptionInfoValue_model.sync()
    db.ExerciseListExercise_model.sync()
    db.Plan_model.sync()
    db.PatientView_model.sync()

    return db
}