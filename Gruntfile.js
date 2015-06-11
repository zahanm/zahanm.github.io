/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    less: {
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
        files: ['less/*.less'],
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
