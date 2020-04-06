/* newrelic = require('newrelic')
, */

var AWS = require('aws-sdk')
    , express = require('express')
    , bodyParser = require('body-parser')
    , path = require('path')
    , fs = require('fs')
    , async = require('async')
    , ejs = require('ejs')
    , gzippo = require('gzippo')
    , User = require('./user')
    , Tag = require('./tag')
    , Exercise = require('./exercise')
    , ExerciseList = require('./exercise_list')
    , PrescriptionInfo = require('./prescription_info')
    , db = require('./models')
    , Sequelize = require('sequelize')
    , passport = require('passport')
    , AuthicStrategy = require('passport-authic').Strategy
    , Config = require('./config/config.js')
    , SendGrid = require('sendgrid').SendGrid
    , sendgrid = new SendGrid('support@practx.com','WHAtrBK4gGk8&7jkhl*(&(')
    , NodeTIme = require('nodetime').profile({
        accountKey: '7ca881fb6b1123516c0158e185f197240b868298',
        appName: 'PracTX'})
    , EventLogging = require('./event_logging')
    , https = require('https')
    , request = require('request')
    , arrayPrototypeFind = require('array.prototype.find')
    , moment = require('moment')
    , Plan = require('./plan')
    , MCapi = require('mailchimp-api')
    , mandrill = require('mandrill-api/mandrill')
    , Clinic = require('./clinic')
    , session = require('express-session')
    , cookieSession = require('cookie-session')
    , util = require('util');


var AWS_ACCESS_KEY = 'AKIAJSZUK74PEUTK7GGA';
var AWS_SECRET_KEY = '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';

AWS.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});

config = new Config();
var sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {host: config.database.host, dialect: config.database.dialect, port: config.database.port, logging: true, native: true})
db = new db(sequelize)
clinic = new Clinic(db)
ExerciseList = new ExerciseList(db, clinic)
Exercise = new Exercise(db);
Tag = new Tag(db);
PrescriptionInfo = new PrescriptionInfo(db);
Plan = new Plan(db);
User = new User(db, ExerciseList, Plan, sequelize)
eventLogging = new EventLogging(User);


mc = new MCapi.Mailchimp(config.mailchimp.apiKey);
md = new mandrill.Mandrill(config.mandrill.apiKey);

//run local: NODE_ENV='development' TRIAL_PLANS='DSFASEF2342N4,DSFASEF2342N42,TRIALPLAN' node server 

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new AuthicStrategy({
        clientID: config.authic.clientId,
        clientSecret: config.authic.secretKey,
        callbackURL: config.authic.callback,
        subdomain: config.authic.subdomain
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            User.getByAuthicId(profile.id, function (result) {
                user = undefined;
                if (!result) {
                    profile.planId = profile._json.groups[1];
                    profile.isTrial = isTrialPlan(profile._json.groups);
                    if (profile.isTrial) {
                        var endDate = moment().add(30, 'days').format();
                        profile.trialEndDate = endDate;

                        addToMailchimpList(config.mailchimp.trialListId, profile._json.email, profile._json.first_name, profile._json.last_name, profile._json.referral_code);
                    }
                    else {
                        addToMailchimpList(config.mailchimp.subscribedListId, profile._json.email, profile._json.first_name, profile._json.last_name, null);
                    }
                    User.saveNewUser(profile, function (userResult) {
                        if (!userResult.error){
                            if (profile._json.groups.indexOf(config.authic.plans.offer) != -1){
                                userResult.showThankyou = true;

                                var htmlemail = "<p>Congratulations " + userResult.name +" on making a great decision to benefit from using PracTX in your practice. Welcome to the family.</p><br>"+
                                    "<p>We love this application and we love our PracTx users.  So, what's next?</p>"+
                                    "<p>The most important thing you can do right now is start using PracTx.  Set up a few patients, or start with yourself if you're still new to it.</p>"+
                                    "<p>And most of all, send out your first set of exercises and enjoy receiving the email and watching the videos … because this is what your patients will experience … and they'll thank you.</p>"+
                                    "<p>The value in PracTX comes from continual use, by making a habit of using it with most patients.</p>"+
                                    "<p>We'll keep in touch with you regularly, to make sure everything is working as it should.</p>"+
                                    "<p>Our primary concern is that you get the value out of the application and that your patients get improved outcomes.</p>"+
                                    "<p>Lastly, could we ask you a small favour?  Now that you've purchased your copy, would you mind sharing this opportunity with your friends and colleagues ... we'd really appreciate it.  Either just forward this email to someone you know would benefit, or use the social media icons below to share on facebook, twitter, or Google+</p>"+
                                    "<br><p>Regards and thanks again ...</p>"+
                                    "<p>Themos</p>"+
                                    '<a href="https://plus.google.com/share?url=https%3A%2F%2Fwww.practx.com" onclick="javascript:window.open(this.href, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600");return false;">'+
                                    '<img src="https://www.gstatic.com/images/icons/gplus-32.png" alt="Share on Google+"/></a>&nbsp;'+
                                    '<a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.practx.com" target="_blank">'+
                                    '<img src="https://cdn1.iconfinder.com/data/icons/WPZOOM_Social_Networking_Icon_Set/32/facebook.png" alt="Share on Facebook"/></a>&nbsp;'+
                                    '<a href="http://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.practx.com&text=I just purchased PracTx!" target="_blank">'+
                                    '<img src="https://cdn1.iconfinder.com/data/icons/WPZOOM_Social_Networking_Icon_Set/32/twitter.png" alt="Share on Twitter"/></a><br><br>';

                                sendgrid.send({
                                    to: userResult.email,
                                    fromname: "PracTx",
                                    from: "support@practx.com",
                                    subject: "Congratulations on getting PracTx",
                                    html: htmlemail
                                }, function (success, message) {
                                    if (!success) {
                                        console.log(message)
                                    }
                                })
                                
                            }
                            return done(null, userResult)
                        }
                        else 
                            return done(null, null)
                    })
                }
                else if (result.error)
                    return done(null, null)
                else if (result.isTrial && !isTrialPlan(profile._json.groups)) {
                    User.upgradeToPaidUser(result.id, profile._json.groups[1], function (result) {
                        addToMailchimpList(config.mailchimp.subscribedListId, result.email, result.first_name, result.last_name, null);
                    });
                    return done(null, result)
                }
                else if (!result.planId && profile._json.groups[1]) { 
                    User.addPlanId(profile.id, profile._json.groups[1], function() {
                        User.getByAuthicId(profile.id, function (result) {
                            return done(null, result)
                        })
                    });
                }
                else {
                    var body = {
                        id: result.selectedValues.id,
                        emailText : profile._json.email,
                        planId : profile._json.groups[1],
                        authicId: profile._json.id
                    };

                    console.log('update plan for authicId ---- ', body.authicId);

                    User.updateUserPlan(body, function (updatePlanResult) {
                        return done(null, result)
                    });
                }
            })
        });
    }
));

