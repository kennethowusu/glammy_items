
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
     src: ['build/scripts/*'],
     dest: 'public/javascripts/main.js',
   },
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
    // javascripts:{
    //   files:['build/scripts/*.js'],
    //   tasks:['concat']
    // }

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


grunt.registerTask('default', ['watch']);
grunt.registerTask('call_sass', 'sass');
}
