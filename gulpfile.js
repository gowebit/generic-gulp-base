var gulp = require('gulp');
var browserSync = require('browser-sync');
var gulpSequence = require('gulp-sequence');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var csslint = require('gulp-csslint');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');

// Default task
gulp.task('default', gulpSequence('build', 'server'));

// Build task
gulp.task('build', gulpSequence('clean-dist', 'copy-app-to-dist', ['minify-img', 'minify-html', 'minify-css', 'minify-js']));

// Clean the "dist" folder contents
gulp.task('clean-dist', function() {
    return gulp.src('dist')
        .pipe(clean());
});

// Copy all files from "app" to "dist" folder
gulp.task('copy-app-to-dist', function() {
    return gulp.src(['app/**/*', 'app/**/.*'])
        .pipe(gulp.dest('dist'));
});

// Minify the HTML files from "app" folder to "dist" folder
gulp.task('minify-html', function() {
    return gulp.src('app/**/*.+(htm|html)')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'));
});

// Minify the CSS files from "app" folder to "dist" folder
gulp.task('minify-css', function() {
    return gulp.src('app/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('dist'));
});

// Minify the JS files from "app" folder to "dist" folder
gulp.task('minify-js', function() {
    return gulp.src('app/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Minify the images on "dist" folder (PNG, JPG, JPEG, GIF and BMP)
gulp.task('minify-img', function() {
    return gulp.src('dist/**/*.+(png|jpg|jpeg|gif|bmp)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist'));
});

// Server task
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'app' // Root directory for Browsersync
        }
    });

    // "src" folder watches
    // To-Do - Watches to recompile and put preprocessors' result on "app" folder when they change

    // "app" folder watches
    // Lint for CSS files on "app" folder
     gulp.watch('app/**/*.css').on('change', function(event) {
        gulp.src(event.path)
            .pipe(csslint())
            .pipe(csslint.formatter());
    });
    // Lint for JS files on "app" folder
    gulp.watch('app/**/*.js').on('change', function(event) {
        gulp.src(event.path)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish));
    });
    // Reload Browsersync when any file changes on "app" folder
    gulp.watch('app/**/*').on('change', browserSync.reload);
});