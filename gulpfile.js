var gulp= require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('styles',function() {
    return gulp.src("./sass/*.+(scss|sass)") /* возвращает код в файлы в указанной папке с указанным расширением */
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) /* компилирует весь код по указанному выше пути */
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer({
                cascade: false
              }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("./css")) /* указывает куда поместиться преобразованный файл */
            .pipe(browserSync.stream()); /* обновление страницы после сохранения файла */
        });

gulp.task('watch', function() {
    gulp.watch("./sass/*.+(scss|sass)",gulp.parallel('styles')); /* следит за одновлениями файла */
    gulp.watch("./*html").on("change",browserSync.reload);
});

gulp.task('default', gulp.parallel('watch','server','styles')); /* одновременная работа двух задач */
