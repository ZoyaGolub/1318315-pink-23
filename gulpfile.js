const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const squoosh = require("gulp-libsquoosh");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const clean = require("gulp-clean");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/js/scripts.js", gulp.series("scripts")); // не отслеживает scripts.js
  //gulp.watch("source/js/scripts.js").on("change", sync.reload); // не отслеживает scripts.js
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.watcher = watcher;

// HTML

const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"));
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src("source/js/scripts.js")
  .pipe(terser())
  .pipe(rename("scripts.min.js"))
  .pipe(gulp.dest("build/js"));
  //.pipe(sync.stream());
}

exports.scripts = scripts;

// Imeges optimize copy

const optimizeImg = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(squoosh())
  .pipe(gulp.dest("build/img"));
}

exports.optimizeImg = optimizeImg;

const copyImg = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(gulp.dest("build/img"));
}

exports.copyImg = copyImg;

// Webp

const webpImg = () => {
  return gulp.src("source/img/*.{jpg,png}")
  .pipe(webp({quality: 80}))
  .pipe(gulp.dest("build/img"));
}

exports.webpImg = webpImg;

// Sprite

const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
  .pipe(svgstore({
    inLineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Copy others

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/*.webmanifest"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean build

const cleanBuild = () => {
  return gulp.src("./build", {read: false})
    .pipe(clean())
};

exports.cleanBuild = cleanBuild;

// Build

const build = gulp.series(
  cleanBuild,
  optimizeImg,
  gulp.parallel(
    copy,
    html,
    styles,
    scripts,
    sprite,
    webpImg
  ),
  gulp.series(
    server,
    watcher
  )
);

exports.build = build;

// Exports

exports.default = gulp.series(
  cleanBuild,
  copyImg,
  gulp.parallel(
    styles,
    html,
    scripts,
    copy,
    sprite,
    webpImg
  ),
  gulp.series(
    server,
    watcher
  )
);
