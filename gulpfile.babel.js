import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import del from 'del';


/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del([ 'assets' ]);

/*
 * You can also declare named functions and export them as tasks
 */
export function styles(done) {
  return gulp.src('new/styles.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({
          basename: 'main',
          suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));
  done();
}

export function watch() {
  gulp.watch('new/**/*.scss', styles);
}

const build = gulp.series(clean, gulp.parallel(styles));

/*
 * Export a default task
 */
export default build;
