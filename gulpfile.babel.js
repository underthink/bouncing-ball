import babelify from "babelify";
import browserify from "browserify";
import del from "del";
import gulp from "gulp";
import gulpSequence from "gulp-sequence";
import gulpStreamify from 'gulp-streamify';
import jasmine from "gulp-jasmine";
import source from "vinyl-source-stream";
import uglify from "gulp-uglify";


// constants we'll use to build our app, defining things like where source files can be found
const ALL_SPEC_FILES = "./spec/**/*";
const ALL_SOURCE_FILES = "./src/**/*";
// more specific file patterns
const JS_ENTRYPOINT = "./src/js/main.js";
const HTML_FILES = "./src/**/*.html";
const CSS_FILES = "./src/css/**/*.css";
const JS_SPECS = "./spec/**/*.js";
// destinations
const DESTINATION_DIR = "./dist/";
const DESTINATION_JS_FILE = "balls.js";


/** Make the 'common' bit of the JS build pipeline, including converting ES6 to something slightly more
 * browser-friendly */
function makePartialJsPipeline() {
    return browserify({
            entries: JS_ENTRYPOINT,
            debug: true
        })
        .transform(babelify)
        .bundle()
        .pipe(source(DESTINATION_JS_FILE));
}


// Builds the JS, un-minified
gulp.task('build-dev-js', function() {
    makePartialJsPipeline()
        .pipe(gulp.dest(DESTINATION_DIR));
});

// Builds the JS, minified
gulp.task('build-dist-js', function() {
    makePartialJsPipeline()
        .pipe(gulpStreamify(uglify()))
        .pipe(gulp.dest(DESTINATION_DIR));
});

// Copy the HTML resources to our dest directory
gulp.task('copy-html', function() {
    gulp.src(HTML_FILES)
        .pipe(gulp.dest(DESTINATION_DIR));
});

// Copy the CSS resources to our dest directory
gulp.task('copy-css', function() {
    gulp.src(CSS_FILES)
        .pipe(gulp.dest(DESTINATION_DIR));
});

// Clean up our destination directory
gulp.task('clean', function() {
    return del([DESTINATION_DIR]);
});

// Build our project for development
gulp.task('dev', function(callback) {
    gulpSequence('clean', ['test', 'copy-css', 'copy-html', 'build-dev-js'])(callback);
});

// Build our project for distribution
gulp.task('dist', function(callback) {
    gulpSequence('clean', ['test', 'copy-css', 'copy-html', 'build-dist-js'])(callback);
});

// Run Jasmine tests
gulp.task('test', function () {
    return gulp.src(JS_SPECS)
        .pipe(jasmine());
});

// Watch our sources for changes, and re-run dev if we see anything
gulp.task('watch',function() {
    gulp.watch([ALL_SOURCE_FILES, ALL_SPEC_FILES], ['dev'])
});

// ...and if nothing's given we just run the 'dev' target
gulp.task('default', ['dev']);