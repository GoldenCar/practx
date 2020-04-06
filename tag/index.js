var async = require('async')

function Tag(model) {
    Tag.conn = model
}

Tag.prototype.conn;

Tag.prototype.getAllTags = function (done) {
    Tag.conn.Tag_model.findAll({attributes:['id' , "name"]})
        .success(function (tags) {
            done({data: tags});
        }).error(function (error) {
            done({error:"an error has occurred"});
        })
};

module.exports = Tag;