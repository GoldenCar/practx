module.exports = function(sequelize, DataTypes) {
    return sequelize.define("PrescriptionInfoValue", {
        value: { type: DataTypes.STRING, allowNull: false}
})
}