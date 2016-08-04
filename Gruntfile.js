/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    clean: {
      cleanoutput: {
        files: [{
          src: 'dist/'
        }]
      }
    },
    //copy 类库到项目文件夹
    bower: {
      install: {
        options: {
          targetDir: './app/scripts/lib',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },

   //copy 文件到打包目录
    copy: {
      src: {
        files: [
          {expand: true, cwd: 'app',
            src: ['*.html','views/**/*','scripts/**/*','styles/**/*','!styles/**/*.scss'],
            dest: 'dist/<%= pkg.name %>'}
        ]
      },
      image: {
        files: [
          {expand: true, cwd: 'app',
            src: ['images/*.{png,jpg,jpeg,gif,webp,svg}','images/*/*.{png,jpg,jpeg,gif,webp,svg}'],
            dest: 'dist/<%= pkg.name %>'}
        ]
      }
    },
    //压缩JS
    uglify: {
      prod: {
        options: {
          mangle: {
            except: ['require', 'exports', 'module', 'window']
          },
          compress: {
            global_defs: {
              PROD: true
            },
            dead_code: true,
            pure_funcs: [
              "console.log",
              "console.info"
            ]
          }
        },

        files: [{
          expand: true,
          cwd: 'dist/<%= pkg.name %>',
          src: ['scripts/**/*.js'],
          dest: 'dist/<%= pkg.name %>'
        }]
      }
    },
    //压缩CSS
    cssmin: {
      prod: {
        options: {
          report: 'gzip'
        },
        files: [
          {
            expand: true,
            cwd: 'dist/<%= pkg.name %>',
            src: ['styles/**/*.css'],
            dest: 'dist/<%= pkg.name %>'
          }
        ]
      }
    },
    //压缩图片
    imagemin: {
      prod: {
        options: {
          optimizationLevel: 7,
          pngquant: true
        },
        files: [
          {expand: true,
            cwd: 'dist/<%= pkg.name %>',
            src: ['images/*.{png,jpg,jpeg,gif,webp,svg}','images/**/*.{png,jpg,jpeg,gif,webp,svg}'],
            dest: 'dist/<%= pkg.name %>'
          }
        ]
      }
    },
    //压缩HTML
    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true
      },
      html: {
        files: [
          {
            expand: true,
            cwd: 'dist/<%= pkg.name %>',
            src: ['*.html','views/**/*.html'],
            dest: 'dist/<%= pkg.name %>'
          }
        ]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: ['Gruntfile.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task.
  grunt.registerTask('default', ['prod']);

  //prod
  grunt.registerTask('prod', ['clean','bower','copy','uglify','cssmin','imagemin','htmlmin']);

};
