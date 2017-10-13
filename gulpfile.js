const gulp = require('gulp');
const babel = require('gulp-babel');
const inject = require('gulp-inject');
const del = require('del');
const webpack = require('webpack');
const gulpWebpack = require('gulp-webpack');

const DEST = './build';

gulp.task('clean', () => {
    return del([DEST]);
});

gulp.task('js', () => {
    return gulp.src('./src/js/index.js')
        .pipe(gulpWebpack({
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            exclude: [/(node_modules|bower_components)/],
                            use: [{
                                loader: 'babel-loader',
                                options: { presets: [ ['es2015', { 'modules': false }] ] }
                            }]
                        }
                    ]
                }
            }, webpack))
        .pipe(gulp.dest(DEST + '/js'));
});

gulp.task('template', () => {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest(DEST + '/'));
});

gulp.task('inject', () => {
    return gulp.src(DEST + '/index.html')
        .pipe(inject(gulp.src(DEST + '/**/*.js', { read: false }), { relative: true }))
        .pipe(gulp.dest(DEST));
});

gulp.task('copy-css', () => {
    return gulp.src('./src/css/**/*')
        .pipe(gulp.dest(DEST + '/css'));
});

gulp.task('copy-res', () => {
    return gulp.src('./src/res/**/*')
        .pipe(gulp.dest(DEST + '/res'));
});

gulp.task('default', gulp.series('clean', gulp.parallel('js', 'template', 'copy-css', 'copy-res'), 'inject'));