var app = express()
//app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(gzippo.staticGzip(__dirname + "/public"), {clientMaxAge: 500, maxAge: 500})
app.set("view options", {
    layout: false
})
/* if(session){ */

    app.use(cookieSession({
        name:'session-cookie',
        secret: 'lolimapenguin',
      
        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      }))

    /* app.use(session({
        key: 'user_sid',
        secret: 'lolimapenguin',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true, expires: 600000 }
      }))
      app.use(function(req, res, next){
        if (req.cookies.user_sid && !req.session.user) {
            res.clearCookie('user_sid');        
        }
        next();
    }); */
/* }else{
    app.use(express.session({ secret: 'lolimapenguin' }));    
} */


app.use(passport.initialize());
app.use(passport.session());
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

app.get('/config/subdomain', ensureSec,  authorized(), function (request, response) {
    response.json({url:"https://" + config.authic.subdomain + '.authic.com/edit'});
})

app.get('/auth/authic', ensureSec,  passport.authenticate('authic'));

app.get('/auth/callback', ensureSec,
    passport.authenticate('authic', { failureRedirect: '/#/' }),
    function (req, res) {
        if(req.user.showThankyou){
            res.redirect('/thankyou');
        }else{
            res.redirect('/#/');
        }
    });

app.get('/signup', ensureSec, function (req, res) {
    var plan = config.authic.plans.main;
    if (req.query.offer && process.env.OFFER_STRING){
        plan = config.authic.plans.offer;
    }
    res.redirect("https://" + config.authic.subdomain + '.authic.com/activate_plan/'+plan);
});

app.get('/signup_iframe', ensureSec, function (req, res) {
    var plan = config.authic.plans.main;
    if (req.query.plan){
       plan = req.query.plan;
    }
    else if (req.query.offer && process.env.OFFER_STRING){
        plan = config.authic.plans.offer;
    }
    else if(req.query.trial) {
        plan = config.authic.plans.trial;
    }
    
    var iframe = '?iframe_flow=true'; 
    if (req.query.referral_code) {
        // if (req.query.referral_code) {
            iframe = '?iframe=true';
        // }
        iframe = iframe + "&referral_code=" +req.query.referral_code;
    } 
    res.redirect("https://" + config.authic.subdomain + '.authic.com/activate_plan/'+plan+iframe);
});

app.get('/movetopaidplan', ensureSec, function (req, res) {
    var plan = config.authic.plans.association;
    if (req.query.code == 'stdTrial') { 
        plan = config.authic.plans.main;
        res.redirect('https://' + config.authic.subdomain + '.authic.com/activate_plan/'+plan);
    } else if (req.query.code != 'stdTrial') {
        res.redirect('/offerpricing');
    } else {
        res.redirect('https://' + config.authic.subdomain + '.authic.com/activate_plan/'+plan);
    }
}); 

app.get('/login', function (req, res) {
    res.redirect('/auth/authic');
});

app.get('/logout', function (req, res) {
    req.logout();
    //console.log('logout called');
    // Set this to whereever you want to redirect to after authic has signed out
    var return_url = encodeURIComponent("http://localhost:3000");
    res.redirect('https://' + config.authic.subdomain + '.authic.com/authic_sign_out?&return_url=' + config.authic.logoutRedirect);
});

function addToMailchimpList(listId, email, fname, lname, refCode) {
    //mailchimp
    //'101f787f74' trial list
    //'92b9bdf1d5' paid list
    var mcReq = {
        id: listId,
        email: { email: email },
        double_optin: false,
        merge_vars: {
            EMAIL: email,
            FNAME: fname,
            LNAME: lname
        }
    };

    if(refCode != null) {
        mcReq.merge_vars.groupings = [{name:'Trial Types', groups:[refCode]}]
    }

    if (listId == config.mailchimp.subscribedListId) {
        //unsub from trial list
        var mcUsReq = {
            id: config.mailchimp.trialListId,
            email: { email: email },
            send_goodbye: false,
            send_notify: false
        };

        mc.lists.unsubscribe(mcUsReq, function(data) {
            console.log("mailchimp unsub success");
        }, function(error) {
            console.log("mailchimp unsub error");
            console.log(error);
        });
    }

    // submit subscription request to mailchimp
    mc.lists.subscribe(mcReq, function(data) {
    }, function(error) {
        console.log("mailchimp output error");
        console.log(error);
    });
}

function restrictTo(role) {
    return function (request, response, next) {
        if (request.user.permission == role) {
            next()
        } else {
            response.json({error: "Unauthorised"})
        }
    }
}

function authorized() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.json({error: "Unauthorised"})
    }
}

function ensureSec(req, res, next) {
    
    if ((process.env.NODE_ENV != "production" && process.env.NODE_ENV != "staging") || process.env.REQUIRE_SSL != 'true'){
        //Localhost can't have ssl etc...
        return next();
    }
    if (req.headers['x-forwarded-proto'] == 'https') {
        if (req.headers.host.indexOf("www.") == 0 || process.env.NODE_ENV == "staging"){
            return next();
        }
        else{
            res.redirect('https://www.' + req.headers.host + req.url);
        }
    } else {
        if (req.headers.host.indexOf("www.") == 0 || process.env.NODE_ENV == "staging"){
            res.redirect('https://' + req.headers.host + req.url);
        }
        else{
            res.redirect('https://www.' + req.headers.host + req.url);
        }
    }
}

function pageSelector(request, response, next) {
    //console.log('called page selector');
    var r = require('ua-parser').parse(request.headers['user-agent']);
    var ua = request.headers['user-agent'];
    if (r.family == "IE" && r.major < '9') {
        response.render('fail.html')
    } else {
        if (!request.user) {
            response.render('splash.html')
        }
        else if (!request.user.permission) {
            response.render('splash.html')
        }
        else if (request.user.permission != "None") {
            if (/mobile/i.test(ua) && r.family != "iPad") {
                response.render(request.user.permission.toLowerCase() + '-mobile.html')
            } else if (r.family == "iPad") {
                response.render(request.user.permission.toLowerCase() + '-tablet.html')
            } else if (r.family == "IE" && r.major < '9') {
                response.render('practitionerie.html')
            } else {
                // console.log('called page on permission');
                // console.log(request.user.permission);
                response.render(request.user.permission.toLowerCase() + '.html')
            }
        }
        else {
            response.render('splash.html')
        }
    }
}

function isTrialPlan(planIds) {
    if(!process.env.TRIAL_PLANS){return;}
    var trialPlans = process.env.TRIAL_PLANS.split(",");
    console.log(planIds);
    console.log(trialPlans);
    for(var i = 0; i < trialPlans.length; i++) {
        
        if (planIds.indexOf(trialPlans[i]) > -1) {
            return true;
        }
    }
    return false;
}


app.get('/practitionerPortal.appcache', ensureSec , function (request, response) {
    var filePath = '.' + request.url
    var contentType = 'text/cache-manifest'

    fs.exists(filePath, function (exists) {
        if (exists) {
            fs.readFile(filePath, function (error, content) {
                if (error) {
                    response.writeHead(500)
                    response.end()
                } else {
                    response.writeHead(200, {
                        'Content-Type': contentType,
                        "Access-Control-Allow-Origin": "*"
                    })
                    response.end(content, 'utf-8')
                }
            })
        }
        else {
            response.writeHead(404)
            response.end()
        }
    })
})

