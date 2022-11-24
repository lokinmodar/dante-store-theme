const gulp = require('gulp');
const plumber = require('gulp-plumber');
const watchSass = require('gulp-watch-sass');
const debug = require('gulp-debug');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');

const childProcess = require('child_process');

const watchFolders = require('./gulp-folders.json');

sass.compiler = require('sass');

let sassOptions = watchFolders.options.sass;
sassOptions.fiber = require('fibers');

/* Compila os arquivos CSS */
const css = () => {
  return gulp
    .src(watchFolders.paths.sass.src)
    .pipe(
      sass(sassOptions).on('error', error => {
        console.log(error.messageFormatted);
      }),
    )
    .pipe(
      gulpif(
        file => file.path.indexOf('checkout6-custom') > 0,
        gulp.dest(watchFolders.paths.sass.dest.checkout),
        gulp.dest(watchFolders.paths.sass.dest.theme),
      ),
    )
    .pipe(
      debug({
        title: 'CSS Compilado:',
      }),
    );
};
css.description = 'Compila os arquivos CSS';
/* Compila os arquivos CSS */

/* SASS Watch */
const sasswatch = () => {
  watchSass([watchFolders.paths.sass.src], watchFolders.options.sass)
    .pipe(plumber())
    .pipe(
      sass(sassOptions).on('error', error => {
        console.log(error.messageFormatted);
      }),
    )
    .pipe(
      gulpif(
        file => file.path.indexOf('checkout6-custom') > 0,
        gulp.dest(watchFolders.paths.sass.dest.checkout),
        gulp.dest(watchFolders.paths.sass.dest.theme),
      ),
    )
    .pipe(
      debug({
        title: 'CSS Compilado:',
      }),
    );
};
sasswatch.description = 'SASS Watch';
/* SASS Watch */

/* CSS Watch */
const csswatch = sasswatch;
csswatch.description = 'CSS Watch';
/* CSS Watch */

/* Watch */
const watch = sasswatch;
watch.description = 'Watch';
/* Watch */

/* Mostra todas as funções disponíveis */
const help = () => {
  return childProcess.exec('gulp -T', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
  });
};
help.description = 'Mostra todas as funções disponíveis';
/* // Mostra todas as funções disponíveis */

export { csswatch, sasswatch, watch, css };

export default help;
