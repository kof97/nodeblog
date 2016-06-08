// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),

    browserify = require("browserify"),
    sourcemaps = require("gulp-sourcemaps"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),

    del = require('del');

gulp.task('styles', () =>
    sass('src/stylesheets/*.css', {style: 'expanded', sourcemap: true})
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'src'
        }))
//    .pipe(concat('style.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(notify({ message: 'Styles task complete' }))

);

// Scripts
gulp.task('scripts', function() {
    var b = browserify({
        entries: "src/javascripts/main.js",
        debug: true
    });

    return b.bundle()
        .pipe(source("script.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("public/javascripts"));
});

// Images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('public/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['public/assets/css', 'public/assets/js', 'public/assets/img'], cb);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('src/stylesheets/**/*.css', ['styles']);
    // Watch .js files
    gulp.watch('src/javascripts/**/*.js', ['scripts']);
    // Watch image files
    gulp.watch('src/images/**/*', ['images']);
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['public/**']).on('change', livereload.changed);
});
