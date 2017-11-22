//http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html
const gulp = require('gulp');
const babel = require('gulp-babel');

const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');

gulp.task('default', ['t'], () =>
    gulp.src('src/app.js')
        .pipe(babel({
            presets: ['env', 'react']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('t', () =>
    gulp.src('src/**/*.ts')
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('dist'))
);
