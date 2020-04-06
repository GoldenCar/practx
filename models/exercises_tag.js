module.exports = function(sequelize, DataTypes) {
    return sequelize.define("ExercisesTags", {
        tagId: { type: DataTypes.INTEGER, allowNull: false},
        exerciseId: { type: DataTypes.INTEGER, allowNull: false}
    })
};