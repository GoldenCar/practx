module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Exercise", {
        name: { type: DataTypes.STRING, allowNull: false},
        videoWebM: { type: DataTypes.STRING, allowNull: false, validate: {isUrl: true}},
        videoMp4: { type: DataTypes.STRING, allowNull: false, validate: {isUrl: true}},
        thumbnail: { type: DataTypes.STRING, allowNull: false, validate: {isUrl: true}},
        description: { type: DataTypes.TEXT, allowNull: false, validate: {isUrl: true}},
        videoLength: { type: DataTypes.STRING, allowNull: false, validate: {isNumeric: true}},
        userId: { type: DataTypes.INTEGER, allowNull: true, validate: {isNumeric: true}}
    },{
        classMethods: {
            getExercisesByUserId : function( userId, cb ){
                sequelize.query( 'SELECT "Exercises".* FROM "Exercises" WHERE "Exercises"."userId" = ' + userId).on('success', cb).on('error', cb)
            },
            getTags : function( id, cb ){
                sequelize.query( 'SELECT * FROM "Tags" WHERE "id" in (SELECT "TagId" FROM "ExercisesTags" WHERE "ExerciseId" = '+id+')').on('success', cb).on('error', cb)
            },
            setExercisesTags : function( obj, cb ){
                sequelize.query('INSERT INTO "ExercisesTags" ("TagId", "ExerciseId", "createdAt", "updatedAt") VALUES ('+obj.tagId+', '+obj.exerciseId+', to_timestamp('+Date.now()+'), to_timestamp('+Date.now()+'))').on('success', cb).on('error', cb)
            },
            setExercisePrescriptionInfo : function( obj, cb ){
                sequelize.query('INSERT INTO "ExercisesPrescriptionInfoes" ("PrescriptionInfoId", "ExerciseId", "createdAt", "updatedAt") VALUES ('+obj.prescriptionInfoId+', '+obj.exerciseId+', to_timestamp('+Date.now()+'), to_timestamp('+Date.now()+'))').on('success', cb).on('error', cb)
            },
            getPrescribedInfo : function( id, cb ){
                sequelize.query( 'SELECT "PrescriptionInfoes"."name", "PrescriptionInfoes"."sentence",  "PrescriptionInfoes"."id", "PrescriptionInfoValues"."value" FROM "PrescriptionInfoes", "PrescriptionInfoValues" WHERE "PrescriptionInfoValues"."PrescriptionInfoId" = "PrescriptionInfoes"."id" AND "PrescriptionInfoValues"."ExerciseListsExerciseId" = '+id + ' ORDER BY "PrescriptionInfoes"."id"').on('success', cb).on('error', cb)
            },
            getPrescriptionData : function( id, cb ){
                sequelize.query( 'SELECT "PrescriptionInfoes"."name", "PrescriptionInfoes"."sentence", "PrescriptionInfoes"."id", "PrescriptionInfoDefaults"."value" FROM "PrescriptionInfoes" LEFT JOIN "PrescriptionInfoDefaults" ON "PrescriptionInfoDefaults"."PrescriptionInfoId" = "PrescriptionInfoes"."id" WHERE "PrescriptionInfoes"."id" in (SELECT "PrescriptionInfoId" FROM "ExercisesPrescriptionInfoes" WHERE "ExerciseId" = '+id+') ORDER BY  "PrescriptionInfoes"."id", "PrescriptionInfoDefaults"."id"').on('success', cb).on('error', cb)
            },
            getPrescriptionInfoData : function( id, cb ){
                sequelize.query( 'SELECT "PrescriptionInfoes"."name", "PrescriptionInfoes"."sentence", "PrescriptionInfoes"."id", "PrescriptionInfoDefaults"."value" FROM "PrescriptionInfoes" LEFT JOIN "PrescriptionInfoDefaults" ON "PrescriptionInfoDefaults"."PrescriptionInfoId" = "PrescriptionInfoes"."id" WHERE "PrescriptionInfoes"."id" = ' + id).on('success', cb).on('error', cb)
            }
        }
    })
}