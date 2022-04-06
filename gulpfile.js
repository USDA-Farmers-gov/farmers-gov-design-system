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
const clean = () => del(["dist"]);

function css(done) {
  src("scss/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ extname: ".min.css" }))
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
      .pipe(uglify())
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

function watchFiles() {
  watch("scss/**/*.scss", css);
  watch("js/**/*.js", js);
  gulp.watch(["./js/stepper/*.js", "./js/stepper/**/*.vue"], webpack);
}

function assets(done) {
  gulp.src(["./fonts/**/*"]).pipe(gulp.dest("./dist/fonts"));
  gulp.src(["./img/**/*"]).pipe(gulp.dest("./dist/images"));
  done();
}

exports.watch = watchFiles;
exports.assets = assets;
exports.css = css;
exports.js = js;
exports.webpack = webpack;
exports.default = series(clean, css, js, webpack, assets);
