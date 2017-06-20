/**
 * Created by danihbelan on 9/6/17.
 */
var gulp =require('gulp'),
    watch=require('gulp-watch'),
    concat=require('gulp-concat'),
    uglify=require('gulp-uglify'),
    rename=require('gulp-rename');

require('gulp-help')(gulp, {
    description: 'Ayuda'
});

gulp.task('compress','Comprime todos los ficheros en uno', function () {
    gulp.src(['website/**/*.js'])
        .pipe(concat('all'))
        .pipe(rename({extname: "min.js"}))
        .pipe(gulp.dest('public/dist'))
});

gulp.task('watch','Mira cuando un fichero se ha modificado', function () {
    gulp.watch('website/angularjs/**/*.js', ['compress'])
});

gulp.task('default', ['watch'])

