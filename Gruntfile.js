module.exports = function (grunt) {
    grunt.initConfig({

    // define source files and their destinations
    
    concat: {
        js: {
            src:  ['public/js/fileupload.js', 'public/js/folio.js', 'public/js/like.js', 'public/js/profile.js', 'public/js/scrollify.js', 'public/js/search.js', 'public/js/typed.js'],
            dest: 'public/js/production.js'
        }
    },
    uglify: {
        js: { 
            src: 'public/js/production.js',
            dest: 'public/js/min/',
            expand: true,    // allow dynamic building
            flatten: true,   // remove all unnecessary nesting
            ext: '.min.js' 
        }
    },
    watch: {
        js:  { files: 'js/*.js', tasks: [ 'uglify' , 'concat'] },
    }
});

// load plugins
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');

// register at least this one task
grunt.registerTask('default', ['concat', 'uglify']);


};