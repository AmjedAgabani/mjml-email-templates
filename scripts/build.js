const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');

recursive('src/emails', function (err, files) {
  if (err) {
    console.error(err);
    throw err;
  }

  for (const file of files) {
    // store path
    const directory = buildDirectory(file);
    // make directory
    makeDirectory(directory).then(() => {
      // pass string to mjml function
      childProcess.exec(`npx mjml ${file} -o ${directory}`);
    });
  }
});

function buildDirectory(mjmlPath) {
  // gets source directory of MJML
  const sourceDirectory = path.dirname(mjmlPath);
  // makes the build directory
  const parts = sourceDirectory.split(path.sep);
  parts[0] = 'build';
  // returns the build directory
  const buildDirectory = path.join(...parts);
  return buildDirectory;
}

async function makeDirectory(path) {
  await fs.mkdir(path, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');
  });
}
