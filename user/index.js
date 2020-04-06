var async = require('async')
    , https = require('https')
    , AWS = require('aws-sdk')
    , fs = require('fs')
    , util = require('util');

var AWS_ACCESS_KEY = 'AKIAJSZUK74PEUTK7GGA';
var AWS_SECRET_KEY = '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';
AWS.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});

function User(model, ExerciseList, Plan, sequelize) {
    User.ExerciseList = ExerciseList;
    User.Plan = Plan;
    User.conn = model;
    User.sequelize = sequelize;
}

User.prototype.conn
User.prototype.ExerciseList
User.prototype.sequelize

User.prototype.updateUserPlan = function(body, done) {
    if (!body.id) {
        return done({error:"An error occurred"})
    }
    async.parallel([
        function (callback) {
            User.conn.User_model.find({where:{id:body.id}}).success(function (user) {
                if (user == null || !user) {
                    return callback(null, null)
                }

                user.emailText = body.emailText;
                user.planId = body.planId;
                user.authicId = body.authicId;
                user.attributes = ['permission', 'name', 'email', 'authicId', 'ClinicId', 'createdAt', 'updatedAt', 'id', 'isTrial', 'referralCode', 'trialEndDate', 'planId'];

                user.save().success(function (userResult) {
                    console.log('save user plan successfully');
                    callback(null, userResult)
                }).error(function (error) {
                    callback(error, null)
                })
            });
        }], function (err, results) {
        if (!err) {
            done(results);
        }
        else
            done({error:"An error has occurred"});
    })

};

User.prototype.saveSelf = function (globalUser, body, done) {
    if (!globalUser.id) {
        return done({error:"An error occurred"})
    }
    async.parallel([
        function (callback) {
            User.conn.User_model.find({where:{id:globalUser.id}}).success(function (user) {
                    if (user == null || !user) {
                        return callback(null, null)
                    }
                    user.name = body.name
                    user.email = body.email
                    user.practitionerType = body.practitionerType;
                    if (user.permission == "signup") {
                        user.permission = "Practitioner"
                        globalUser.permission = "Practitioner"
                    }
                    user.emailText = body.emailText
                    user.permission = user.permission
                    user.clinikoId = body.clinikoId
                    user.attributes = ['emailText', 'permission', 'name', 'email', 'practitionerType', 'clinikoId']
                    user.save().success(function (user) {
                        globaluser=user;
                        callback(null, user)
                    }).error(function (error) {
                            callback(error, null)
                        })
                }
            )
        },
        function (callback) {
            User.conn.Clinic_model.find({where:{id:globalUser.ClinicId}}).success(function (clinic) {
                if (!clinic) {
                    callback(null, null)
                }
                clinic.phone = body.phone;
                clinic.name = body.company;
                clinic.website = body.website;
                clinic.logo = body.logo;
                clinic.address = body.address;
                clinic.save().success(function (clinic) {
                    callback(null, clinic)
                }).error(function (error) {
                        callback(error, null)
                    })
            })
        }
    ], function (err, results) {
        if (!err)
            done({data:"success"})
        else
            done({error:"An error has occurred"})
    })
}

User.prototype.deleteUser = function (userId, done) {
    if (userId) {
        User.conn.User_model.find({
            where:{id:userId}
        }).success(function (user) {
                user.destroy().success(function () {
                    done({response:"success"})
                }).error(function (error) {
                        done({error:"An error occurred"})
                    })
            })
    }
    else {
        done({error:"An error occurred"})
    }
}

User.prototype.deleteUserAsPractitioner = function (globalUser, userId, done) {
    User.conn.User_model.find({
        where:{id:userId}
    }).success(function (user) {
            if (user.ClinicId == globalUser.ClinicId && user.permission == "None") {
                async.parallel([
                    function (callback) {
                        user.attributes = ["name","email","phone","emailText","photo","permission","authicId","practitionerType","id","createdAt","updatedAt","ClinicId","clinikoId"]
                        user.permission = "deletedPatient"
                        user.save().success(function () {
                            callback(null, {data:"User has been deleted"})
                        }).error(function () {
                                callback(null, {error:"An error has occurred"})
                            })
                    }], function (error, results) {
                    done(results[0])
                });
            } else {
                done({error:"You do not have permission to delete this user"})
            }
        }).error(function () {
            done({error:"An error has occurred"})
        })
}

