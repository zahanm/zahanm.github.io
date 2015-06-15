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
          "css/index.css": "less/index.less",
          "css/projects.css": "less/projects.less"
        }
      }
    },
    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: 'markdown/projects.md',
            dest: '.',
            ext: '.html'
          }
        ],
        options: {
          template: 'markdown/projects.jst',
        }
      }
    },
    watch: {
      less: {
        files: ['less/*.less'],
        tasks: ['less']
      },
      markdown: {
        files: ['markdown/*.md', 'markdown/*.jst'],
        tasks: ['markdown']
      },
      options: {
        spawn: false
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
  grunt.loadNpmTasks('grunt-markdown');

};
