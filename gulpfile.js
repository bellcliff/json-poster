'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var del = require('del');
var webpack = require('webpack-stream');
var es = require('event-stream');
var path = require('path');

const PATH_BUILD = 'build';
const PATH_DIST = path.join(PATH_BUILD, 'dist');
const PATH_STYLE = path.join(PATH_DIST, 'css');
const PATH_JS = path.join(PATH_DIST, 'js');

gulp.task('clean', function () {
    return del.sync([PATH_BUILD]);
});

gulp.task('scripts', function () {
    // Minify and copy all JavaScript (except vendor scripts)
    return es.concat(
        gulp.src('src/app.js')
            .pipe(webpack({
                output: {
                    filename: 'app.js'
                }
            }))
            .pipe(gulp.dest(PATH_JS)),
        gulp.src('src/lib.js')
            .pipe(webpack({
                output: {
                    filename: 'lib.js'
                }
            }))
            .pipe(gulp.dest(PATH_JS))
    );
});

gulp.task('files', function () {
    return es.concat(
        gulp.src('plugin/manifest.json')
            .pipe(gulp.dest(PATH_DIST)),
        gulp.src('node_modules/jquery/dist/jquery.min.js')
            .pipe(gulp.dest(PATH_JS)),
        gulp.src('node_modules/bootstrap/dist/**')
            .pipe(gulp.dest(PATH_DIST)),
        gulp.src('src/index.html')
            .pipe(gulp.dest(PATH_DIST))
    );
});

gulp.task('styles', function () {
    // use webpack to combine all style files
    return gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(PATH_STYLE))
});

gulp.task('build', ['clean', 'scripts', 'files', 'styles']);

// the task when a file changes
gulp.task('watch', function () {
    watch('src/**/*.js')
        .pipe(jshint({esversion: 6}))
        .pipe(jshint.reporter('jshint-stylish'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);