User.prototype.saveUserAsPatient = function (globalUser, body, done) {
    if (body.error) {
        delete body.error;
    }
    if (body.id) {
        User.conn.User_model.find({where:{id:body.id, ClinicId:globalUser.ClinicId}}).success(function (existingUser) {
            User.conn.User_model.find({where:{ClinicId:globalUser.ClinicId, email:body.email}}).success(function (user) {
                if (existingUser) {
                    if (user) {

                        if (user.id != existingUser.id) {
                            body.error = "Email address already in use."
                            return done(body)
                        } else {
                            if (existingUser.ClinicId == globalUser.ClinicId) {
                                existingUser.clinikoId = body.clinikoId
                                existingUser.name = body.name
                                existingUser.email = body.email
                                existingUser.permission = "None"
                                existingUser.attributes = ['name', 'email', 'phone',  'emailText', 'photo',  'permission', 'authicId',  'practitionerType', 'id', 'createdAt', 'updatedAt', 'ClinicId', 'clinikoId']
                                existingUser.save().success(function (user) {
                                    done(user)
                                }).error(function (error) {
                                        done(error)
                                    })
                            } else {
                                body.error = "You cannot edit this user";
                                done(body)
                            }
                        }
                    } else {
                        if (existingUser.ClinicId == globalUser.ClinicId) {
                            existingUser.clinikoId = body.clinikoId
                            existingUser.name = body.name
                            existingUser.email = body.email
                            existingUser.permission = "None"
                            existingUser.attributes = ['name', 'email', 'phone',  'emailText', 'photo',  'permission', 'authicId',  'practitionerType', 'id', 'createdAt', 'updatedAt', 'ClinicId', 'clinikoId']
                            existingUser.save().success(function (user) {
                                done(user)
                            }).error(function (error) {
                                    done(error)
                                })
                        } else {
                            body.error = "You cannot edit this user";
                            done(body)
                        }
                    }
                } else {
                    body.error = "You cannot edit this user";
                    done(body)
                }
            })
        })
    } else {
        User.conn.User_model.find({where:{ClinicId:globalUser.ClinicId, email:body.email}}).success(function (user) {
            if (user) {
                if (user.permission == "deletedPatient") {
                    user.attributes = ["name","email","phone","emailText","photo","permission","authicId","practitionerType","id","createdAt","updatedAt","ClinicId","clinikoId"]
                    user.permission = "None",
                    user.name = body.name
                    user.save().success(function (user) {
                        console.log("readded formally deleted")
                        done({id: user.id, name: user.name, email: user.email, exerciseList: {status: "None", patient: {id: user.id, email: user.email}}})
                    }).error(function () {
                        done("An error has occurred")
                    })
                } else { 
                    body.error = "Email address already in use."
                    return done(body)
                }
            } else {
                console.log('--patient not found--');
                var user = User.conn.User_model.build(body)
                user.ClinicId = globalUser.ClinicId
                user.clinikoId = body.clinikoId
                user.attributes = ['name', 'email', 'phone',  'emailText', 'photo',  'permission', 'authicId',  'practitionerType', 'id', 'createdAt', 'updatedAt', 'ClinicId', 'clinikoId']
                user.save().success(function (user) {
                    done({id: user.id, name: user.name, email: user.email, exerciseList: {status: "None", patient: {id: user.id, email: user.email}}})
                }).error(function (error) {
                        console.log(error)
                        done({error: "An error has occurred"})
                    })
            }
        })
    }
}

