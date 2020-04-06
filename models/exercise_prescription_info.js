module.exports = function(sequelize, DataTypes) {
    return sequelize.define("ExercisePrescriptionInfo", {
        ExerciseId: { type: DataTypes.INTEGER, allowNull: false},
        PrescriptionInfoId: { type: DataTypes.INTEGER, allowNull: false}
    })
}