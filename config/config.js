module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
                database:
                {
                    "username":"Hopefulee",
                    "password":"hinfung",
                    "database":"practx_dev",
                    "host":"localhost",
                    "dialect": "postgres"
                },
                authic:
                {
                    callback: "http://localhost:3000/auth/callback"
                    , clientId: "pHyWdBOBwWbDBGFj1cpFhhl2cKgBQyr4uDcKlW1C"
                    , secretKey: "2NVLiXdss7GTecPUhWqK8rIl46OtSAYWyWieyfAM"
                    , subdomain: 'practxdev'
                    , logoutRedirect: "http://localhost:3000/home"
                    , plans:{
                        main:   process.env.MAIN_STRING || 'XOTGSONNYXBJ2Y7',
                        main_bulk:  process.env.MAIN_STRING_BULK || 'X1Q4XFU8HT8JVGTU',
                        offer:  process.env.OFFER_STRING || 'OFFER',
                        trial:  'DSFASEF2342N42',
                        association: 'NMZG',
                        association_bulk: process.env.ASSOCIATION_OFFER_BULK || 'QAN58AU5DQ4E8TOF'
                    }
                },
                mongo_session:
                {
                    db: 'development',
                    host: 'paulo.mongohq.com',
                    port: 10079,
                    collection: process.env.NODE_ENV+"-session",
                    username: 'practx',
                    password: 'practxpass'
                },
                mailchimp:
                {
                    apiKey: process.env.MAILCHIMP_API_KEY || 'd93f3d7dab96834cfad113b9a736341d-us3',
                    trialListId: process.env.MAILCHIMP_TRIAL_LIST_ID || '101f787f74',
                    subscribedListId: process.env.MAILCHIMP_SUBSCRIBED_LIST_ID || '92b9bdf1d5'
                },
                mandrill:
                {
                    apiKey: process.env.MANDRILL_APIKEY || 'dOeyEBsxxN_4880AJCuz0g',
                    username: process.env.MANDRILL_USERNAME || 'app5554763@heroku.com'
                }
            };
        case 'dave-development':
            return {
                database:
                {
                    "username":"",
                    "password":"",
                    "database":"practx_dev",
                    "host":"localhost",
                    "dialect": "postgres"
                },
                authic:
                {
                    callback: "http://192.168.1.13:3000/auth/callback"
                    , clientId: "pHyWdBOBwWbDBGFj1cpFhhl2cKgBQyr4uDcKlW1C"
                    , secretKey: "2NVLiXdss7GTecPUhWqK8rIl46OtSAYWyWieyfAM"
                    , subdomain: 'practxdev'
                    , logoutRedirect: "http://192.168.1.11:3000"
                    , plans:{
                        main:   process.env.MAIN_STRING || 'XOTGSONNYXBJ2Y7',
                        main_bulk:  process.env.MAIN_STRING_BULK || 'X1Q4XFU8HT8JVGTU',
                        offer:  process.env.OFFER_STRING || 'OFFER',
                        trial:  'DSFASEF2342N42',
                        association: 'NMZG',
                        association_bulk: process.env.ASSOCIATION_OFFER_BULK || 'QAN58AU5DQ4E8TOF'
                    }
                },
                mongo_session:
                {
                    db: 'development',
                    host: 'paulo.mongohq.com',
                    port: 10079,
                    collection: process.env.NODE_ENV+"-session",
                    username: 'practx',
                    password: 'practxpass'
                },
                mailchimp:
                {
                    apiKey: process.env.MAILCHIMP_API_KEY || 'd93f3d7dab96834cfad113b9a736341d-us3',
                    trialListId: process.env.MAILCHIMP_TRIAL_LIST_ID || '101f787f74',
                    subscribedListId: process.env.MAILCHIMP_SUBSCRIBED_LIST_ID || '92b9bdf1d5'
                }
            };    
        case 'test':
            return {
                database:
                {
                    "username":"postgres",
                    "password":"root",
                    "database":"practx_test",
                    "host":"localhost",
                    "dialect": "postgres"
                },
                authic:
                {
                    callback: "http://localhost:3000/auth/callback"
                    , clientId: "pHyWdBOBwWbDBGFj1cpFhhl2cKgBQyr4uDcKlW1C"
                    , secretKey: "2NVLiXdss7GTecPUhWqK8rIl46OtSAYWyWieyfAM"
                    , subdomain: 'practxdev',
                    logoutRedirect: "http://localhost:3000"
                },
                mongo_session:
                {
                    db: 'development',
                    host: 'paulo.mongohq.com',
                    port: 10079,
                    collection: process.env.NODE_ENV+"-session",
                    username: 'practx',
                    password: 'practxpass'
                }
            };
        case 'development-henry':
            return {
                database:
                {
                    "username":"postgres",
                    "password":"root",
                    "database":"practx_dev",
                    "host":"localhost",
                    "dialect": "postgres"
                },
                authic:
                {
                    callback: "http://localhost:3000/auth/callback"
                    , clientId: "pHyWdBOBwWbDBGFj1cpFhhl2cKgBQyr4uDcKlW1C"
                    , secretKey: "2NVLiXdss7GTecPUhWqK8rIl46OtSAYWyWieyfAM"
                    , subdomain: 'practxdev'
                    , logoutRedirect: "http://localhost:3000"
                    , plans:{
                        main:   process.env.MAIN_STRING || 'FULL',
                        offer:  process.env.OFFER_STRING || 'users'
                    }
                },
                mongo_session:
                {
                    db: 'development',
                    host: 'paulo.mongohq.com',
                    port: 10079,
                    collection: process.env.NODE_ENV+"-session",
                    username: 'practx',
                    password: 'practxpass'
                }
            };
        case 'test-henry':
            return {
                database:
                {
                    "username":"postgres",
                    "password":"root",
                    "database":"practx_test",
                    "host":"localhost",
                    "dialect": "postgres"
                },
                authic:
                {
                    callback: "http://localhost:3000/auth/callback"
                    , clientId: "pHyWdBOBwWbDBGFj1cpFhhl2cKgBQyr4uDcKlW1C"
                    , secretKey: "2NVLiXdss7GTecPUhWqK8rIl46OtSAYWyWieyfAM"
                    , subdomain: 'practxdev',
                    logoutRedirect: "http://localhost:3000"
                },
                mongo_session:
                {
                    db: 'development',
                    host: 'paulo.mongohq.com',
                    port: 10079,
                    collection: process.env.NODE_ENV+"-session",
                    username: 'practx',
                    password: 'practxpass'
                }
            };
		case 'dev-ron':
            return {
                database:
                {
                    "username":"postgres",
                    "password":"postgres",
                    "database":"practx_dev",
                    "host":"localhost",
                    "dialect": "postgres"
                },
                authic:
                {
                    callback: "http://localhost:3000/auth/callback"
                    , clientId: "pHyWdBOBwWbDBGFj1cpFhhl2cKgBQyr4uDcKlW1C"
                    , secretKey: "2NVLiXdss7GTecPUhWqK8rIl46OtSAYWyWieyfAM"
                    , subdomain: 'practxdev'
                    , logoutRedirect: "http://localhost:3000"
                    , plans:{
                        main:   process.env.MAIN_STRING || 'FULL',
                        offer:  process.env.OFFER_STRING || 'users'
                    }
                },
                mongo_session:
                {
                    db: 'development',
                    host: 'paulo.mongohq.com',
                    port: 10079,
                    collection: process.env.NODE_ENV+"-session",
                    username: 'practx',
                    password: 'practxpass'
                }
            };
        case 'staging':
            return {
                database:
                {
                    "username":"qkszbzozutcdpr",
                    "password":"qu-GtyrbDZrKoCTINrHCq0-7iZ",
                    "database":"d9lrrdq7rk0aum",
                    "host":"ec2-54-235-124-2.compute-1.amazonaws.com",
                    "dialect": "postgres",
                    "port": "5432"
                },
                authic:
                {
                    callback: "http://empty-water-7169.herokuapp.com/auth/callback"
                    , clientId: "rym9wITwSTMjyAGa12isTLHLLwLnl9SKduTJMDmQ"
                    , secretKey: "WnaAfPrxfVs6ULQDVWJvvF32EWL5XUgRjMWx8bDb"
                    , subdomain: 'practxstaging',
                    logoutRedirect: "http://empty-water-7169.herokuapp.com/home"
                        , plans:{
                        main:   process.env.MAIN_STRING || 'H5JB',
                        main_bulk:  process.env.MAIN_STRING_BULK || 'X1Q4XFU8HT8JVGTU',
                        offer:  process.env.OFFER_STRING || '2JW2',
                        trial:  process.env.TRIAL_STRING || 'DSFASEF2342N421',
                        association:  process.env.ASSOCIATION_OFFER_MAIN || '2JW2',
                        association_bulk: process.env.ASSOCIATION_OFFER_BULK || 'QAN58AU5DQ4E'
                    }
                },
                mailchimp:
                {
                    apiKey: process.env.MAILCHIMP_API_KEY || 'd93f3d7dab96834cfad113b9a736341d-us3',
                    trialListId: process.env.MAILCHIMP_TRIAL_LIST_ID || '101f787f74',
                    subscribedListId: process.env.MAILCHIMP_SUBSCRIBED_LIST_ID || '92b9bdf1d5'
                },
                mandrill:
                {
                    apiKey: process.env.MANDRILL_APIKEY || 'dOeyEBsxxN_4880AJCuz0g',
                    username: process.env.MANDRILL_USERNAME || 'app5554763@heroku.com'
                }
            };
        case 'production':
            var callback =  "http://www.practx.com/auth/callback";
            var logout = "http://www.practx.com";
            if (process.env.REQUIRE_SSL == 'true'){
                callback =  "https://www.practx.com/auth/callback";
                logout = "https://www.practx.com/home";
            }

            return {
                database:
                {
                    "username":"u5hjrpeauup8lg",
                    "password":"p5596f13d29e357761bc2c268a264a902ff6e71b3f1afd3a2e65849cde2e9ff1e",
                    "database":"d37mkgavn74rm2",
                    "host":"ec2-54-156-170-38.compute-1.amazonaws.com",
                    "dialect": "postgres",
                    "port": "5432"
                },
                authic:
                {
                    callback: callback
                    , clientId: "AbC5ALFbgY2dbijPMN9wpddocy3BMAkAdyTNf3b2"
                    , secretKey: "TSqhLuuGJyCyG93GkEimXf0qRWRoJvfHpS6BWK7J"
                    , subdomain: 'practx',
                    logoutRedirect: logout
                    , plans:{
                        main:   process.env.MAIN_STRING || "MAIN",
                        main_bulk:  process.env.MAIN_STRING_BULK || 'X1Q4XFU8HT8JVGTU',
                        offer:  process.env.OFFER_STRING || "OFFER",
                        trial:  process.env.TRIAL_STRING || 'KELEHJJ6TFM8HA3N',
                        association:  process.env.ASSOCIATION_OFFER_MAIN || 'CI2A3NKLNGNWOA47',
                        association_bulk: process.env.ASSOCIATION_OFFER_BULK || '3NKJL05SLYJEG5CA'
                    }
                },
                mailchimp:
                {
                    apiKey: process.env.MAILCHIMP_API_KEY || 'd93f3d7dab96834cfad113b9a736341d-us3',
                    trialListId: process.env.MAILCHIMP_TRIAL_LIST_ID || '101f787f74',
                    subscribedListId: process.env.MAILCHIMP_SUBSCRIBED_LIST_ID || '92b9bdf1d5'
                },
                mandrill:
                {
                    apiKey: process.env.MANDRILL_APIKEY || 'dOeyEBsxxN_4880AJCuz0g',
                    username: process.env.MANDRILL_USERNAME || 'app5554763@heroku.com'
                }
            };
        default:
            return {
                database:
                {
                    "username":"root",
                    "password":"root",
                    "database":"practx_dev",
                    "host":"127.0.0.1",
                    "dialect": "mysql"
                },
                authic:
                {
                    callback: "http://localhost:3000/auth/callback"
                    , clientId: "pHyWdBOBwWbDBGFj1cpFhhl2cKgBQyr4uDcKlW1C"
                    , secretKey: "2NVLiXdss7GTecPUhWqK8rIl46OtSAYWyWieyfAM"
                    , subdomain: 'practxdev',
                    logoutRedirect: "http://localhost:3000"
                    , plans:{
                        main:   process.env.MAIN_STRING || 'FULL',
                        offer:  process.env.OFFER_STRING || 'OFFER'
                    }
                }
            };
    }
};
