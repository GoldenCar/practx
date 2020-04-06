module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: { type: DataTypes.STRING, allowNull: true},
        email: { type: DataTypes.STRING, allowNull: false, validate: {isEmail: true}},
        phone: { type: DataTypes.STRING, allowNull: true, validate: {isNumeric: true}}
        , emailText: {type: DataTypes.TEXT, allowNull: true},
    photo: { type: DataTypes.STRING, allowNull: true, validate: {isUrl: true}}
        , permission: {type: DataTypes.STRING, defaultValue: "None"}
        , authicId: {type: DataTypes.STRING, allowNull: true, unique: true}
        , practitionerType: {type: DataTypes.STRING, allowNull: true}
        , clinikoId: { type: DataTypes.STRING, allowNull: true} 
        , isTrial: { type: DataTypes.BOOLEAN, defaultValue: false}
        , referralCode: {type: DataTypes.STRING, allowNull: true}
        , trialEndDate: {type: DataTypes.DATE, allowNull: true}
        , planId: {type:  DataTypes.STRING, allowNull: true}
        , test: {type:  DataTypes.STRING, allowNull: true}
        , lastClinikoSync: {type: DataTypes.STRING, allowNull: true}
    })
    return User;
}