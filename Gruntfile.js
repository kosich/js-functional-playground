module.exports = function(grunt) {

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    clearRequireCache: true
                },
                src: ['test/**/*.js']
            }
        },

        jshint : {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                reporter: require('jshint-stylish')
            }
        }

    });

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', ['jshint', 'mochaTest']);

};
