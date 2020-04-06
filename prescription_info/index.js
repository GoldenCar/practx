var async = require('async');

function PrescriptionInfo(model) {
    PrescriptionInfo.conn = model;
}

PrescriptionInfo.prototype.conn;

PrescriptionInfo.prototype.getAllPrescriptions = function (done) {
    PrescriptionInfo.conn.PrescriptionInfo_model.findAll({attributes:['name', "sentence", 'id']})
        .success(function (prescriptionInfoes) {
            done({data: prescriptionInfoes});
        }).error(function (error) {
            done({error:"an error has occurred"});
        })
};

module.exports = PrescriptionInfo;