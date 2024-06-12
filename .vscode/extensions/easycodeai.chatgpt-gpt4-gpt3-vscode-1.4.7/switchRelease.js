const fs = require('fs');
const path = require('path');

function copyFile(source, destination) {
  fs.copyFile(source, destination, (err) => {
    if (err) {
      console.error('Error copying file:', err);
      return;
    }
    console.log(`Successfully copied ${path.basename(source)} to ${path.basename(destination)}`);
  });
}

function switchFiles(type) {
  const packageFileName = type === 'release' ? 'package-release.json' : 'package-pre-release.json';
  const changelogFileName = type === 'release' ? 'CHANGELOG-release.md' : 'CHANGELOG-pre-release.md';

  const packageSrcPath = path.join(__dirname, packageFileName);
  const packageDestPath = path.join(__dirname, 'package.json');
  const changelogSrcPath = path.join(__dirname, changelogFileName);
  const changelogDestPath = path.join(__dirname, 'CHANGELOG.md');

  copyFile(packageSrcPath, packageDestPath);
  copyFile(changelogSrcPath, changelogDestPath);
}

// Get command line arguments
const args = process.argv.slice(2);

// Expected usage: node switchPackage.js release
// or: node switchPackage.js pre-release
if (args.length !== 1 || (args[0] !== 'release' && args[0] !== 'pre-release')) {
  console.error('Usage: node switchPackage.js <release|pre-release>');
  process.exit(1);
}

switchFiles(args[0]);
