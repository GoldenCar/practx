module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Tag", {
        id: { type: DataTypes.INTEGER, allowNull: false},
        name: { type: DataTypes.STRING, allowNull: false}
    })
}