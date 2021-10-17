const gulp = require("gulp");
const browserify = require("browserify");
const tsify = require("tsify");
const source = require("vinyl-source-stream");
const path = require("path");
const del = require("del");

const SOURCE = "src/main.ts";
const DESTINATION = "dist";
const paths = {
  path: ["src/**/*", "!src/**/*.ts", "!src/test"],
};

function copyFiles() {
  return gulp.src(paths.path).pipe(gulp.dest(DESTINATION));
}

function compileTs() {
  return browserify({
    basedir: ".",
    debug: true,
    entries: SOURCE,
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(DESTINATION));
}

gulp.task("copy-files", copyFiles);

gulp.task("compile", gulp.series(gulp.parallel(copyFiles), compileTs));

gulp.task(
  "compile-watch",
  gulp.series(function () {
    console.log("🔎 - Starting watching...");

    var watcher = gulp.watch("./src/**/*", gulp.series(gulp.parallel(copyFiles), compileTs));

    watcher.on("all", function (event, eventPath) {
      if (event === "unlink" || event === "unlinkDir") {
        let filePathFromSrc = path.relative(path.resolve("src"), eventPath);
        let destFilePath = path.resolve(DESTINATION, filePathFromSrc);
        del.sync(destFilePath);
      }
    });
  })
);