app.post('/refer', ensureSec, authorized(), function (request, response) {
        var friend = {
            name: request.body.name,
        email: request.body.email
    }

    User.getSelf(request.user, function (user) {
        //Generate referal link

        //Hash = md5("#id-username!")
        //Link = practx.com/referalink

        var referralLink = "https://practx.authic.com/sign_up";
        var promoCode = "brandnewpatient";

        var htmlemail = "<p>Hi " + friend.name + ",</p>" +
            "<p>" + user.name + " (" + user.email + ") has referred you to use PracTx, a new revolutionary way to manage your patients.</p>" +
            "<p>" + user.name + " is currently managing " + user.Patients.length + " patients using PracTx, and you can too!</p>" +
            "<p><a href='" + referralLink + "'>Click Here To Sign Up</a></p>" +
            "<p>Your Promo Code is : <h2>" + promoCode + "</h2></p>" +
            "<br>" +
            "<p>We hope to see you soon on PracTx!</p>" +
            "<p>The PracTx Team</p>";

        sendgrid.send({
            to: friend.email,
            fromname: "PracTx Support",
            from: "support@practx.com",
            subject: user.name + " thinks you should use PracTx",
            html: htmlemail
        }, function (success, message) {
            if (!success) {
                console.log(message)
                response.json({error: "An error occurred"})
            }
            else {
                response.json({success: "Email Successfully Sent"})
            }
        })
    });
})

app.post('/user/self', ensureSec, authorized(), function (request, response) { // is this the update for practitioners?
    User.saveSelf(request.user, request.body, function (result) { //will auto add Cliniko Key if provided.
        response.json(result)
    })
})

app.get('/user', ensureSec, authorized(), restrictTo('Admin'), function (request, response) {
    User.getAllUsers(function (result) {
        response.json(result)
    })
})

app.delete('/user/:id', ensureSec, authorized(), restrictTo('Admin'), function (request, response) {
    User.deleteUser(request.params.id, function (result) {
        response.json(result)
    })
})

app.post('/user/uploadLogo', ensureSec, authorized(), function (request, response) {
    User.uploadLogo(request.body, function (result) {
        response.json(result)
    })
})

app.post('/user/uploadVideos', ensureSec, authorized(), function (request, response) {
    User.uploadVideos(request.body, function (result) {
        response.json(result)
    })
})

app.post('/user/patient', ensureSec, authorized(), function (request, response) {
    User.saveUserAsPatient(request.user, request.body, function (result) {
        response.json(result)
    })
})

app.post('/user/patient/:patientId', ensureSec, authorized(), function (request, response) {
    User.saveUserAsPatient(request.user, request.body, function (result) {
        response.json(result)
    })
})

app.delete('/user/patient/:id', ensureSec, authorized(), function (request, response) {
    User.deleteUserAsPractitioner(request.user, request.params.id, function (result) {
        response.json(result)
    })
})

app.post('/user', ensureSec, authorized(), function (request, response) {
    User.saveUser(request.body, function (result) {
        response.json(result)
    })
})

app.post('/user/:userId', ensureSec, authorized(), function (request, response) {
    User.saveUser(request.body, function (result) {
        response.json(result)
    })
})

app.get('/user/self/basic', ensureSec, authorized(), function (request, response) {
    response.json({name: request.user.name, email: request.user.email, id: request.user.id})
})

app.get('/user/self', ensureSec, authorized(), function (request, response) {
    User.getSelf(request.user, function (result) {
        var gracePeriodEndDate = moment(result.trialEndDate).add(10, 'days').format() 
        var currentDate = moment().format();
        if(result.isTrial && currentDate > gracePeriodEndDate) {
            result.expired = true
        }
        response.json(result)
    })
})

app.get('/user/patient/:id', ensureSec, authorized(), function (request, response) {
    User.getPatient(request.user.ClinicId, request.params.id, function (result) {
        response.json(result)
    })
})

app.get('/user/:id', ensureSec, authorized(), restrictTo("Admin"), function (request, response) {
    User.getUser(request.params, function (result) {
        response.json(result)
    })
})

app.get('/tag', ensureSec, authorized(), function (request, response) {
    Tag.getAllTags(function (result) {
        response.json(result)
    })
})

app.get('/prescription', ensureSec, authorized(), function (request, response) {
    PrescriptionInfo.getAllPrescriptions(function (result) {
        response.json(result)
    })
})

app.get('/exercise/:id', ensureSec, authorized(), function (request, response) {
    Exercise.getExercise(request.params, function (result) {
        response.json(result)
    })
})

app.get('/exercise', ensureSec, authorized(), function (request, response) {
    Exercise.getAllExercises(function (result) {
        response.json(result)
    })
})

app.get('/exercise/custom/:userId', ensureSec, authorized(), function (request, response) {
    Exercise.getExerciseByUserId(request.params.userId, function (result) {
        response.json(result)
    })
});

app.post('/exercise', ensureSec, function (request, response) {
    Exercise.saveExercise(request.body, function (result) {
        response.json(result)
    })
})

app.post('/exercise/addTags', ensureSec, function (request, response) {
    Exercise.addExerciseTags(request.body, function (result) {
        response.json(result)
    })
});

app.post('/exercise/addExercisePrescriptionInfoes', ensureSec, function (request, response) {
    Exercise.addExercisePrescriptionInfoes(request.body, function (result) {
        response.json(result)
    })
});

app.get('/user/:userId/exerciselist', ensureSec, authorized(), function (request, response) {
    ExerciseList.getExerciseListByPatientAndPractitioner(request.user.id, request.params.userId, function (result) {
        response.json(result)
    })
})


app.get('/api/templatelist', ensureSec, authorized(), function (request, response) {
    //TODO add this as a property of the User object
    ExerciseList.getTemplates(request.user.id, function (result) {
        response.json(result);
    })
})

app.get('/api/template/:id', ensureSec, authorized(), function (request, response) {
    ExerciseList.getTemplate(request.params.id, function (result) {
        try {
            if (request.user.id == result.practitioner.id) {
                response.json(result);
            }
            else {
                throw "Unauthorized";
            }
        } catch (err) {
            response.json({error: "Unauthorised"});
        }
    })
})

app.get('/api/env', ensureSec, authorized(), function (request, response) {
    response.json({
        environment: process.env.NODE_ENV
    })
})

app.delete('/api/template/:id', ensureSec, authorized(), function (request, response) {
    ExerciseList.deleteTemplateByPractitioner(request.params.id, request.user.id, function (result) {
        response.json(result)
    })
})

app.post('/api/template', authorized(), function (request, response) {
    ExerciseList.saveTemplate(request.body, request.user.id, function (result) {
        response.json(result)
    })
})

app.get('/api/template', ensureSec, authorized(), function (request, response) {
    response.json({
        exercises: [],
        practitioner: request.user
    })
})

app.post('/api/template/:id', ensureSec, authorized(), function (request, response) {
    ExerciseList.saveTemplate(request.body, request.user.id, function (result) {
        response.json(result)
    })
})

