// scripts/build.ts
import fs from "fs";
import path from "path";
import { LOCALES } from "../src/config";

const buildDir = `${__dirname}/../src/build/`;
const sourceMainFilePath = `${__dirname}/../src/main.ts`;
const sourceIndexFilePath = `${__dirname}/../src/index.ts`;
const localesFilePath = `${__dirname}/../src/locales`;

function ensureDirectoryExistence(dirName) {
  if (fs.existsSync(dirName)) {
    return true;
  }
  fs.mkdirSync(dirName);
}

function deleteFolder(folderPath) {
  try {
    fs.rmSync(folderPath, { recursive: true, force: true });
  } catch (error) {
    console.error(`Error deleting folder ${folderPath}: ${error.message}`);
  }
}

// Clean out the build dir
deleteFolder(buildDir);
ensureDirectoryExistence(buildDir);

const mainContent = fs.readFileSync(sourceMainFilePath).toString();
const indexContent = fs.readFileSync(sourceIndexFilePath).toString();

// Create a main file for each locale
LOCALES.forEach((locale) => {
  const lines = mainContent
    .replace(`"./types"`, `"../types"`)
    .replace(`"./index"`, `"./index_${locale}"`)
    .split("\n");

  fs.writeFileSync(path.join(buildDir, `main_${locale}.ts`), lines.join("\n"));
});

// Create a new index file for each locale
function createLocaleIndexFile(locale: string) {
  let localeIndexContent = indexContent;

  // Fix the path to locales directory
  localeIndexContent = localeIndexContent.replace(
    /from ["']\.\/locales["']/g,
    'from "../locales"'
  );
  localeIndexContent = localeIndexContent.replace(
    /require\(["']\.\/locales\//g,
    'require("../locales/'
  );

  const localeConfig = { ...require(`${localesFilePath}/${locale}.json`) };

  // Normalize i18n calls
  localeIndexContent = replaceFunctionCalls(localeIndexContent);

  Object.keys(localeConfig).forEach((localeKey) => {
    const search = new RegExp(`i18n.__\\("${localeKey}"`, 'g');
    const idx = localeIndexContent.search(search);
    if (idx > -1) {
      localeIndexContent = localeIndexContent.replace(
        search,
        `i18n.__("${localeConfig[localeKey]}"`
      );
      delete localeConfig[localeKey];
    } else {
      throw new Error(
        "Missing translation in locale [" + locale + "] for key [" + localeKey + "]"
      );
    }
  });

  const linesToRemove = [
    `import { LOCALES } from "./config";`,
    `const config = require`,
    `const LOCALES =`,
  ];

  let lines = localeIndexContent.split("\n").filter((line) => {
    return !linesToRemove.some((lineToRemove) => {
      return line.indexOf(lineToRemove) > -1;
    });
  });

  lines.splice(1, 0, `const LOCALES = ["${locale}"]`);

  // Fix all relative paths
  const relativeRequires = ["./styles.css", "./simpleI18n", "./types", "./config"];

  let localeConfigFound = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    for (let j = 0; j < relativeRequires.length; j++) {
      const requirePath = relativeRequires[j];
      if (line.indexOf(`"${requirePath}`) > -1) {
        lines[i] = line.replace(requirePath, "../" + requirePath.substring(2));
        relativeRequires.splice(j, 1);
        break;
      }
    }

    const localeRequireIdx = line.indexOf('require("../locales/');
    if (localeRequireIdx > -1) {
      lines[i] =
        lines[i].substring(0, localeRequireIdx) +
        JSON.stringify(localeConfig, null, 2) +
        ";";
      localeConfigFound = true;
    }

    if (localeConfigFound && relativeRequires.length == 0) {
      break;
    }
  }

  localeIndexContent = lines.join("\n");
  localeIndexContent = removeNewlineSpaceLessThan(localeIndexContent);

  const indexFilePath = path.join(buildDir, `index_${locale}.ts`);
  fs.writeFileSync(indexFilePath, localeIndexContent);
}

function removeNewlineSpaceLessThan(input: string): string {
  const regex = /\n[\s\t]*</g;
  return input.replace(regex, "<");
}

function replaceFunctionCalls(input: string): string {
  const regex = /\.__\(\s*/g;
  return input.replace(regex, ".__(");
}

// Create the localized index files
LOCALES.forEach(createLocaleIndexFile);