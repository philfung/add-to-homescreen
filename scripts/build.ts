import fs from "fs";
import path from "path";
import { LOCALES } from "../src/config";

const buildDir = `${__dirname}/../src/build/`;
const sourceMainFilePath = `${__dirname}/../src/main.ts`;
const sourceIndexFilePath = `${__dirname}/../src/index.ts`;

function ensureDirectoryExistence(dirName) {
  if (fs.existsSync(dirName)) {
    return true;
  }
  fs.mkdirSync(dirName);
}

ensureDirectoryExistence(buildDir);

const mainContent = fs.readFileSync(sourceMainFilePath).toString();
const indexContent = fs.readFileSync(sourceIndexFilePath).toString();

// Create a main file for each locale
LOCALES.forEach((locale) => {
  // Create a new main file

  const lines = mainContent
    .replace(`"./types"`, `"../types"`)
    .split("\n")
    .filter((line) => {
      return (
        line.indexOf(`import AddToHomeScreen`) < 0 &&
        line.indexOf("window.AddToHomeScreen =") < 0
      );
    });

  const importName = `AddToHomeScreen${locale.toUpperCase()}`;

  lines.unshift(`import type AddToHomeScreen from '../index';`);
  lines.unshift(`import ${importName} from "./index_${locale}";`);

  lines.push(`window.AddToHomeScreen = ${importName};`);

  fs.writeFileSync(path.join(buildDir, `main_${locale}.ts`), lines.join("\n"));
});

// Create a new index file for each locale
function createLocaleIndexFile(locale: string) {
  let localeIndexContent = indexContent;

  const linesToRemove = [
    `import { LOCALES } from "./config";`,
    `const config = require`,
    `const LOCALES =`,
  ];

  const lines = localeIndexContent.split("\n").filter((line) => {
    return !linesToRemove.some((lineToRemove) => {
      return line.indexOf(lineToRemove) > -1;
    });
  });

  lines.splice(1, 0, `const LOCALES = ["${locale}"]`);

  const relativeRequires = [
    "./styles.css",
    "./locales/",
    "./simpleI18n",
    "./types",
  ];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    for (let j = 0; j < relativeRequires.length; j++) {
      const requirePath = relativeRequires[j];
      if (line.indexOf(`"${requirePath}`) > -1) {
        lines[i] = line.replace(requirePath, "." + requirePath);
        relativeRequires.splice(j, 1);

        break;
      }
    }
    if (relativeRequires.length == 0) {
      break;
    }
  }

  const indexFilePath = path.join(buildDir, `index_${locale}.ts`);
  fs.writeFileSync(indexFilePath, lines.join("\n"));
}

LOCALES.forEach(createLocaleIndexFile);
