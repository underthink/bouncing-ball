//import gulp from 'gulp';
//import babel from 'gulp-babel';
//import browserify from 'browserify';
//
//
//
//var bundler = browserify();
//
//gulp.task('js', function () {
//    return gulp.src('src/**/*.js')
//        .pipe(babel(
//            {'formatter': 'iife'}
//        ))
//        .pipe(bundler())
//        .pipe(gulp.dest('dist'));
//});


var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var del = require('del');

// Lets bring es6 to es5 with this.
// Babel - converts ES6 code to ES5 - however it doesn't handle imports.
// Browserify - crawls your code for dependencies and packages them up
// into one file. can have plugins.
// Babelify - a babel plugin for browserify, to make browserify
// handle es6 including imports.
gulp.task('js', function() {
    browserify({
        entries: './src/js/main.js',
        debug: true
    })
        .transform(babelify)
        .on('error',gutil.log)
        .bundle()
        .on('error',gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-html', function() {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch',function() {
    gulp.watch('**/*.js',['es6'])
});

gulp.task('clean', function() {
    return del(['./dist']);
});

gulp.task('default', ['watch']);