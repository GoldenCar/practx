var async = require('async')

function Plan(model) {
    Plan.conn = model
}

Plan.prototype.conn

Plan.prototype.getByPlanId = function (planId, done) {
    Plan.conn.Plan_model.find({where:{code:planId}, attributes:["code" , "name" , "details", "cycle" , "price", "allowUpload"]}).success(function (plan) {
        done(plan)
    }).error(function (error) {
        done(error)
    })
}

module.exports = Plan