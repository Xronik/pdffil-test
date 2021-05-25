const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const pug = require('gulp-pug')

// function html() {
//   return src('dist/**.html')
//     .pipe(htmlmin({
//       collapseWhitespace: true
//     }))
// }

function pugCompile() {
  return src('src/**.pug')
    .pipe(pug())
    .pipe(dest('src'))
}

function scss() {
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist'))
    .pipe(dest('src/scss'))
}

function clear() {
  return del('dist')
}

function serve() {
  sync.init({
    server: './src'
  })
  watch('src/**.pug', series(pugCompile)).on('change', sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
}

exports.build = series(clear, scss)
exports.serve = series(scss, pugCompile, serve)
exports.clear = clear