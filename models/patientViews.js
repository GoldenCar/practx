module.exports = function(sequelize, DataTypes) {
    return sequelize.define("PatientView", {
        patientName: { type: DataTypes.STRING, allowNull: true},
        patientEmail: { type: DataTypes.STRING, allowNull: true},
        patientId: { type: DataTypes.INTEGER, allowNull: false},
        practitionerName: { type: DataTypes.STRING, allowNull: true},  
        practitionerEmail: { type: DataTypes.STRING, allowNull: true},    
        createdAt: { type: DataTypes.STRING, allowNull: true},  
        updatedAt: { type: DataTypes.STRING, allowNull: true},     
        exerciseCount: { type: DataTypes.INTEGER, allowNull: true},        
        randomString:{ type: DataTypes.STRING, unique: true},
        clinicName: { type: DataTypes.STRING, allowNull: true},        
        clinicPhone: { type: DataTypes.STRING, allowNull: true, validate: {isNumeric: true}},
        clinicWebsite: { type: DataTypes.STRING, allowNull: true, validate: {is: '^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$'}},
        clinicAddress:  { type: DataTypes.STRING, allowNull: true},
    })
}