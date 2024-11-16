// scripts/buildLocales.js
const { execSync } = require('child_process');
const { LOCALES } = require('../src/config');

// Build each locale sequentially with memory limits
LOCALES.forEach(locale => {
  console.log(`Building locale: ${locale}`);
  execSync(`cross-env NODE_OPTIONS='--max-old-space-size=1024' LOCALE=${locale} webpack`, {
    stdio: 'inherit'
  });
});

// Run post build
console.log('Running post build...');
execSync('npm run postbuild', { stdio: 'inherit' });