User.prototype.uploadLogo = function (body, done) {
    var s3Bucket = new AWS.S3( { params: {Bucket: 'practx/logo/' + process.env.NODE_ENV} } );
    var buf = new Buffer(body.logo.replace(/^data:image\/\w+;base64,/, ""),'base64');
    var data = {
        Key: body.fileName,
        Body: buf,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: 'image/' + body.fileName.split('.')[1]
    };

    s3Bucket.putObject(data, function(err, data){
        console.log("Successfully uploaded data to practx/logo/" + process.env.NODE_ENV + "/" + body.fileName);
        done({status: 'success', fileName: body.fileName});
    });
};

User.prototype.uploadVideos = function (body, done) {
    var s3Bucket = new AWS.S3( { params: {Bucket: 'practx/videos/customVideos/' + process.env.NODE_ENV + '/' + body.practitionerId} } );
    var buf = new Buffer(body.video.replace(/^data:video\/\w+;base64,/, ""),'base64');
    var thumbnailBuf = new Buffer(body.thumbnail.replace(/^data:image\/\w+;base64,/, ""),'base64');

    var vidData = {
        Key: body.name,
        Body: buf,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: 'video/' + body.name.split('.')[1]
    };

    var thumbnailData = {
        Key: body.name.split('.')[0] + '.png',
        Body: thumbnailBuf,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: 'video/png'
    };

    s3Bucket.putObject(thumbnailData, function(err, data){
        console.log("Successfully uploaded data to practx/video/customVideos/" + process.env.NODE_ENV + "/" + body.practitionerId + '/' + thumbnailData.Key);
    });

    s3Bucket.putObject(vidData, function(err, data){
        console.log("Successfully uploaded data to practx/video/customVideos/" + process.env.NODE_ENV + "/" + body.practitionerId + '/' + vidData.Key);

        done({
            status: 'success',
            name: body.name,
            userId: body.practitionerId,
            videoMp4: 'https://s3.amazonaws.com/practx/videos/customVideos/' + process.env.NODE_ENV + '/' + body.practitionerId + '/' + vidData.Key,
            thumbnail: 'https://s3.amazonaws.com/practx/videos/customVideos/' + process.env.NODE_ENV + '/' + body.practitionerId + '/' + thumbnailData.Key
        });
    });
};

