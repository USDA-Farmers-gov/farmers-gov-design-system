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

export function styles(done) {
  gulp
    .src("./scss/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(
      rename({
        // basename: "main",
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("dist/css"));
  done();
}

export function webpack(done) {
  gulp
    .src("./js/stepper/farmers-stepper.js")
    .pipe(webpackStream(require("./webpack.config.js")))
    .on("error", function (err) {
      console.error("WEBPACK ERROR", err);
      this.emit("end");
    })
    .pipe(gulp.dest("./dist/js"));
  done();
}

export function assets(done) {
  gulp.src(["./fonts/**/*"]).pipe(gulp.dest("./dist/fonts"));
  gulp.src(["./img/**/*"]).pipe(gulp.dest("./dist/images"));
  done();
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
