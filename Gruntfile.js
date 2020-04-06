'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./build/component.json').appPath || yeomanConfig.app;
  } catch (e) {
  }

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9000,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: 'localhost',
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      distlivereload: {
        options: {
          port: 9001,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: 'localhost',
          middleware: function (connect) {
            return [
              lrSnippet,
              //  mountFolder(connect, '.tmp'), //comment out for min css
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9000,
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.livereload.options.port %>'
      },
      distserver: {
        url: 'http://localhost:<%= connect.distlivereload.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'scripts/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma-unit.conf.js',
        singleRun: true
      }
    },
    concat: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            'public/javascripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '/index.html',
      options: {
        dest: ''
      }
    },
    usemin: {
      html: ['{,*/}*.html'],
      css: ['styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '/images',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= yeoman.dist %>/images'
          }
        ]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>',
            src: ['*.html', 'views/*.html'],
            dest: '<%= yeoman.dist %>'
          }
        ]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.dist %>/scripts',
            src: '*.js',
            dest: '<%= yeoman.dist %>/scripts'
          }
        ]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,txt}',
              '.htaccess',
              'components/**/*',
              'images/{,*/}*.{gif,webp}'
            ]
          }
        ]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');
  // remove when mincss task is renamed
  grunt.renameTask('mincss', 'cssmin');

  // execute below to run app
  grunt.registerTask('server', [
    'clean:server',
    //'coffee:dist',
    //'jshint',
    //'compass:server',
    'livereload-start',
    'connect:livereload',
    'open:server',
    'watch'
  ]);

  // execute below to run 'dist' version of app
  grunt.registerTask('distserver', [
    'clean:server',
    //'coffee:dist',
    //'jshint',
//    'compass:server',
    'livereload-start',
    'connect:distlivereload',
    'open:distserver',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    //'coffee',
    //'compass',
    'connect:test',
  //  'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'test',
    //'coffee',
//    'compass:dist',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    'cdnify',
    'usemin',
    'ngmin',
    'uglify'
  ]);

  grunt.registerTask('default', ['build']);
};