app.get('/api/exerciselist/:id', ensureSec, function (request, response) {
    ExerciseList.getExerciseListByRandomString(request.params.id, function (result) {
        eventLogging.logPatient(request, result);
        response.json(result)
    })
})


app.post('/user/:userId/exerciselist', ensureSec, authorized(), function (request, response) {
    ExerciseList.saveExerciseList(request.body, request.user.id, request.params.userId, function (result) {
        response.json(result)
    })
})

app.post('/user/:userId/exerciselist/prescribe', ensureSec, authorized(), function (request, response) {
    //console.log(request.user);
    //because session is broken we need to get the name manually

    User.getByAuthicId(request.user.authicId, function (currUser) {
        request.user.name = currUser.name;
        console.log(request.user);
        ExerciseList.saveExerciseList(request.body, request.user.id, request.params.userId, function (result) {
            if (!result.error) {
                ExerciseList.prescribe(request.body, result, request.user, function (result2) {
                    response.json(result2)
                })
            }
            else {
                response.json(result)
            }
        })
    });
    // ,
    // function() {
    //     console.log(request.user);
    //     ExerciseList.saveExerciseList(request.body, request.user.id, request.params.userId, function (result) {
    //         if (!result.error) {
    //             ExerciseList.prescribe(request.body, result, request.user, function (result2) {
    //                 response.json(result2)
    //             })
    //         }
    //         else {
    //             response.json(result)
    //         }
    //     })
    // });
})

app.post('/user/:userId/exerciselist/resend', ensureSec, authorized(), function (request, response) {
    db.ExerciseList_model.find({where: {PractitionerId: request.user.id, PatientId: request.body.id}, order: 'updatedAt DESC'}).success(function (exerciseList) {
        ExerciseList.prescribe(request.body, exerciseList, request.user, function (result2) {
            response.json(result2)
        })
    }).error(function (error) {
            console.log(error)
            response.json("an error has occurred")
        })
})

app.get('/exerciselist/:id', ensureSec, function (request, response) {
    var r = require('ua-parser').parse(request.headers['user-agent']);
    var suffix = ".html";

    var ua = request.headers['user-agent'];

    if (/mobile/i.test(ua) || /tablet/i.test(ua)) {
        suffix = "-mobile.html";
    }

    if (r.family == "IE" && r.major < '9') {
        response.render('iepage.html')
    } else {
        if (!request.user) {
            response.render('catalogue' + suffix)
        }
        else if (!request.user.permission) {
            response.render('catalogue' + suffix)
        }
        else {
            response.render('catalogue' + suffix)
        }
    }
})

app.get('/exerciselist/:id/print', ensureSec, function (request, response) {
    response.render('print.html');
})

app.get('/features', ensureSec, function (request, response, next) {
        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];
        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            if (!request.user) {
                response.render('features.html')
            }
            else if (!request.user.permission) {
                response.render('features.html')
            }
            else if (request.user.permission != "None") {
                if (/mobile/i.test(ua) && r.family != "iPad") {
                    response.render(request.user.permission.toLowerCase() + '-mobile.html')
                } else if (r.family == "iPad") {
                    response.render(request.user.permission.toLowerCase() + '-tablet.html')
                } else if (r.family == "IE" && r.major < '9') {
                    response.render('practitionerie.html')
                } else {
                    response.render(request.user.permission.toLowerCase() + '.html')
                }
            }
            else {
                response.render('features.html')
            }
        }
    }
)
//
//app.get('/about', ensureSec, function (request, response, next) {
//        var r = require('ua-parser').parse(request.headers['user-agent']);
//        var ua = request.headers['user-agent'];
//        if (r.family == "IE" && r.major < '9') {
//            response.render('fail.html')
//        } else {
//            if (!request.user) {
//                response.render('about.html')
//            }
//            else if (!request.user.permission) {
//                response.render('about.html')
//            }
//            else if (request.user.permission != "None") {
//                if (/mobile/i.test(ua) && r.family != "iPad") {
//                    response.render(request.user.permission.toLowerCase() + '-mobile.html')
//                } else if (r.family == "iPad") {
//                    response.render(request.user.permission.toLowerCase() + '-tablet.html')
//                } else if (r.family == "IE" && r.major < '9') {
//                    response.render('practitionerie.html')
//                } else {
//                    response.render(request.user.permission.toLowerCase() + '.html')
//                }
//            }
//            else {
//                response.render('about.html')
//            }
//        }
//    }
//)

app.get('/legal', ensureSec, function (request, response, next) {
        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];
        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            if (!request.user) {
                response.render('legal.html')
            }
            else if (!request.user.permission) {
                response.render('legal.html')
            }
            else if (request.user.permission != "None") {
                if (/mobile/i.test(ua) && r.family != "iPad") {
                    response.render(request.user.permission.toLowerCase() + '-mobile.html')
                } else if (r.family == "iPad") {
                    response.render(request.user.permission.toLowerCase() + '-tablet.html')
                } else if (r.family == "IE" && r.major < '9') {
                    response.render('practitionerie.html')
                } else {
                    response.render(request.user.permission.toLowerCase() + '.html')
                }
            }
            else {
                response.render('legal.html')
            }
        }
    }
)
app.get('/legal/basic', ensureSec, function (request, response, next) {
    response.render('legalbasic.html');
})

app.get('/privacy/basic', ensureSec, function (request, response, next) {
    response.render('privacybasic.html');
})

app.get('/plans', ensureSec, function (request, response, next) {

    if (process.env.REDIRECT_MAILING == "true"){
        return response.redirect("/mailing");
    }

    var r = require('ua-parser').parse(request.headers['user-agent']);
    var ua = request.headers['user-agent'];
    if (r.family == "IE" && r.major < '9') {
        response.render('fail.html')
    } else {
        if (!request.user) {
            response.render('plans.html')
        }
        else if (!request.user.permission) {
            response.render('plans.html')
        }
        else if (request.user.permission != "None") {
            if (/mobile/i.test(ua) && r.family != "iPad") {
                response.render(request.user.permission.toLowerCase() + '-mobile.html')
            } else if (r.family == "iPad") {
                response.render(request.user.permission.toLowerCase() + '-tablet.html')
            } else if (r.family == "IE" && r.major < '9') {
                response.render('practitionerie.html')
            } else {
                response.render(request.user.permission.toLowerCase() + '.html')
            }
        }
        else {
            response.render('plans.html')
        }
    }
})

app.get('/mailing', ensureSec, function (request, response, next) {
        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];
        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            if (!request.user) {
                response.render('mailinglist.html')
            }
            else if (!request.user.permission) {
                response.render('mailinglist.html')
            }
            else if (request.user.permission != "None") {
                if (/mobile/i.test(ua) && r.family != "iPad") {
                    response.render(request.user.permission.toLowerCase() + '-mobile.html')
                } else if (r.family == "iPad") {
                    response.render(request.user.permission.toLowerCase() + '-tablet.html')
                } else if (r.family == "IE" && r.major < '9') {
                    response.render('practitionerie.html')
                } else {
                    response.render(request.user.permission.toLowerCase() + '.html')
                }
            }
            else {
                response.render('mailinglist.html')
            }
        }
    }
)

