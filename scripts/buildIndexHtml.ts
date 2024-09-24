// This script creates a new index_{locale}.html file for each locale
// that we support in the /dist folder.  It modifies the paths in the
// file so it includes the right files for the locale.
import { LOCALES } from "../src/config";
import fs from "fs";
import path from "path";

const distDir = `${__dirname}/../dist/`;

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

// Copy over these files to /dist as the index.html needs them
const rootFilesToCopy = ["manifest.json", "apple-touch-icon.png"];

rootFilesToCopy.forEach((fileName) => {
  fs.cpSync(`${__dirname}/../${fileName}`, `${__dirname}/../dist/${fileName}`);
});

function removeNewlineSpaceLessThan(input: string): string {
  // Regular expression to match newline, followed by any number of spaces, followed by "<"
  const regex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;

  return input.replace(regex, (match) => {
    // Replace "\n" followed by whitespace and "<" within the string literal
    return match.replace(/\\n\s*</g, "<");
  });
}

// Replace the many instances of repetitive text that looks like "\n       <div"
// in the add-to-homescreen.min.js file
const indexJsPath = path.join(distDir, "add-to-homescreen.min.js");
const sourceIndexJsContent = fs.readFileSync(indexJsPath).toString();

let indexJsContent = removeNewlineSpaceLessThan(sourceIndexJsContent);
fs.writeFileSync(indexJsPath, indexJsContent);