User.prototype.getSelf = function (globaluser, done) {
    async.parallel([
        function (callback) {
            User.conn.Clinic_model.find(globaluser.ClinicId).success(function (data) {
                callback(null, data)
            }).error(function (error) {
                    callback(error, null)
                })
        },
        function (callback) {
        //'SELECT distinct(u."id"), u."name", u."email", u."ClinicId", u."clinikoId", e."id" as exerciseListId, e."name", e."emailText", e."randomString", e."status", e."createdAt", e."updatedAt", e."PatientId", e."PractitionerId", (SELECT count(*) as count FROM "Exercises" WHERE "id" in (SELECT "ExerciseId" FROM "ExerciseListsExercises" WHERE "ExerciseListId" = e."id")) as exerciseCount FROM "Users" u left outer join "ExerciseLists" e on (u."id" = e."PatientId" ) WHERE u."ClinicId"= ? AND u."permission" = ? and (e."PractitionerId" is null or e."PractitionerId" = ?)'
        User.sequelize.query(
            'SELECT u."id", ' +
                'u."name", ' +
                'u."email", ' +
                'u."ClinicId", ' +
                'u."clinikoId", ' +
                'e."id" as exerciseListId, ' +
                'e."name" as ename, ' +
                'e."emailText", ' +
                'e."randomString", ' +
                'e."status", ' +
                'e."createdAt", ' +
                'e."updatedAt", ' +
                'e."PatientId", ' +
                'e."PractitionerId", ' +
                '(SELECT count(*) as count ' +
                    'FROM "Exercises" ' +
                    'WHERE "id" in ' +
                    '(SELECT "ExerciseId" FROM "ExerciseListsExercises"' +
                        'WHERE "ExerciseListId" = e."id")) as exerciseCount ' +
                'FROM "Users" u ' +
                'LEFT OUTER JOIN ' +
                    '(select e1.* from "ExerciseLists" ' +
                        'e1 join ' +
                            '(select max(e."updatedAt") as "updatedAt", ' +
                                'e."PatientId", ' +
                                'e."PractitionerId" ' +
                                'from "ExerciseLists" ' +
                                'e where e."PractitionerId" = ? group by e."PatientId", e."PractitionerId") g ' +
                        'on (e1."PatientId" = g."PatientId" and ' +
                            'e1."PractitionerId" = g."PractitionerId" and ' +
                            'e1."updatedAt" = g."updatedAt") where e1."PractitionerId" = ? ) e ' +
                        'on (u."id" = e."PatientId" ) ' +
                'WHERE u."ClinicId"= ? AND u."permission" = ? and ' +
                    '(e."PractitionerId" is null or e."PractitionerId" = ?)'
            , null
            , {raw: true}
            , [globaluser.id, globaluser.id, globaluser.ClinicId, 'None', globaluser.id]
        ).done(function (metadata, results) {
                async.forEach(results, function (patient, callback) {
                    // if (patient) {
                        if (!patient.error) {  
                            patient.exerciseList = {}
                            //patient.attributes.push('exerciseList');
                            if(patient.exerciselistid != null) {
                                patient.exerciseList.name = patient.ename;
                                patient.exerciseList.emailText = patient.emailText;
                                patient.exerciseList.randomString = patient.randomString;
                                patient.exerciseList.id = patient.exerciseListId;
                                patient.exerciseList.status = patient.status;
                                patient.exerciseList.createdAt = patient.createdAt;
                                patient.exerciseList.updatedAt = patient.updatedAt;
                                patient.exerciseList.PatientId = patient.PatientId;
                                patient.exerciseList.PractitionerId = patient.PractitionerId;
                                patient.exerciseList.exerciseCount = patient.exerciseCount;
                                
                            }
                            else {
                                patient.exerciseList.status = "None";
                            }
                            delete patient.ename;
                            delete patient.emailText;
                            delete patient.randomString;
                            delete patient.exerciselistid;
                            delete patient.status;
                            delete patient.createdAt;
                            delete patient.updatedAt;
                            delete patient.PatientId;
                            delete patient.PractitionerId;
                            delete patient.exercisecount;
                            callback();
                            // if (patient.exerciseListId.status) {
                            //     patient.exerciseList.status = "None";
                            // }
                            // patient.attributes.push('exerciseList')
                            // callback();
                        } else {
                            callback(result)
                        }
                    // } else {
                    //     callback();
                    // }

                }, function (err) {
                    callback(null, results)
                });
            })
        },
        function (callback) {
            User.conn.User_model.find({where:{id:globaluser.id}}).success(function (users) {
                User.Plan.getByPlanId(users.planId, function (plan){
                    if(plan) {
                        users.plan = {"name":plan.name, "description":plan.details, "cycle":plan.cycle, "price":plan.price, "allowUpload": plan.allowUpload};
                    }
                    callback(null, users)
                });
                
            }).error(function (error) {
                callback(error, null)
            })
        }], function (err, results) {
        if (err) {
            done({error:"An error has occurred"})
        } else {
            done(
            {
                "name":results[2].name,
                "clinikoId":results[2].clinikoId,
                "email":results[2].email,
                "phone":results[0].phone,
                "photo":results[2].photo,
                "address":results[0].address,
                "company":results[0].name,
                "website":results[0].website,
                "logo":results[0].logo,
                "emailText":results[2].emailText,
                "practitionerType": results[2].practitionerType,
                "id":globaluser.id,
                "ClinicId":globaluser.ClinicId,
                "Patients":results[1],
                "isTrial":results[2].isTrial,
                "trialEndDate":results[2].trialEndDate,
                "referralCode":results[2].referralCode,
                "planId":results[2].planId,
                "plan":results[2].plan
            })
        }
    })
}