app.get('/privacy', ensureSec, function (request, response, next) {
        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];
        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            if (!request.user) {
                response.render('privacy.html')
            }
            else if (!request.user.permission) {
                response.render('privacy.html')
            }
            else if (request.user.permission != "None") {
                if (/mobile/i.test(ua) && r.family != "iPad") {
                    response.render(request.user.permission.toLowerCase() + '-mobile.html')
                } else if (r.family == "iPad") {
                    response.render(request.user.permission.toLowerCase() + '-tablet.html')
                } else if (r.family == "IE" && r.major < '9') {
                    response.render('practitionerie.html')
                } else {
                    response.render(request.user.permission.toLowerCase() + '.html')
                }
            }
            else {
                response.render('privacy.html')
            }
        }
    }
)

app.get('/payment', ensureSec, function (request, response, next) {

    if (process.env.REDIRECT_MAILING == "true"){
        return response.redirect("/mailing");
    }
    var special = false; 
    var plan = "";
    var page = "payment.html";

    if (request.query.offer == 'true' && process.env.OFFER_STRING){
        plan = "?offer=true";
        page = "payment-offer.html";
    }

    if (request.query.plan){
        plan = "?plan="+request.query.plan;
        db.Plan_model.find({where:{code:request.query.plan}}).success(function(plan){
            //console.log(plan.selectedValues);
        });
        if(request.query.plan == "ECK3AKM4EYGN")
            special = true;
    }

    if (request.query.logout=='true'){
        response.redirect('https://' + config.authic.subdomain + '.authic.com/authic_sign_out?&return_url=' + config.authic.logoutRedirect +"/payment"+plan);
        return;
    }

    var r = require('ua-parser').parse(request.headers['user-agent']);
    var ua = request.headers['user-agent'];

    if (r.family == "IE" && r.major < '9') {
        response.render('fail.html')
    } else {
        response.render(page, {plan:plan, special:special})
    }
});

app.get('/thankyou', ensureSec, function (request, response, next) {
    if (process.env.REDIRECT_MAILING == "true"){
        return response.redirect("/mailing");
    }
    response.render("thankyou.html");
});

app.get('/appcache', function (req, res) {
    res.render("appcache.html");
})

app.post('/backClinikopatients', function (req, res) {
    console.log("posted");

    /*
    User.getUser(req.user.id, function (result) {
        //console.log(result);
        practionerID = result.id;
        practitionerClinicId = result.ClinicId;

        //get all patients from a clinic
        User.getPatientsForClinic(practitionerClinicId, function (users) {
            
            //console.log(users.length)

            var clinikoID = 'Basic '+new Buffer(result.clinikoId).toString('base64');

            //console.log(clinikoID);

            options = {
                url: 'https://api.cliniko.com/v1/patients?q=email:!=null&per_page=100',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'test (test)',
                    'Authorization': clinikoID
                }
            };

            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var clinikoPatients = JSON.parse(body);

                    req.body.ClinicId = practitionerClinicId;
                    var pats = clinikoPatients.patients;

                
                    async.each(pats, function(p, fin) {
                        //get my cliniko id
                        //clinikoPatient = User.getUserByClinikoId(p.id.toString(), function(resCliniko) {
                        resCliniko = users.find(function (a) {return a.clinikoId == p.id;})
                        //console.log(JSON.stringify(resCliniko))
                            if(!resCliniko) { //cliniko Id not found
                                //somePatient = User.getUserByEmail(p.email, function(result) {
                                result = users.find(function (a) {return a.email == p.email;})
                                    if(!result) {
                                        console.log("email not found creating new patient " + p.email);
                                        var user = {
                                            name: p.first_name + ' ' + p.last_name,
                                            email: p.email,
                                            clinikoId: p.id
                                        };
                                        
                                        User.saveUserAsPatient(req.body, user, function (saveres) {
                                            users.push(user);
                                            fin();
                                        })
                                    }
                                    else {
                                        console.log("email found adding clinikoId " + p.email);
                                        var user = {
                                            id: result.id,
                                            name: p.first_name + ' ' + p.last_name,
                                            email: p.email,
                                            clinikoId: p.id
                                        }; 
                                        User.saveUserAsPatient(req.body, user, function (saveres) {
                                            //result.clinikoId = p.id
                                            fin();
                                        })
                                    }
                                //});
                            }
                            else { //cliniko id found
                                //if pracTx updated at  < cliniko updated at
                                //if(p.updatedAt < resCliniko.updated_at) {
                                    if (resCliniko.email == p.email) {
                                        console.log("clinikoId found and email match " + p.email);
                                        if(resCliniko.name != p.first_name + ' ' + p.last_name) {//update name
                                            var user = {
                                                id: resCliniko.id,
                                                name: p.first_name + ' ' + p.last_name,
                                                email: p.email,
                                                clinikoId: p.id
                                            };
                                            User.saveUserAsPatient(req.body, user, function (saveres) {
                                                //console.log("cliniko id found and name updated");
                                                //fin();
                                            })
                                        }
                                        fin();

                                    }
                                    else { //update email
                                        var user = {
                                            id: resCliniko.id,
                                            name: p.first_name + ' ' + p.last_name,
                                            email: p.email,
                                            clinikoId: p.id
                                        };
                                        User.saveUserAsPatient(req.body, user, function (saveres) {
                                            console.log("cliniko id found and email updated " + p.email);
                                            resCliniko.email = p.email;
                                            fin();
                                        })
                                    }
                                //}
                                //fin();
                            } 
                        //}); 
                           
                    }, function(err) {
                        if(err) {
                            console.log(err);
                        } 
                        //if next page make call to new page  
                        if(clinikoPatients.links.next) {
                            options = {
                                url: clinikoPatients.links.next,
                                headers: {
                                    'Accept': 'application/json',
                                    'User-Agent': 'test (test)',
                                    'Authorization': clinikoID
                                }
                            }
                            request(options, callback);
                        }
                        else{
                            res.json('Patient List Updated');
                        }                   
                    });
                }
                else {
                    //console.log(body);
                    //console.log('Cliniko api key error');
                    res.json('Cliniko Error');
                }
            }
            request(options, callback);
        })
        // end of get patients
    });
    */
    return true;
});

