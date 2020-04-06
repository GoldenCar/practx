
function PatientView(model) {
    PatientView.conn = model;
}

PatientView.prototype.conn

PatientView.prototype.save = function (data, done) {
    var patientView = PatientView.conn.PatientView_model.build({
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        patientId: data.patientId,
        practitionerName: data.practitionerName,
        practitionerEmail:data.practitionerEmail,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        exerciseCount: data.exerciseCount,
        randomString: data.randomString,
        clinicName: data.clinicName,
        clinicAddress: data.clinicAddress,
        clinicPhone: data.clinicPhone,
        clinicWebsite: data.clinicWebsite,
    });

    patientView.save().success(function (patientView) {
            done(patientView);
        }).error(function (error) {
                console.log(error)
                done({error:"An error has occurred"});
            })
}
module.exports = PatientView
