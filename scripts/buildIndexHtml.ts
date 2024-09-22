// This script creates a new index_{locale}.html file for each locale
// that we support in the /dist folder.  It modifies the paths in the
// file so it includes the right files for the locale.
import { LOCALES } from "../src/config";
import fs from "fs";

const disDir = `${__dirname}/../dist/`;
const sourceIndexPath = `${disDir}index.html`;

let indexContent = fs.readFileSync(sourceIndexPath).toString();

indexContent = indexContent.split(`"./dist/`).join(`"./`);

const search = `<ul id="locales">`;

const idx = indexContent.indexOf(search);

// Create links to all the different localized index.html files
const links = LOCALES.map((locale) => {
  return `<li><a href="index_${locale}.html">${locale.toUpperCase()}</a></li>`;
});

indexContent =
  indexContent.substring(0, idx + search.length) +
  links.join("\n") +
  indexContent.substring(idx + search.length);

// Use the default locale for this built file
indexContent = indexContent.replace(`show("en")`, `show()`);

fs.writeFileSync(sourceIndexPath, indexContent);

// Copy over these files to /dist as the index.html needs them
const rootFilesToCopy = ["manifest.json", "apple-touch-icon.png"];

rootFilesToCopy.forEach((fileName) => {
  fs.cpSync(`${__dirname}/../${fileName}`, `${__dirname}/../dist/${fileName}`);
});

// Make the new index.html files, one per locale
LOCALES.forEach((locale) => {
  const localeIndexPath = `${disDir}index_${locale}.html`;

  let localeIndexContent = indexContent;

  const replacements = [
    ["./add-to-homescreen.min.js", `./add-to-homescreen_${locale}.min.js`],
    [`show("en")`, `show("${locale}")`],
  ];

  replacements.forEach(([from, to]) => {
    localeIndexContent = localeIndexContent.replace(from, to);
  });

  fs.writeFileSync(localeIndexPath, localeIndexContent);
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
const indexJsPath = `${__dirname}/../dist/add-to-homescreen.min.js`;
const sourceIndexJsContent = fs.readFileSync(indexJsPath).toString();

let indexJsContent = removeNewlineSpaceLessThan(sourceIndexJsContent);
fs.writeFileSync(indexJsPath, indexJsContent);