// used to get cliniko patients first time
//app.get('/syncclinikopatients', ensureSec, function(req, res){
app.get('/clinikopatients', ensureSec, function(req, res){

    User.getUser(req.user.id, function (result) {
        //console.log(result);
        practionerID = result.id;
        practitionerClinicId = result.ClinicId;

        //get all patients from a clinic
        User.getPatientsForClinic(practitionerClinicId, function (users) {
            if(result.clinikoId) {
                var clinikoID = 'Basic '+new Buffer(result.clinikoId).toString('base64');
            }

            options = {
                url: 'https://api.cliniko.com/v1/patients?q=email:!=null&per_page=100',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'test (test)',
                    'Authorization': clinikoID
                }
            };

            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var clinikoPatients = JSON.parse(body);

                    req.body.ClinicId = practitionerClinicId;
                    var pats = clinikoPatients.patients;

                    clinikoPatientLastCreatedAt = pats[pats.length-1].created_at;

                    async.each(pats, function(p, fin) {
                        //get my cliniko id
                        //clinikoPatient = User.getUserByClinikoId(p.id.toString(), function(resCliniko) {
                        // // console.log("--------find by clinikoID.")
                        resCliniko = users.find(function (a) {return a.clinikoId == p.id;})
                        // // if(resCliniko) {console.log("email:" + resCliniko.email + " clinikoid: " + resCliniko.clinikoId)}
                        //console.log(JSON.stringify(resCliniko))
                            if(!resCliniko) { //cliniko Id not found
                                //somePatient = User.getUserByEmail(p.email, function(result) {
                                // // console.log("+++++++++++no cliniko id find by email. email:")
                                result = users.find(function (a) {return a.email == p.email;})
                                // // if (result) {console.log("email:" + result.email + " clinikoid: " + result.clinikoId)}
                                    if(!result) {
                                        //console.log("email not found creating new patient " + p.email);
                                        var user = {
                                            name: p.first_name + ' ' + p.last_name,
                                            email: p.email,
                                            clinikoId: p.id
                                        };
                                        
                                        User.saveUserAsPatient(req.body, user, function (saveres) {
                                            users.push(user);
                                            fin();
                                        })
                                    }
                                    else {

                                        if (result.clinikoId == null) {

                                            var user = {
                                                id: result.id,
                                                name: p.first_name + ' ' + p.last_name,
                                                email: p.email,
                                                clinikoId: p.id
                                            }; 
                                            User.saveUserAsPatient(req.body, user, function (saveres) {
                                                //result.clinikoId = p.id
                                                //fin(); // moved when to outside if
                                            })
                                        }
                                        fin();
                                    }
                                //});
                            } else {fin();}
                            // else { //cliniko id found if id found we are done
                            //     //if pracTx updated at  < cliniko updated at
                            //     //if(p.updatedAt < resCliniko.updated_at) {
                            //         if (resCliniko.email == p.email) {
                            //             //console.log("clinikoId found and email match " + p.email);
                            //             if(resCliniko.name != p.first_name + ' ' + p.last_name) {//update name
                            //                 var user = {
                            //                     id: resCliniko.id,
                            //                     name: p.first_name + ' ' + p.last_name,
                            //                     email: p.email,
                            //                     clinikoId: p.id
                            //                 };
                            //                 User.saveUserAsPatient(req.body, user, function (saveres) {
                            //                     //console.log("cliniko id found and name updated");
                            //                     //fin();
                            //                 })
                            //             }
                            //             fin();

                            //         }
                            //         else { //update email
                            //             var user = {
                            //                 id: resCliniko.id,
                            //                 name: p.first_name + ' ' + p.last_name,
                            //                 email: p.email,
                            //                 clinikoId: p.id
                            //             };
                            //             User.saveUserAsPatient(req.body, user, function (saveres) {
                            //                 //console.log("cliniko id found and email updated " + p.email);
                            //                 resCliniko.email = p.email;
                            //                 fin();
                            //             })
                            //         }
                            //     //}
                            //     //fin();
                            // } 
                        //}); 
                           
                    }, function(err) {
                        if(err) {
                            console.log(err);
                            res.json(err);
                        } 
                        //if next page make call to new page  
                        if(clinikoPatients.links.next) {
                            //console.log ("calling: "+ clinikoPatients.links.next)
                            User.updateLastClinikoSyncDate(practionerID, clinikoPatientLastCreatedAt, function (prac) {
                                //console.log(prac.lastClinikoSync)
                            });
                            options = {
                                url: clinikoPatients.links.next,
                                headers: {
                                    'Accept': 'application/json',
                                    'User-Agent': 'test (test)',
                                    'Authorization': clinikoID
                                }
                            }
                            request(options, callback);
                        }
                        else{
                            var TimeOfClinikoSync = moment().subtract(7, 'days').format("YYYY-MM-DDTHH:mm:ss+00:00");
                            console.log(TimeOfClinikoSync);

                            User.updateLastClinikoSyncDate(practionerID, TimeOfClinikoSync, function (prac) {
                                console.log(prac.lastClinikoSync)
                            });
                            console.log("finished sync")
                            res.json('Patient List Updated');
                        }
                    });
                }
                else {
                    //console.log(body);
                    //console.log('Cliniko api key error');
                    console.log("fin")
                    res.json('Cliniko Error');
                }
            }
            console.log ("calling: https://api.cliniko.com/v1/patients?q=email:!=null&per_page=100")
            request(options, callback);
        })
        // end of get patients
    });

});

