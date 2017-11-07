import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';

const browserSyncIns = browserSync.create();
const rootFolder = './';
const assets = {
  css: rootFolder + 'assets/css/',
  js: rootFolder + 'assets/js/',
  img: rootFolder + 'assets/img/',
  dist: {
    js: rootFolder + 'dist/js/',
    css: rootFolder + 'dist/css/',
    img: rootFolder + 'dist/img/',
  }
};

gulp.task('browser-sync', () => {
  browserSyncIns.init([
      assets.dist.css + 'style.css',
      assets.dist.js + 'index.js',
      rootFolder + 'index.html'
    ], {
    server: {
      baseDir: rootFolder
    }
  });
});

gulp.task('sass', () => {
  gulp.src(assets.css + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(assets.dist.css));
});

gulp.task('imagemin', () => {
  gulp.src(assets.img + '/*')
    .pipe(imagemin())
    .pipe(gulp.dest(assets.dist.img));
});

gulp.task('watch', () => {
  gulp.watch(assets.css + '**/*.scss', ['sass']);
  gulp.watch(assets.js + '**/*.js', ['uglify']);
});

gulp.task('uglify', () => {
  gulp.src(assets.js + 'index.js')
    .pipe(uglify())
    .pipe(gulp.dest(assets.dist.js));
});

gulp.task('default', ['imagemin', 'uglify', 'sass', 'browser-sync', 'watch']);