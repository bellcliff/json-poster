'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var del = require('del');
var webpack = require('webpack-stream');
var es = require('event-stream');
var path = require('path');

// build path
const PATH_BUILD = 'build';
// deploy path
const PATH_DIST = path.join(PATH_BUILD, 'dist');
const PATH_STYLE = path.join(PATH_DIST, 'css');
const PATH_JS = path.join(PATH_DIST, 'js');

gulp.task('clean', function () {
    return del.sync([PATH_BUILD]);
});

gulp.task('libs', function () {
    gulp.src('src/lib.js')
        .pipe(webpack({
            output: {
                filename: 'lib.js'
            }
        }))
        .pipe(gulp.dest(PATH_JS))
});

gulp.task('scripts', ['jshint'], function () {
    gulp.src('src/app.js')
        .pipe(webpack({
            output: {
                filename: 'app.js'
            }
        }))
        .pipe(gulp.dest(PATH_JS));
});

gulp.task('styles', function () {
    // use webpack to combine all style files
    return gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(PATH_STYLE));
});

gulp.task('index', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest(PATH_DIST))
});

gulp.task('files', function () {
    return es.concat(
        gulp.src('plugin/manifest.json')
            .pipe(gulp.dest(PATH_DIST)),
        gulp.src('node_modules/jquery/dist/jquery.min.js')
            .pipe(gulp.dest(PATH_JS)),
        gulp.src('node_modules/bootstrap/dist/**')
            .pipe(gulp.dest(PATH_DIST))
    );
});

// the task when a file changes
gulp.task('jshint', function () {
    gulp.src('src/**/*.js')
        .pipe(jshint({esversion: 6}))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', ['clean', 'libs', 'files', 'scripts', 'styles', 'index']);

gulp.task('watch', ['build'], function () {
    watch('src/**/*.js', function (e, done) {
        gulp.start('scripts', done)
    });
    // watch('src/**/*.scss', function (e, done) {
    //     gulp.start('styles', done);
    // });
    // watch('src/index.html', function (e, done) {
    //     gulp.start('index', done);
    // })
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);