//used for update
app.get('/syncclinikopatients', ensureSec, function(req, res){
//app.get('/clinikopatients', ensureSec, function(req, res){
    User.getUser(req.user.id, function (result) {
        //console.log(result);
        practionerID = result.id;
        practitionerClinicId = result.ClinicId;
        clinikoPatientLastCreatedAt = '';

        apiurl = 'https://api.cliniko.com/v1/patients?q[]=email:!=null&per_page=100'
            //apiurl = 'https://api.cliniko.com/v1/patients?q=email:!=null&q=updated_at:>=2015-04-01T15:26:41+10:00&per_page=100'
            //apiurl = 'https://api.cliniko.com/v1/patients?q[]=email:!=null&q[]=updated_at:>=2015-01-01T15:26:41Z&per_page=100'
            // 2015-04-15T15:26:41+10:00

        if (result.lastClinikoSync != null) {
            practitionerLastSync = moment(result.lastClinikoSync).subtract(7, 'days').format();
            practitionerLastSync = practitionerLastSync.substring(0, practitionerLastSync.length - 6)+'Z';
            apiurl = 'https://api.cliniko.com/v1/patients?q[]=email:!=null&q[]=updated_at:>='+practitionerLastSync+'&per_page=100'
        }

        //get all patients from a clinic
        User.getPatientsForClinic(practitionerClinicId, function (users) {
            if(result.clinikoId) {
                var clinikoID = 'Basic '+new Buffer(result.clinikoId).toString('base64');
            }
            //console.log(clinikoID);

            
            options = {
                url: apiurl,
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'test (test)',
                    'Authorization': clinikoID
                }
            };

            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var clinikoPatients = JSON.parse(body);

                    req.body.ClinicId = practitionerClinicId;
                    var pats = clinikoPatients.patients;

                    clinikoPatientLastCreatedAt = pats[pats.length-1].created_at;
                    //console.log("-------last patient updated at: " + clinikoPatientLastCreatedAt)
                    async.each(pats, function(p, fin) {
                        //get my cliniko id
                        //clinikoPatient = User.getUserByClinikoId(p.id.toString(), function(resCliniko) {
                        // //console.log("--------find by clinikoID.")
                        resCliniko = users.find(function (a) {return a.clinikoId == p.id;})
                        // // if(resCliniko) {console.log("email:" + resCliniko.email + " clinikoid: " + resCliniko.clinikoId)}
                        //console.log(JSON.stringify(resCliniko))
                            if(!resCliniko) { //cliniko Id not found
                                //somePatient = User.getUserByEmail(p.email, function(result) {
                                // // console.log("+++++++++++no cliniko id find by email. email:")
                                result = users.find(function (a) {return a.email == p.email;})
                                // // if (result) {console.log("email:" + result.email + " clinikoid: " + result.clinikoId)}
                                    if(!result) {
                                        //console.log("email not found creating new patient " + p.email);
                                        var user = {
                                            name: p.first_name + ' ' + p.last_name,
                                            email: p.email,
                                            clinikoId: p.id
                                        };
                                        
                                        User.saveUserAsPatient(req.body, user, function (saveres) {
                                            users.push(user);
                                            fin();
                                        })
                                    }
                                    else {
                                        //console.log("email found adding clinikoId " + p.email);
                                        // //console.log("**************email found missmatch id or no id")
                                        // //console.log("email:" + result.email + " clinikoid: " + result.clinikoId)

                                        if (result.clinikoId == null) {
                                            // // console.log("adding new paypay!!!!!!!!!")

                                            var user = {
                                                id: result.id,
                                                name: p.first_name + ' ' + p.last_name,
                                                email: p.email,
                                                clinikoId: p.id
                                            }; 
                                            User.saveUserAsPatient(req.body, user, function (saveres) {
                                                //result.clinikoId = p.id
                                                //fin(); // moved when to outside if
                                            })
                                        }
                                        fin();
                                    }
                                //});
                            }
                            else { //cliniko id found
                                //if pracTx updated at  < cliniko updated at
                                //if(p.updatedAt < resCliniko.updated_at) {
                                    if (resCliniko.email == p.email) {
                                        //console.log("clinikoId found and email match " + p.email);
                                        if(resCliniko.name != p.first_name + ' ' + p.last_name) {//update name
                                            var user = {
                                                id: resCliniko.id,
                                                name: p.first_name + ' ' + p.last_name,
                                                email: p.email,
                                                clinikoId: p.id
                                            };
                                            User.saveUserAsPatient(req.body, user, function (saveres) {
                                                //console.log("cliniko id found and name updated");
                                                //fin();
                                            })
                                        }
                                        fin();

                                    }
                                    else { //update email
                                        var user = {
                                            id: resCliniko.id,
                                            name: p.first_name + ' ' + p.last_name,
                                            email: p.email,
                                            clinikoId: p.id
                                        };
                                        User.saveUserAsPatient(req.body, user, function (saveres) {
                                            //console.log("cliniko id found and email updated " + p.email);
                                            if(typeof resCliniko != 'undefined') 
                                                resCliniko.email = p.email;
                                            else
                                                console.log("++++++BIG CRASHHERE_________________++++++++++++++++++++++++++++")
                                            fin();
                                        })
                                    }
                                //}
                                //fin();
                            } 
                        //}); 
                           
                    }, function(err) {
                        if(err) {
                            console.log(err);
                            res.json(err);
                        } 
                        //if next page make call to new page  
                        if(clinikoPatients.links.next) {
                            //console.log('++++++lasts patients created at: ' + clinikoPatientLastCreatedAt)

                            User.updateLastClinikoSyncDate(practionerID, clinikoPatientLastCreatedAt, function (prac) {
                                console.log(prac.lastClinikoSync)
                            });

                            console.log ("calling: "+ clinikoPatients.links.next)
                            options = {
                                url: clinikoPatients.links.next,
                                headers: {
                                    'Accept': 'application/json',
                                    'User-Agent': 'test (test)',
                                    'Authorization': clinikoID
                                }
                            }
                            request(options, callback);
                        }
                        else{
                            var TimeOfClinikoSync = moment().subtract(7, 'days').format("YYYY-MM-DDTHH:mm:ss+00:00");
                            console.log(TimeOfClinikoSync);

                            User.updateLastClinikoSyncDate(practionerID, TimeOfClinikoSync, function (prac) {
                                console.log(prac.lastClinikoSync)
                            });
                            res.json('Patient List Updated');
                        }                   
                    });
                }
                else {
                    //console.log(body);
                    //console.log('Cliniko api key error');
                    res.json('Cliniko Error');
                }
            }
            console.log ("calling: " + apiurl)
            request(options, callback);
        })
        // end of get patients
    });
});

//cliniko landing page
app.get('/cliniko', ensureSec, function (request, response) {
    if (request.user) {
        pageSelector(request, response);
    }
    else {
        response.render('clinikoLandingPage.html');
    }
});

//Custom paymets endpoints
// app.get('/oba', ensureSec, function (request, response, next) {

//     if (process.env.REDIRECT_MAILING == "true"){
//         return response.redirect("/mailing");
//     }
//     var special = false; 
//     var plan = "";
//     var page = "aca-offer.html";

//     // if (request.query.logout=='true'){
//     //     response.redirect('https://' + config.authic.subdomain + '.authic.com/authic_sign_out?&return_url=' + config.authic.logoutRedirect +"/payment"+plan);
//     //     return;
//     // }

//     var r = require('ua-parser').parse(request.headers['user-agent']);
//     var ua = request.headers['user-agent'];

//     if (r.family == "IE" && r.major < '9') {
//         response.render('fail.html')
//     } else {
//         response.render(page, {plan:plan, special:special, img:'oa.jpeg'})
//     }
// });

app.get('/oa', ensureSec, function(request, response) {
    // set page
    if (request.user) {
        pageSelector(request, response);
    }
    else {
        var page = 'association-offer.html';
        var refCode = 'oa';
        var img = 'oa.png';
        var quoteimg = 'osteo-quoter.jpg';
        var quote = 'It\'s a really professional medium and help to add significant value to my service with minimal work on my part. I would recommend this without hesitation to any health care professional.';
        var quoter = 'Dr. Edward Clark';
        var profession = 'Osteopath';

        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];

        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            response.render(page, {refCode:refCode, img:img, quote:quote, quoter:quoter, profession:profession, quoteimg:quoteimg});
        }
    }

});

app.get('/caa', ensureSec, function(request, response) {
    if (request.user) {
        pageSelector(request, response);
    }
    else {
        // set page
        var page = 'association-offer.html';
        var refCode = 'caa';
        var img = 'caa.png';
        var quoteimg = 'chiro-photo.png';
        var quote = 'PracTx will cause your patients to be exercise complaint, engaged and get even better outcomes while you do physically less. I recommend PracTx to any Chiropractor who is serious about patient outcomes and who is currently spending time explaining inside the office.';
        var quoter = 'Dr. Josh Wagner';
        var profession = 'Chiropractor';

        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];

        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            response.render(page, {refCode:refCode, img:img, quote:quote, quoter:quoter, profession:profession, quoteimg:quoteimg});
        }
    }
    

});

