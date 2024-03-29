/*jslint node: true */
"use strict";

const gulp = require("gulp");
const { dest, parallel, src, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const gulpSequence = require("gulp-sequence");
const rename = require("gulp-rename");
const del = require("del");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const merge = require("merge-stream");
const webpackStream = require("webpack-stream");
const sourcemaps = require("gulp-sourcemaps");
const clean = () => del(["dist"]);

function css(done) {
  src("scss/styles.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write("./maps"))
    .pipe(dest("./dist/css"));
  done();
}

function js(done) {
  ["farmers.js", "smoothscroll-polyfill.js"].map((entry) => {
    return browserify({
      entries: ["js/" + entry],
    })
      .transform(babelify, { presets: ["@babel/preset-env"] })
      .bundle()
      .pipe(source(entry))
      .pipe(rename({ extname: ".min.js" }))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadmaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write("./maps"))
      .pipe(dest("./dist/js"));
  });
  done();
}

function webpack(done) {
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

function assets(done) {
  gulp.src(["./fonts/**/*"]).pipe(gulp.dest("./dist/fonts"));
  gulp.src(["./img/**/*"]).pipe(gulp.dest("./dist/images"));
  done();
}

function watchFiles() {
  watch("scss/**/*.scss", css);
  watch("js/**/*.js", js);
  gulp.watch(["./js/stepper/*.js", "./js/stepper/**/*.vue"], webpack);
}

exports.watch = watchFiles;
exports.assets = assets;
exports.css = css;
exports.js = js;
exports.webpack = webpack;
exports.default = series(clean, css, js, webpack, assets);
