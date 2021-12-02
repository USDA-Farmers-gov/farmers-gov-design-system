import del from "del";
import gulp from "gulp";
import sass from "gulp-sass";
import babelify from "babelify";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import buffer from "vinyl-buffer";
import browserify from "browserify";
import cleanCSS from "gulp-clean-css";
import source from "vinyl-source-stream";
const webpackStream = require("webpack-stream");

export const clean = () => del(["dist"]);

export function scripts(done) {
  ["farmers.js", "smoothscroll-polyfill.js"].map((entry) => {
    return browserify({
      entries: ["js/" + entry],
    })
      .transform(babelify, { presets: ["@babel/preset-env"] })
      .bundle()
      .pipe(source(entry))
      .pipe(rename({ extname: ".min.js" }))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest("./dist/js"));
  });

  done();
}

export function styles() {
  return gulp
    .src("./scss/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(
      rename({
        basename: "main",
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("dist/css"));
}

export function webpack() {
  return gulp
    .src("./js/stepper/farmers-stepper.js")
    .pipe(webpackStream(require("./webpack.config.js")))
    .pipe(gulp.dest("./dist/js"));
}

export function assets() {
  gulp.src(["./fonts/**/*"]).pipe(gulp.dest("./dist/fonts"));
  return gulp.src(["./img/**/*"]).pipe(gulp.dest("./dist/images"));
}

export function watch() {
  gulp.watch("./scss/**/*.scss", styles);
  gulp.watch("./js/**/*.js", scripts);
  gulp.watch(["./js/stepper/*.js", "./js/stepper/**/*.vue"], webpack);
}

export function build(done) {
  gulp.series(clean, gulp.parallel("styles", "scripts", "webpack", "assets"))();
  done();
}

export default build;
