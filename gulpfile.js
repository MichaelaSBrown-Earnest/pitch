var gulp = require('gulp');
// var sass = require('gulp-sass');
var gutil = require('gulp-util');

var minifyCSS = require('gulp-clean-css');
var sourcemaps = require("gulp-sourcemaps");
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');

var cp = require('child_process'); //for jekyll



rename = require('gulp-rename');
var browserSync = require('browser-sync').create();


// Set the path variables
var base_path = './',
      src = base_path + '_dev/src',
      dist = base_path + 'assets',
      paths = {  
          js: src + '/js/*.js',
          scss: [ src +'/sass/*.?(s)css',
                  src +'/sass/**/*.?(s)css',
                  src +'/sass/**/**/*.?(s)css'],
          jekyll: ['index.html', '_posts/*', '_layouts/*', '_includes/*' , 'assets/*', 'assets/**/*', '_pitch/*','_pitch/**/*']
      };


      gulp.task("css", function() {

        return gulp.src([
            // paths.scss
            '_dev/src/sass/*.?(s)css',
            '_dev/src/sass/**/*.?(s)css',
            '_dev/src/sass/**/**/*.?(s)css'
        ])
        .pipe(sourcemaps.init())
        .pipe(  
            postcss([
                require("autoprefixer"),
                require("postcss-preset-env")({
                    stage: 1,
                    browsers:["IE 11", "last 2 versions"]
                })
            ])
        )
        // .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(
            minifyCSS({
                compatibility: 'ie8'
                })
            )
        .pipe(sourcemaps.write())
        .pipe(rename({dirname: dist + '/css'}))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
    });


        // Rebuild Jekyll
    gulp.task('build-jekyll', (code) => {
        return cp.spawn('jekyll', ['build', '--incremental'], 
        { stdio: 'inherit' }) // Adding incremental reduces build time.
        .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
        .on('close', code);
    });


    gulp.task('server', () => {
        browserSync.init({
          files: ['_site' + '/**'],
          port: 4000,
          server: {
            baseDir: '_site'
          }
        });

        gulp.watch(paths.scss, gulp.series('css'));
        gulp.watch(paths.jekyll, gulp.series('build-jekyll')).on("change", browserSync.reload);
      });

        // Watch files
    gulp.task('watch', () => {  
        // gulp.watch(paths.scss, gulp.series('css'));
        // gulp.watch(paths.jekyll, gulp.series('build-jekyll'));
    });


    
// Start Everything with the default task
gulp.task('default', gulp.series('css', 'build-jekyll', 'server', 'watch'));