app.get('/apa', ensureSec, function(request, response) {
    if (request.user) {
        pageSelector(request, response);
    }
    else {
        // set page
        var page = 'association-offer.html';
        var refCode = 'apa';
        var img = 'apa.png';
        var quoteimg = 'physio-photo.png';
        var quote = 'As soon as I started to use it I saw my patients become more engaged, improve faster and perform their exercises with greater accuracy.';
        var quoter = 'Arthur Kapsimalis';
        var profession = 'Physiotherapist';

        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];

        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            response.render(page, {refCode:refCode, img:img, quote:quote, quoter:quoter, profession:profession, quoteimg:quoteimg});
        }
    }
    

});

 app.get('/aca',  ensureSec, function(request, response) {
    if (request.user) {
        pageSelector(request, response);
    }
    else {
        var page = 'association-offer.html';
        var refCode = 'aca';
        var img = 'aca.png';
        var quoteimg = 'chiro-photo.png';
        var quote = 'PracTx will cause your patients to be exercise complaint, engaged and get even better outcomes while you do physically less. I recommend PracTx to any DC who is serious about patient outcomes and who is currently spending time explaining inside the office.';
        var quoter = 'Dr. Josh Wagner';
        var profession = 'Chiropractor';

        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];

        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            response.render(page, {refCode:refCode, img:img, quote:quote, quoter:quoter, profession:profession, quoteimg:quoteimg});
        }
    }
});

app.get('/uca', ensureSec, function(request, response) {
    if (request.user) {
        pageSelector(request, response);
    }
    else {
        var page = 'association-offer.html';
        var refCode = 'uca';
        var img = 'uca.png';
        var quoteimg = 'chiro-photo.png';
        var quote = 'PracTx will cause your patients to be exercise complaint, engaged and get even better outcomes while you do physically less. I recommend PracTx to any DC who is serious about patient outcomes and who is currently spending time explaining inside the office.';
        var quoter = 'Dr. Josh Wagner';
        var profession = 'Chiropractor';

        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];

        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            response.render(page, {refCode:refCode, img:img, quote:quote, quoter:quoter, profession:profession, quoteimg:quoteimg});
        }
    }
});

// second round urls
app.get('/opc', ensureSec, function(request, response) {
    if (request.user) {
        pageSelector(request, response);
    }
    else {
        var page = 'association-offer.html';
        var refCode = 'opc';
        var img = 'opc.png';
        var quoteimg = 'osteo-quoter.jpg';
        var quote = 'It\'s a really professional medium and help to add significant value to my service with minimal work on my part. I would recommend this without hesitation to any health care professional.';
        var quoter = 'Dr. Edward Clark';
        var profession = 'Osteopath';

        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];

        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            response.render(page, {refCode:refCode, img:img, quote:quote, quoter:quoter, profession:profession, quoteimg:quoteimg});
        }
    }
});

app.get('/accesshealth', ensureSec, function(request, response) {
   if (request.user) {
        pageSelector(request, response);
    }
    else {
        var page = 'association-offer.html';
        var refCode = 'accesshealth';
        var img = 'ah1.png';
        var quoteimg = 'osteo-quoter.jpg';
        var quote = 'It\'s a really professional medium and help to add significant value to my service with minimal work on my part. I would recommend this without hesitation to any health care professional.';
        var quoter = 'Dr. Edward Clark';
        var profession = 'Osteopath';

        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];

        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            response.render(page, {refCode:refCode, img:img, quote:quote, quoter:quoter, profession:profession, quoteimg:quoteimg});
        }
    }
});

app.get('/limitedoffer', ensureSec, function(request, response) {
    if (request.user) {
        pageSelector(request, response);
    }
    else {
        var page = 'association-offer.html';
        var refCode = 'limitedoffer';
        var img = 'practx-blue.png';
        var quoteimg = 'chiro-photo.png';
        var quote = 'PracTx will cause your patients to be exercise complaint, engaged and get even better outcomes while you do physically less. I recommend PracTx to any DC who is serious about patient outcomes and who is currently spending time explaining inside the office.';
        var quoter = 'Dr. Josh Wagner';
        var profession = 'Chiropractor';

        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];

        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            response.render(page, {refCode:refCode, img:img, quote:quote, quoter:quoter, profession:profession, quoteimg:quoteimg});
        }
    }
});

function showGSTInclusive(gstInc) {
    //priving page will have hstInc true 
    if(gstInc != null && gstInc != 'caa' && gstInc != 'oa' && gstInc != 'apa' && gstInc != 'cliniko' && gstInc != 'stdTrial') {   
        return true;
    }
    return false;
};

app.get('/pricing', ensureSec, function(request, response) {
    var refCode = null;
    if(request.query.gst) {
        refCode = request.query.gst;
    }
    if (request.user) {
        pageSelector(request, response);
    }
    else {
        var page = 'pricingPage.html';
        var monthly = '40';
        var yearly = '400';
        
        var mainplan = config.authic.plans.main;
        var bulkplan = config.authic.plans.main_bulk;
        var loggedin = false;
        //var gstInc = false;
        var gstInc = true;
        // if(showGSTInclusive(refCode)) {
        //     var gstInc = true;
        //     var monthly = '44';
        //     var yearly = '440';
        // }
        // var quote = 'With PracTx, my patients are more consistent with their exercises and I\'m saving time and money. If you haven\'t used PracTx you should.';
        // var quoter = 'Dr. Alexandra Poulos';
        // var profession = 'Chiropractor';

        var r = require('ua-parser').parse(request.headers['user-agent']);
        var ua = request.headers['user-agent'];

        if (r.family == "IE" && r.major < '9') {
            response.render('fail.html')
        } else {
            response.render(page, {monthly:monthly, yearly:yearly, mainplan:mainplan, bulkplan:bulkplan, loggedin:loggedin, gstInc:gstInc});
            //response.render(page, {refCode:refCode, img:img, quote:quote, quoter:quoter, profession:profession});
        }
    }
});

app.get('/offerpricing', ensureSec, function(request, response) {
    var refCode = null;
    if(request.query.gst) {
        refCode = request.query.gst;
    }
    var page = 'pricingPage.html';
    var monthly = '35';
    var yearly = '350';
    var mainplan = config.authic.plans.association;
    var bulkplan = config.authic.plans.association_bulk;
    var loggedin = false;
    //var gstInc = false;
    var gstInc = true;
    if (request.user) {
        loggedin = true;
    }
    // if(showGSTInclusive(refCode)) {
    //     var gstInc = true;
    //     var monthly = '38';
    //     var yearly = '385';
    // }

    var r = require('ua-parser').parse(request.headers['user-agent']);
    var ua = request.headers['user-agent'];

    if (r.family == "IE" && r.major < '9') {
        response.render('fail.html')
    } else {
        response.render(page, {monthly:monthly, yearly:yearly, mainplan:mainplan, bulkplan:bulkplan, loggedin:loggedin, gstInc:gstInc});
        //response.render(page, {refCode:refCode, img:img, quote:quote, quoter:quoter, profession:profession});
    }
});

app.get('/', ensureSec, pageSelector)
app.get('/index.html', ensureSec, pageSelector)
app.get('/home', ensureSec, pageSelector)

app.get('/user/*', ensureSec, pageSelector)
app.get('/user', ensureSec, pageSelector)
app.get('/exercise*', ensureSec, pageSelector)
app.get('/patient*', ensureSec, pageSelector)
app.get('/template*', ensureSec, pageSelector)
app.get('/practitioner*', ensureSec, pageSelector)
app.get('/admin', ensureSec, pageSelector)
app.get('/admin/*', ensureSec, pageSelector)

var port = process.env.PORT || 3000
app.listen(port)