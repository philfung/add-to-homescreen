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
