const browserSync = require('browser-sync').create();
const fs = require('fs');
const { dest, src, watch: gulpWatch } = require('gulp');
const mjml = require('gulp-mjml');
const mjmlEngine = require('mjml');
const path = require('path');

// Require your own components if needed, and your mjmlEngine (possibly with options)
// require('./components')

const BUILD_DIR = './build';
const SRC_GLOB = './src/**/*';
const SRC_EMAIL_DIR = './src/emails';
const SRC_EMAIL_GLOB = './src/emails/**/*.mjml';

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

function build() {
  return src(SRC_EMAIL_GLOB)
    .pipe(mjml(mjmlEngine, { validationLevel: 'strict' }))
    .on('error', handleError)
    .pipe(dest(BUILD_DIR));
}

function clean(cb) {
  fs.rm(BUILD_DIR, { force: true, recursive: true }, cb);
}

function watch() {
  // All events will be watched
  gulpWatch(SRC_GLOB, { ignoreInitial: false }, build).on('all', () =>
    browserSync.reload()
  );

  gulpWatch(SRC_EMAIL_GLOB, { ignoreInitial: false }, index.render)
    .on('ready', () => {
      fs.mkdirSync('build', { recursive: true });
      browserSync.init({
        server: {
          baseDir: BUILD_DIR,
        },
      });
    })
    .on('add', (file) => index.data.add(index.format(file)))
    .on('unlink', (file) => index.data.delete(index.format(file)));
}

exports.build = build;
exports.clean = clean;
exports.watch = watch;

const index = {
  data: new Set(),
  format: (sourcePath) => {
    const parsedPath = path.parse(sourcePath);
    return path.format({
      dir: path.join(
        ...parsedPath.dir
          .split(path.sep)
          .splice(SRC_EMAIL_DIR.split('/').length - 1)
      ),
      name: parsedPath.name,
      ext: '.html',
    });
  },
  render: (cb) => {
    const html = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <h1>Email index</h1>
  <ul>
${Array.from(index.data)
  .sort()
  .map((file) => {
    return `<li><a href="${file}">${file}</a></li>`;
  })
  .join('\n')}
  </ul>
</body>
</html>`;
    fs.writeFile(`${BUILD_DIR}/index.html`, html, cb);
  },
};
