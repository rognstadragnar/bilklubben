var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');
    livereload = require('gulp-livereload');
    stream = require('webpack-stream');
    webpack = require('webpack');


gulp.task('styles', function() {
    gulp.src('./client/assets/styles/*.scss')
    .pipe(sass().on('error', sass.logError)) 
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))   
    .pipe(gulp.dest('./client/assets/styles'))
    .pipe(livereload())
});

gulp.task('minify', function() {
    gulp.src('./client/assets/styles/*.css')
    .pipe(rename({suffix: '.min'}))
    
    .pipe(minifycss())
    .pipe(gulp.dest('./client/assets/styles'))
})

gulp.task('notifyLR', function() {
    livereload()
})


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./client/assets/styles/**/*.scss', ['styles']);
});

gulp.task('scripts', function() {
    webpack( require('./webpack.config.js'))
})

gulp.task('default', ['styles', 'watch']);

gulp.task('webpack', function() {
    stream(require('./webpack.config.js'), webpack, function (err, stats) {
            console.log(stats.toString({ colors: true }));
        }) 
});

/*gulp.task('webpack', function () {
    return gulp.src('./client/assets/scripts/main.js')
        .pipe(stream(require('./webpack.config.js'), webpack, function (err, stats) {
            console.log(stats.toString({ colors: true }));
        }))
        .pipe(gulp.dest('./client/assets/scripts'));
});*/