const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const pug = require('gulp-pug')
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

function fonts() {
  src('src/fonts/*.ttf')
    .pipe(ttf2woff())
    .pipe(dest('dist/fonts'))
  return src('src/fonts/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('dist/fonts'))
}

function pugCompile() {
  return src('src/**.pug')
    .pipe(pug())
    .pipe(dest('dist'))
}

function scss() {
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: true
    }))
    .pipe(dest('src/scss'))
}

function cssMin() {
  return src('src/scss/**.css')
    .pipe(concat('style.css'))
    .pipe(csso())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(dest('dist/css'))
}

function jsMin() {
  return src('src/js/**.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(dest('dist/js'))
}

function images() {
  return src('src/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(dest('dist/images'))
}

function clear() {
  return del('dist')
}

function server() {
  sync.init({
    server: './dist'
  })
  watch('src/**.pug', series(pugCompile)).on('change', sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
  watch('src/scss/**.css', series(cssMin)).on('change', sync.reload)
  watch('src/js/**.js', series(jsMin)).on('change', sync.reload)
}

exports.build = series(clear, cssMin, fonts, jsMin, images)
exports.start = server
exports.clear = clear