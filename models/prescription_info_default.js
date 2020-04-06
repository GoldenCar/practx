module.exports = function(sequelize, DataTypes) {
    return sequelize.define("PrescriptionInfoDefault", {
        value: { type: DataTypes.STRING, allowNull: false}
})
}