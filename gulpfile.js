// Load Gulp
var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    plugins = require('gulp-load-plugins')();

// Start Watching: Run "gulp"
gulp.task('default', ['watch']);

// Minify jQuery Plugins: Run manually with: "gulp squish-plugins"
gulp.task('squish-plugins', function() {
    return gulp.src([
        'assets/scripts/plugins/bs/transition.js',
        'assets/scripts/plugins/bs/alert.js',
        'assets/scripts/plugins/bs/button.js',
        'assets/scripts/plugins/bs/carousel.js',
        'assets/scripts/plugins/bs/collapse.js',
        'assets/scripts/plugins/bs/dropdown.js',
        'assets/scripts/plugins/bs/modal.js',
        'assets/scripts/plugins/bs/tooltip.js',
        'assets/scripts/plugins/bs/popover.js',
        'assets/scripts/plugins/bs/scrollspy.js',
        'assets/scripts/plugins/bs/tab.js',
        'assets/scripts/plugins/bs/affix.js',
        'assets/scripts/plugins/owl.carousel.js',
        // 'scripts/main.js',
    ])
        // .pipe(plugins.uglify())
       // .on("error", plugins.notify.onError())
        .on('error', swallowError)
        .pipe(plugins.concat('plugins.min.js'))
        .pipe(gulp.dest('assets/scripts'))
        // .pipe(plugins.notify({ message: 'Successfully Squished plugins js.' }));
});

// Less to CSS: Run manually with: "gulp build-css"
gulp.task('build-css', function() {
    return gulp.src('assets/less/*.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on("error", plugins.notify.onError())
        .on('error', swallowError)
        .pipe(plugins.autoprefixer(
            {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
                cascade: false
            }
        ))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('assets/styles'))
         .on("error", plugins.notify.onError())
        .on('error', swallowError)
        .pipe(plugins.notify({ message: 'styles compiled.' }));
});


function swallowError (error) {
    //If you want details of the error in the console
    console.log(error.toString());
    this.emit('end');
}

//// Default task
gulp.task('watch', function() {
    gulp.watch('assets/scripts/**/**/*', ['squish-plugins']);
    gulp.watch('assets/less/**/*', ['build-css']);
});

