// scripts/sequentialBuild.ts
import { execSync } from 'child_process';
import { LOCALES } from '../src/config';
import path from 'path';

async function runBuild() {
  try {
    // First build without locale
    console.log("Building default version...");
    execSync('PREVENT_MINIFICATION=false webpack', { stdio: 'inherit' });

    console.log("Building debug version...");
    execSync('PREVENT_MINIFICATION=true webpack', { stdio: 'inherit' });

    // Build each locale version
    for (const locale of LOCALES) {
      console.log(`Building locale: ${locale}`);
      execSync(`LOCALE=${locale} PREVENT_MINIFICATION=false webpack`, { stdio: 'inherit' });
    }

    // Run post build script
    console.log("Running post build...");
    execSync('bun ./scripts/postBuild.ts', { stdio: 'inherit' });

  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

runBuild();