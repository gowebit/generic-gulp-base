var gulp = require('gulp');
var browserSync = require('browser-sync');
var gulpSequence = require('gulp-sequence');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var eslint = require('gulp-eslint');
var jshintStylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var csslint = require('gulp-csslint');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

// Default task
gulp.task('default', function(callback) {
    gulpSequence('build-dev', 'server', callback);
});

// Task to build the "dev" folder
gulp.task('build-dev', function(callback) {
    gulpSequence(['css-lint', 'js-lint'], 'clean-dev', 'copy-app-to-dev', callback);
});

// Task to build the "prod" folder
gulp.task('build', function(callback) {
    gulpSequence(['build-dev', 'clean-prod'], 'copy-dev-to-prod', ['minify-img', 'minify-html', 'minify-css', 'minify-js'], callback);
});


// Clean the "dev" folder contents
gulp.task('clean-dev', function() {
    return gulp.src('release/dev')
        .pipe(clean());
});

// Copy all files from "app" to "dev" folder
gulp.task('copy-app-to-dev', function() {
    return gulp.src('app/**/+(*|.*)')
        .pipe(gulp.dest('release/dev'));
});

// Minify the images on "dev" folder (PNG, JPG, JPEG, GIF and BMP)
gulp.task('minify-img', function() {
    return gulp.src('app/**/*.+(png|jpg|jpeg|gif|bmp)')
        .pipe(imagemin())
        .pipe(gulp.dest('release/dev'));
});


// Clean the "prod" folder contents
gulp.task('clean-prod', function() {
    return gulp.src('release/prod')
        .pipe(clean());
});

// Copy all files from "dev" to "prod" folder
gulp.task('copy-dev-to-prod', function() {
    return gulp.src('release/dev/**/+(*|.*)')
        .pipe(gulp.dest('release/prod'));
});

// Minify the HTML files from "dev" folder to "prod" folder
gulp.task('minify-html', function() {
    return gulp.src('release/dev/**/*.+(htm|html)')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('release/prod'));
});

// Minify the CSS files from "dev" folder to "prod" folder
gulp.task('minify-css', function() {
    return gulp.src('release/dev/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('release/prod'));
});

// Minify the JS files from "dev" folder to "prod" folder
gulp.task('minify-js', function() {
    return gulp.src('release/dev/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('release/prod'));
});


// Lint task for CSS files on "app" folder
gulp.task('css-lint', function() {
    gulp.src('app/**/*.css')
        .pipe(csslint('.csslintrc'))
        .pipe(csslint.formatter('fail'));
});

// Lint task for JS files on "app" folder
gulp.task('js-lint', function() {
    gulp.src('app/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


// Server task
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'release/dev' // Root directory for Browsersync server
        }
    });

    // Lint watch for CSS files on "app" folder
    gulp.watch('app/**/*.css').on('change', function(event) {
        gulp.src(event.path)
            .pipe(csslint('.csslintrc'))
            .pipe(csslint.formatter('fail'));
    });
    
    // Lint watch for JS files on "app" folder
    gulp.watch('app/**/*.js').on('change', function(event) {
        gulp.src(event.path)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });
    

    // Run "build-dev" task if any file changes on "app" folder
    gulp.watch('app/**/*', ['build-dev']);

    // Reload Browsersync if any file changes on "dev" folder
    gulp.watch('release/dev/**/*').on('change', browserSync.reload);
});