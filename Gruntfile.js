var fs = require("fs");

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Copy FontAwesome files to the fonts/ directory and jquery ui theme images to images/ directory
    copy: {
      fonts: {
        src: 'bower_components/font-awesome/fonts/**',
        dest: 'public/fonts/',
        flatten: true,
        expand: true
      },
      images: {
        src: [
            'bower_components/jquery-ui/themes/base/images/**',
            'bower_components/jquery-ui/themes/hot-sneaks/images/**'
        ],
        dest: 'public/dist/images/',
        flatten: true,
        expand: true
      }
    },

    // Transpile LESS
    less: {
      options: {
        sourceMap: true,
        paths: ['bower_components/bootstrap/less']
      },
      prod: {
        options: {
          compress: true,
          cleancss: false
        },
        files: {
          "public/dist/style.css": [
              "src/less/style.less",
              "bower_components/jquery-ui/themes/hot-sneaks/jquery-ui.css",
              "bower_components/jquery-ui/themes/hot-sneaks/theme.css",
          ]
        }
      }
    },


    // Run our JavaScript through JSHint
    jshint: {
      js: {
        src: ['src/js/**.js']
        }
    },

    uglify: {
      options: {
        sourceMap: true
      },
      prod: {
        files: {
          'public/dist/scripts.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/underscore/underscore-min.js',
            'bower_components/d3/d3.js',
            'bower_components/topojson/topojson.js',
            'bower_components/d3-queue/d3-queue.js',
            'bower_components/bootstrap/js/button.js',
            'bower_components/bootstrap/js/collapse.js',
            'bower_components/bootstrap/js/dropdown.js',
            'bower_components/bootstrap/js/transition.js',
            'bower_components/jquery-ui/jquery-ui.js',
            'bower_components/jquery-ui/ui/slider.js',
            'src/js/main.js'
          ]
        }
      }
    },

    // Lint our Bootstrap usage
    bootlint: {
      options: {
        relaxerror: ['W005']
      },
      files: 'public/**.php',
    },

    // Watch for changes in LESS and JavaScript files,
    // relint/retranspile when a file changes
    watch: {
      options: {
        livereload: true
      },
      markup: {
        files: ['public/*.php','public/includes/*.inc']
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['jshint', 'uglify']
      },
      styles: {
        files: ['src/less/**/*.less'],
        tasks: ['less']
      }
    },

    // stage path needs to be set
    ftpush: {
      stage: {
        auth: {
          host: 'host.coxmediagroup.com',
          port: 21,
          authKey: 'cmg'
        },
        src: 'public',
        dest: '/stage_aas/projects/news/census/estimates-2015/',
        exclusions: ['dist/tmp','Thumbs.db','.DS_Store'],
        simple: false,
        useList: false
      },
      // prod path will need to change
      prod: {
        auth: {
          host: 'host.coxmediagroup.com',
          port: 21,
          authKey: 'cmg'
        },
        src: 'public',
        dest: '/prod_aas/projects/news/census/estimates-2015/',
        exclusions: ['dist/tmp','Thumbs.db','.DS_Store'],
        simple: false,
        useList: false
      }
    },

    // be sure to set publishing paths
    slack: {
        options: {
          endpoint: fs.readFileSync('.slack', {encoding: 'utf8'}),
          channel: '#bakery',
          username: 'gruntbot',
          icon_url: 'http://vermilion1.github.io/presentations/grunt/images/grunt-logo.png'
        },
        stage: {
          text: 'Project published to stage: http://stage.host.coxmediagroup.com/aas/projects/news/census/estimates-2015/ {{message}}'
        },
        prod: {
          text: 'Project published to prod: http://projects.statesman.com/news/census/estimates-2015/ {{message}}'
        }
    }

  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftpush');
  grunt.loadNpmTasks('grunt-bootlint');
  grunt.loadNpmTasks('grunt-slack-hook');

  grunt.registerTask('default', ['copy', 'less', 'jshint','bootlint','uglify']);
  grunt.registerTask('stage', ['default','ftpush:stage','slack:stage']);
  grunt.registerTask('prod', ['default','ftpush:prod','slack:prod']);

};
