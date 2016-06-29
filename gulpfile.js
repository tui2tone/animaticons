var gulp = require("gulp"),
    sass = require("gulp-sass"),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    port: 3200,
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("scss", function() {
  return gulp.src("src/**/*.scss")
    .pipe(plumber({errorHandler: notify.onError(
      {
        title: "Error: Line <%= error.line %>",
        message: "<%= error.message %>"
      })
    }))
    .pipe(sass().on('error', function(err) { console.log(err) }))
    .pipe(concat('animaticons.css'))
    .pipe(gulp.dest('./bin/css/'))
    .pipe(browserSync.stream())
});

gulp.task("watch", function() {
  gulp.watch(['./src/**/*.scss'], ['scss']);
})

gulp.task("dev", ["scss","browser-sync", "watch"])