'use strict';

const { src, dest, watch, parallel, series } = require('gulp');

const scss          = require('gulp-sass');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const babel         = require('gulp-babel');
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const del           = require('del');
const gitPages      = require('gulp-gh-pages');


function scripts() {
  return src([
    'node_modules/tiny-slider/dist/tiny-slider.js',
    'node_modules/maska/dist/maska.js',
    'node_modules/plyr/dist/plyr.polyfilled.min.js',
    'app/js/main.js'
  ])
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
}

function cleanDist() {
  return del('dist');
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: './app/'
    }
  });
}

function images() {
  return src('app/img/**/*')
      .pipe(imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.mozjpeg({quality: 75, progressive: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({
              plugins: [
                  {removeViewBox: true},
                  {cleanupIDs: false}
              ]
          })
      ]))
      .pipe(dest('dist/img'));
}

function styles() {
  return src([
        './node_modules/normalize.css/normalize.css',
        './node_modules/tiny-slider/dist/tiny-slider.css',
        './node_modules/plyr/dist/plyr.css',
        './node_modules/hamburgers/_sass/**/*.scss',
        './app/scss/style.scss'
      ])
      .pipe(scss({ outputStyle: "compressed" }))
      .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
      }))
      .pipe(dest('./app/css'))
      .pipe(browserSync.stream());
}


function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html'
  ], {base: 'app'})
  .pipe(dest('./dist/'))
}


function watching() {
  watch(['./app/scss/**/*.scss'], styles);
  watch(['./app/js/**/*.js', '!./app/js/main.min.js'], scripts);
  watch(['./app/*.html']).on('change', browserSync.reload);
}

function deploy() {
  return src('./dist/**/*')
      .pipe(gitPages({
        options: [{
          branch: 'master',
          force: true,
        }]
      }))
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.gitPages = gitPages;

exports.build = series(cleanDist, images, build);
exports.deploy = deploy;
exports.default = parallel(styles, scripts, browsersync, watching);
