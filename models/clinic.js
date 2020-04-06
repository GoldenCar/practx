module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Clinic", {
        name: { type: DataTypes.STRING, allowNull: true},
        address: { type: DataTypes.STRING, allowNull: true},
        phone: { type: DataTypes.STRING, allowNull: true, validate: {isNumeric: true}},
        website: { type: DataTypes.STRING, allowNull: true, validate: {is: '^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$'}},
        logo: { type: DataTypes.STRING, allowNull: true}
    })
}