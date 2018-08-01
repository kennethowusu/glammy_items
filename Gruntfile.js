
module.exports = function(grunt){

  grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  //sass task
  sass: {
    dist: {
      options: {
        style: 'expanded'
      },
      files: {
        'public/stylesheets/style.css': 'build/sass/main.scss'
        //'widgets.css': 'widgets.scss'
      }
    }
  },

  //autoprefixer task
  autoprefixer:{
    options:{
        // We need to `freeze` browsers versions for testing purposes.
        browsers: ['opera 12', 'ff 15', 'chrome 25']
    },

     main_css: {
      src: 'public/stylesheets/style.css',
      dest: 'public/stylesheets/style.css'
    }
  },
  // Concat fiiles
 concat: {
   options: {
     // separator: ';',
   },
   dist: {
     src: ['build/coffee/navigation.coffee', 'build/coffee/some.coffee', 'build/coffee/another.coffee'],
     dest: 'build/coffee/main.coffee',
   },
 },

  //process coffeescript to js
  coffee:{
    compile:{
      files:{
        'public/javascripts/main.js':'build/coffee/main.coffee'
      }
    }
  },
  //watch tasks
  watch: {
    options:{
      livereload:false
    },
    scss: {
      files: ['build/sass/**/*'],
      tasks: ['sass','autoprefixer']
    },
    coffee:{
      files:['build/coffee/**/*'],
      tasks:['concat','coffee']
    }

  },

  //for browser sync
  browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        './views/**',
                        './build'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy:'localhost:3000'
                }
            }
        }
});

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-coffee');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-browser-sync');


grunt.registerTask('default', ['browserSync','watch']);
grunt.registerTask('call_sass', 'sass');
}
