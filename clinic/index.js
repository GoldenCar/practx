var async = require('async')

function Clinic(model) {
    Clinic.conn = model
}

Clinic.prototype.conn;

Clinic.prototype.getClinic = function(clinicId, done) {
    Clinic.conn.Clinic_model.find({where:{id:clinicId}}).success(function (clinic) {
    	// console.log(clinic)
    	// console.log('clinic-----------')
        done(clinic)
    }).error(function (error) {
        done(error)
    })
}

module.exports = Clinic;