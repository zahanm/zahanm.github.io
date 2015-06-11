/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      legacy: {
        options: {},
        files: {
          "css/resume.css": "less/resume.less",
          "css/sf.css": "less/sf.less",
          "css/malk-news.css": "less/malk-news.less"
        }
      },
      hotness: {
        options: {
          plugins: [
            new (require('less-plugin-autoprefix'))({}),
          ],
        },
        files: {
          "css/index.css": "less/index.less"
        }
      }
    },
    watch: {
      dev: {
        files: ['styles/index.less'],
        tasks: ['less:hotness'],
        options: {
          spawn: false
        }
      }
    },
    connect: {
      server: {},
      options: {
        keepalive: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

};
