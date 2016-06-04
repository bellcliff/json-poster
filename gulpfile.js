var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');
var es = require('event-stream');
var _ = require('lodash');

gulp.task('clean', function () {
    return del.sync(['dist']);
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
            .pipe(gulp.dest('dist')),
        gulp.src('node_modules/jquery/dist/jquery.min.js')
            .pipe(gulp.dest('dist')),
        gulp.src('src/lib.js')
            .pipe(webpack({
                output: {
                    filename: 'lib.js'
                }
            }))
            .pipe(gulp.dest('dist'))
    );
});

gulp.task('files', function () {
    return es.concat(
        gulp.src('plugin/manifest.json')
            .pipe(gulp.dest('dist')),
        gulp.src('src/index.html')
            .pipe(gulp.dest('dist'))
    );
});

gulp.task('styles', function () {
    return es.concat(
        gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
            .pipe(gulp.dest('dist/css')),
        gulp.src('node_modules/bootstrap/dist/fonts/*')
            .pipe(gulp.dest('dist/fonts'))
    );
});

gulp.task('build', ['clean', 'scripts', 'files', 'styles']);

// the task when a file changes
gulp.task('watch', function () {
    gulp.watch('src/**/*', ['build']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);