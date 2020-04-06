module.exports = function(sequelize, DataTypes) {
    var Plan = sequelize.define("Plan", {
        code: { type: DataTypes.STRING, allowNull: false, unique: true},
        name: { type: DataTypes.STRING, allowNull: true},
        details: { type: DataTypes.STRING, allowNull: true},
        cycle: { type: DataTypes.STRING, allowNull: true},
        price: { type: DataTypes.STRING, allowNull: true}
    },{
        timestamps: false
    })
    return Plan;
}