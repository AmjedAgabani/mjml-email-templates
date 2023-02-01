const fs = require('fs');
const { src, dest, watch: gulpWatch } = require('gulp');
const mjml = require('gulp-mjml');
const mjmlEngine = require('mjml');

// Require your own components if needed, and your mjmlEngine (possibly with options)
// require('./components')

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

function build() {
  return src('./src/emails/**/*.mjml')
    .pipe(mjml(mjmlEngine, { validationLevel: 'strict' }))
    .on('error', handleError)
    .pipe(dest('./build'));
}

function clean(cb) {
  fs.rm('./build', { force: true, recursive: true }, cb);
}

function watch() {
  // All events will be watched
  gulpWatch('src/**/*', { events: 'all', ignoreInitial: false }, build);
}

exports.build = build;
exports.clean = clean;
exports.watch = watch;
