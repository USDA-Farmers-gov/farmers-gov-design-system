import del from 'del';
import gulp from 'gulp';
import sass from 'gulp-sass';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';


/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del([ 'assets' ]);

/*
 * You can also declare named functions and export them as tasks
 */
export function scripts(done) {
  ['farmers.js', 'smoothscroll-polyfill.js'].map( entry => {
    return browserify({
      entries: ['js/' + entry]
    })
    .transform( babelify, { presets: ['@babel/preset-env'] } )
    .bundle()
    .pipe( source(entry) )
    .pipe( rename({extname: '.min.js'}) )
    .pipe( buffer() )
    .pipe( sourcemaps.init({loadmaps: true}) )
    .pipe( uglify() )
    .pipe( sourcemaps.write('./') )
    .pipe( gulp.dest( './dist/js') )
  })

  done();
}

export function styles(done) {
  return gulp.src('new/styles.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({
          basename: 'main',
          suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));
}

export function watch() {
  gulp.watch('new/**/*.scss', styles);
  gulp.watch('js/**/*.js', scripts);
}

export function build(done) {
  gulp.series(clean, gulp.parallel(styles, scripts));
  done();
};
/*
 * Export a default task
 */
export default build;
