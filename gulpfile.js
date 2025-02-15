const { series, watch, src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const browserSync = require("browser-sync").create();

// Sass Task
function scssTask() {
  return src("app/scss/style.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest("dist", { sourcemaps: "." }));
}

// Browser Sync Server
function serve(cb) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

function copyFonts() {
  return src("assets/fonts/**/*").pipe(dest("dist/fonts"));
}

function watchTask(cb){
  watch("*.html", browserSyncReload);
  watch("app/scss/**/*.scss", series(scssTask, browserSyncReload))
  cb()
}

exports.default = series(scssTask, copyFonts, serve, watchTask);
