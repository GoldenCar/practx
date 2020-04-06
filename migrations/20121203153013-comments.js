module.exports = {
    up: function(migration, DataTypes) {
        migration.addColumn(
            'ExerciseListsExercises',
            'comments',
            DataTypes.TEXT
        )
    },
    down: function(migration) {
        migration.removeColumn('ExerciseListsExercises', 'comments')
    }
}