// scripts/postBuild.ts
import { LOCALES } from "../src/config";
import fs from "fs";
import path from "path";

const distDir = `${__dirname}/../dist/`;

function updateHtmlFiles() {
  const fileNamesToFix = ["index.html", "debug.html"]
    .concat(LOCALES.map((locale) => `index_${locale}.html`))
    .map((fileName) => path.join(distDir, fileName));

  fileNamesToFix.forEach((filePath) => {
    let fileContent = fs.readFileSync(filePath).toString();
    fileContent = fileContent.split(`"./dist/`).join(`"./`);
    
    const search = `<ul id="locales">`;
    const idx = fileContent.indexOf(search);
    
    // Create links to all the different localized index.html files
    const links = LOCALES.map((locale) => {
      return `<li><a href="index_${locale}.html">${locale.toUpperCase()}</a></li>`;
    });
    
    fileContent =
      fileContent.substring(0, idx + search.length) +
      links.join("\n") +
      fileContent.substring(idx + search.length);
    
    // Use the default locale for this built file
    fileContent = fileContent.replace(`show("en")`, `show()`);
    
    fs.writeFileSync(filePath, fileContent);
  });
}

function copyRootFiles() {
  // Copy over these files to /dist as the index.html needs them
  const rootFilesToCopy = ["manifest.json", "apple-touch-icon.png"];
  rootFilesToCopy.forEach((fileName) => {
    fs.cpSync(
      `${__dirname}/../${fileName}`,
      `${__dirname}/../dist/${fileName}`
    );
  });
}

function removeNewlineSpaces(input: string): string {
  // Regular expression to match string literals
  const regex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
  return input.replace(regex, (match) => {
    // Replace "\n" followed by whitespace and "<" within the string literal
    match = match.replace(/\\n\s*</g, "<");
    // Replace "\n" followed by whitespace and "'" within the string literal
    match = match.replace(/\\n\s*'/g, " '");
    // Replace "\n" followed by whitespace and "$" within the string literal
    match = match.replace(/\\n\s*\$/g, " $");
    return match;
  });
}

function removeEmptySpace() {
  // Replace the many instances of repetitive text that looks like "\n <div"
  const indexFilePaths = ["add-to-homescreen.min.js"]
    .concat(LOCALES.map((locale) => `add-to-homescreen_${locale}.min.js`))
    .map((fileName) => path.join(distDir, fileName));

  indexFilePaths.forEach((filePath) => {
    const sourceIndexJsContent = fs.readFileSync(filePath).toString();
    let indexJsContent = removeNewlineSpaces(sourceIndexJsContent);
    fs.writeFileSync(filePath, indexJsContent);
  });
}

<<<<<<< HEAD
function replaceRepetitiveI18nKeys() {
  // Get the reference translation keys from en.json with normalized format
  const enJSON = JSON.parse(
    fs.readFileSync(`${__dirname}/../src/locales/en.json`).toString()
  );

  // Create ordered array of keys to ensure consistent numbering
  const orderedKeys = Object.keys(enJSON).sort();

  // Create key mapping with all possible variations
  const keyMap = new Map();
  orderedKeys.forEach((originalKey, idx) => {
    const shortKey = `k${idx + 1}`;
    
    // Add all possible variations of the key
    [
      originalKey,
      `"${originalKey}"`,
      `'${originalKey}'`,
      `${originalKey}.`,
      `"${originalKey}."`,
      `'${originalKey}.'`,
      originalKey.replace(/\./g, '\\.'),
    ].forEach(variant => {
      keyMap.set(variant, shortKey);
    });
  });

  // Files to process
  const filePaths = [
    'add-to-homescreen.min.js',
    'add-to-homescreen.js',
    ...LOCALES.map(locale => `add-to-homescreen_${locale}.min.js`)
  ].map(filePath => path.join(distDir, filePath));

  // Process each file
  filePaths.forEach((filePath) => {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return;
    }

    console.log(`Processing ${path.basename(filePath)}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalSize = content.length;

    // First pass: Replace direct i18n calls
    orderedKeys.forEach((originalKey, idx) => {
      const shortKey = `k${idx + 1}`;
      content = content.replace(
        new RegExp(`i18n\\.__\\(["']${escapeRegExp(originalKey)}["'](?![:\\)])`, 'g'),
        `i18n.__("${shortKey}"`
      );
    });

    // Second pass: Replace object keys
    orderedKeys.forEach((originalKey, idx) => {
      const shortKey = `k${idx + 1}`;
      content = content.replace(
        new RegExp(`["']${escapeRegExp(originalKey)}["']\\s*:`, 'g'),
        `"${shortKey}":`
      );
    });

    // Third pass: Replace remaining string literals
    orderedKeys.forEach((originalKey, idx) => {
      const shortKey = `k${idx + 1}`;
      content = content.replace(
        new RegExp(`["']${escapeRegExp(originalKey)}\\.*["'](?!\\s*[:\\)])`, 'g'),
        `"${shortKey}"`
      );
    });

    fs.writeFileSync(filePath, content);

    // Verification
    console.log(`File: ${path.basename(filePath)}`);
    console.log(`- Original size: ${originalSize}`);
    console.log(`- New size: ${content.length}`);
    
    // Check for any remaining original keys
    orderedKeys.forEach(key => {
      if (content.includes(key)) {
        console.log(`- Warning: Original key still present: "${key}"`);
        
        // Find context of unreplaced key
        const contextStart = Math.max(0, content.indexOf(key) - 50);
        const contextEnd = Math.min(content.length, content.indexOf(key) + key.length + 50);
        console.log(`  Context: ...${content.substring(contextStart, contextEnd)}...`);
      }
    });
  });
}

// Helper function to escape special characters in regex
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Run all post-build steps in sequence
async function runPostBuild() {
  try {
    console.log("1. Updating HTML files...");
    updateHtmlFiles();
    
    console.log("\n2. Removing empty spaces...");
    removeEmptySpace();
    
    console.log("\n3. Replacing i18n keys...");
    replaceRepetitiveI18nKeys();
    
    console.log("\n4. Copying root files...");
    copyRootFiles();
    
    console.log("\nPost-build complete!");
  } catch (error) {
    console.error("Post-build failed:", error);
    process.exit(1);
  }
}

// Execute post-build process
runPostBuild().catch(console.error);
=======
// function replaceRepetitiveI18nKeys() {
//   const filePaths = ["add-to-homescreen.min.js", "add-to-homescreen.js"].map(
//     (filePath) => path.join(distDir, filePath)
//   );

//   filePaths.forEach((filePath) => {
//     let mainFileContent = fs.readFileSync(filePath).toString();
//     const localeJSON = JSON.parse(
//       fs.readFileSync(`${__dirname}/../src/locales/en.json`).toString()
//     );

//     Object.keys(localeJSON).forEach((key, idx) => {
//       const len = mainFileContent.length;
//       mainFileContent = mainFileContent
//         .split(`"${key}":`)
//         .join(`"k${idx + 1}":`);
//     });

//     fs.writeFileSync(filePath, mainFileContent);
//   });
// }

updateHtmlFiles();
removeEmptySpace();
// replaceRepetitiveI18nKeys();
copyRootFiles();
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324
