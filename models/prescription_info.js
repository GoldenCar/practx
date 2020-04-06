module.exports = function(sequelize, DataTypes) {
    return sequelize.define("PrescriptionInfo", {
        name: { type: DataTypes.STRING, allowNull: false},
        sentence: { type: DataTypes.STRING, allowNull: false}
    })
}