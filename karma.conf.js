module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'browserify'],
        files: [
            'spec/**/*.spec.js',
        ],
        preprocessors: {
            'spec/**/*.spec.js': ['browserify'],
        },
        browserify: {
            debug: true,
            paths: ['./src'],
            // transform: [
            //     ["babelify", { 
            //         presets: ["es2015"], 
            //         extensions: ['.es6'],
            //     }],
            //     ["browserify-ngannotate", {
            //         ext: ['.es6']
            //     }],
            // ],
            extensions: [".js"],
        },
        browsers: ['PhantomJS'],
        autoWatch: true,
        watchify: {
            poll: 100
        },
        // logLevel: 'WARN',
    });
};