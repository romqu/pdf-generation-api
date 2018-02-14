"use strict";

const gulp = require("gulp");
const gulpShell = require("gulp-shell");
const nodemon = require("nodemon");
// const execa = require("execa");

gulp.task("watchTest", () => {
  return nodemon({
    script: "src/index.js"
  }).on("restart", function() {
    // execa("reload-firefox-tab").stdout.pipe(process.stdout);
  });
  //gulp.watch("src/**/*.js", gulpShell.task("reload-firefox-tab"));
});

gulp.task("watch", () => {
  nodemon({});
  gulp.watch("pdfs/**/*.pdf", gulpShell.task("reload-firefox-tab"));
});
