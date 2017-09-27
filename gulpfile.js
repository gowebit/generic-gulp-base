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
    gulpSequence('build', 'server', callback);
});

// Task to build the "dist" folder
gulp.task('build', function(callback) {
    gulpSequence('clean-dist', 'copy-app-to-dist', ['minify-img', 'minify-html', 'minify-css', 'minify-js'], callback);
});


// Clean the "dist" folder contents
gulp.task('clean-dist', function() {
    return gulp.src('dist')
        .pipe(clean());
});

// Copy all files from "app" to "dist" folder
gulp.task('copy-app-to-dist', function() {
    return gulp.src('app/**/+(*|.*)')
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
        .pipe(cleanCSS({ 
            rebase: false
        }))
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
            baseDir: 'app' // Root directory for Browsersync server
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
    

    // Reload Browsersync if any file changes on "app" folder
    gulp.watch('app/**/*').on('change', browserSync.reload);
});