User.prototype.saveNewUser = function (profile, done) {
    user = undefined;
    var user = User.conn.User_model.build({
        email:profile.username,
        permission:"practitioner",
        isTrial: profile.isTrial,
        name: profile.displayName,
        authicId:profile.id,
        planId: profile.planId,
        referralCode: profile._json.referral_code,
        trialEndDate: profile.trialEndDate
    });

    var clinic = User.conn.Clinic_model.build({
        name:profile._json.company_name
    })
    clinic.save().success(function (clinic) {
        user.ClinicId = clinic.id
        user.attributes = ['permission', 'name', 'email', 'authicId', 'ClinicId', 'createdAt', 'updatedAt', 'id', 'isTrial', 'referralCode', 'trialEndDate', 'planId']
        user.save().success(function (user) {
            done(user);
        }).error(function (error) {
                console.log(error)
                done({error:"An error has occurred"});
            })
    }).error(function (error) {

            le.log(error)
            done({error:"An error has occurred"});
        })
}

User.prototype.getByAuthicId = function (id, callback) {
    User.conn.User_model.find({
        where:{authicId:id}
    }).success(function (user) {
            callback(user)
        }).error(function () {
            callback({error:"error"})
        })
}

User.prototype.getAllUsers = function (done) {
    User.conn.User_model.findAll({attributes:['id' , "email" , "phone", "photo" , "name", "permission"]})
        .success(function (users) {
            done(users)
        }).error(function (error) {
            done({error:"an error has occurred"})
        })
}


User.prototype.getPatient = function (clinicId, userId, done) {
    User.conn.User_model.find({where:{id:userId, permission:"None", ClinicId:clinicId}, attributes:['id' , "email" , "phone", "photo" , "name", "permission"]}).success(function (user) {
        done(user)
    }).error(function (error) {
            done({error:"An error has occurred"})
        })
}


User.prototype.getUser = function (userId, done) {
    User.conn.User_model.find({where:{id:userId}, attributes:['id' , "email" , "phone", "photo" , "name", "permission", "ClinicId", "clinikoId", "lastClinikoSync"]}).success(function (user) {
        done(user)
    }).error(function (error) {
        done(error)
    })
}

// added
User.prototype.getUserByEmail = function (email, done) {
    User.conn.User_model.find({where:{email:email}, attributes:['id' , "email" , "phone", "photo" , "name", "permission", "clinikoId"]}).success(function (user) {
        done(user)
    }).error(function (error) {
            done(error)
        })
}

User.prototype.getUserByClinikoId = function (clinikoId, done) {
    //console.log("in find by cliniko id");
    User.conn.User_model.find({where:{clinikoId:clinikoId}, attributes:['id' , "email" , "phone", "photo" , "name", "permission", "clinikoId", "updatedAt"]}).success(function (user) {
        done(user)
    }).error(function (error) {
            done(error)
        })
}

User.prototype.getPatientsForClinic = function (clinicId, done) {
    User.conn.User_model.findAll({where:{ClinicId: clinicId, permission:"None"}, attributes:['id' , "email" , "name", "clinikoId"]}).success(function (users) {
        done(users)
    }).error(function(error) {
        done(error)
    })

}

User.prototype.upgradeToPaidUser = function (userId, planId, done) {
    User.conn.User_model.find({where:{id:userId}, attributes:['planId', 'isTrial']}).success(function (user) {
            user.planId = planId
            user.isTrial = false

            user.attributes = ['planId', 'isTrial']
            user.save().success(function (user) {
                done(user)
            }).error(function (error) {
                done(error)
            })
        }
    )
}

User.prototype.addPlanId = function (id, planId, done) {
    User.conn.User_model.find({where:{authicId:id}}).success(function (user) {
        user.planId = planId;
        user.attributes = ['planId']
        user.save().success(function (user) {
            done(user)
        }).error(function (error) {
            done(error)
        })
    }
    )
}

User.prototype.updateLastClinikoSyncDate = function (userId, clinikoSyncAt, done) {
    User.conn.User_model.find({where:{id:userId}}).success(function (user) {
        user.lastClinikoSync = clinikoSyncAt;
        user.attributes = ['lastClinikoSync']
        user.save().success(function (user) {
            done(user)
        }).error(function (error) {
            done(error)
        })
    }
    )
}

module.exports = User
